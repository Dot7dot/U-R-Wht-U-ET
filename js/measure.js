// 拍照測量手掌：把一枚硬幣（1、5、10、50 元皆可）放在掌心拍照，用硬幣當比例尺推算手掌長度。
// 1. MediaPipe 找出手腕與中指指尖  2. 在掌心附近找圓形硬幣  3. 依顏色與大小判斷是哪一種硬幣
// 4. 使用者可改選硬幣、拖曳微調
// 照片只在這支手機上處理，不會上傳。

// 新台幣硬幣：直徑（公分）與顏色（silver 銀色、warm 金黃／銅色）
const COINS = [
  { id: '1', name: '1 元', cm: 2.0, tone: 'warm' },
  { id: '5', name: '5 元', cm: 2.2, tone: 'silver' },
  { id: '10', name: '10 元', cm: 2.6, tone: 'silver' },
  { id: '50', name: '50 元', cm: 2.8, tone: 'warm' },
];
const DEFAULT_COIN = '10';
const MIN_COIN_SCORE = 18;      // 低於這個分數就當作沒找到硬幣，請使用者手動調整
const TYPICAL_PALM_CM = 18, PALM_SD_CM = 2;   // 成人手掌長度的大致分布，用來判斷哪個面額比較合理
const MAX_SIDE = 1280;        // 照片縮小後的最長邊
const MIN_CM = 10, MAX_CM = 26;
const $ = (id) => document.getElementById(id);

let onDone = null;
let photo = null;             // 縮小後的照片 canvas
let marks = null;             // { coin:{x,y,r}, tip:{x,y}, wrist:{x,y} }，單位為 photo 像素
let coinId = DEFAULT_COIN;     // 目前選擇的硬幣面額
let coinAuto = null;          // 自動判斷出的面額（沒判斷出來為 null）
let view = { scale: 1, w: 0, h: 0 };
let drag = null;
let job = 0;

/* ---------- 手部辨識（MediaPipe，延遲載入） ---------- */

let landmarkerPromise = null;
function loadLandmarker() {
  landmarkerPromise ??= (async () => {
    const base = new URL('../vendor/mediapipe/', import.meta.url).href;
    const { FilesetResolver, HandLandmarker } = await import(base + 'vision_bundle.mjs');
    const fileset = await FilesetResolver.forVisionTasks(base + 'wasm');
    return HandLandmarker.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: base + 'hand_landmarker.task' },
      runningMode: 'IMAGE',
      numHands: 1,
    });
  })();
  landmarkerPromise.catch(() => { landmarkerPromise = null; });
  return landmarkerPromise;
}
function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))]);
}
async function detectHand(canvas) {
  const landmarker = await withTimeout(loadLandmarker(), 30000);
  const lm = landmarker.detect(canvas).landmarks?.[0];
  if (!lm) return null;
  const pt = (i) => ({ x: lm[i].x * canvas.width, y: lm[i].y * canvas.height });
  const wrist = pt(0), dip = pt(11), pad = pt(12);
  // 模型的指尖點落在指腹，往外延伸一小段才是真正的指尖
  const tip = { x: pad.x + (pad.x - dip.x) * 0.35, y: pad.y + (pad.y - dip.y) * 0.35 };
  const palm = [0, 5, 9, 13, 17].map(pt).reduce((a, p) => ({ x: a.x + p.x / 5, y: a.y + p.y / 5 }), { x: 0, y: 0 });
  return { wrist, tip, palm, points: lm.map((_, i) => pt(i)) };
}

/* ---------- 找硬幣 ---------- */
// 硬幣有兩個特徵：(1) 一整圈完整的圓形邊緣 (2) 圓內的顏色和圓外一圈（皮膚）明顯不同。
// 只看邊緣會誤抓掌紋、指縫、反光，所以兩個條件都要成立。

function rgbToLab(r, g, b) {
  const lin = (v) => { v /= 255; return v > 0.04045 ? ((v + 0.055) / 1.055) ** 2.4 : v / 12.92; };
  const R = lin(r), G = lin(g), B = lin(b);
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const x = f((0.4124 * R + 0.3576 * G + 0.1805 * B) / 0.9505);
  const y = f(0.2126 * R + 0.7152 * G + 0.0722 * B);
  const z = f((0.0193 * R + 0.1192 * G + 0.9505 * B) / 1.089);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

// box: 搜尋範圍 {x0,y0,x1,y1}；rMin/rMax: 半徑範圍；inside(x,y): 圓心是否在允許的位置（皆為 photo 像素）
export function findCoin(canvas, box, rMin, rMax, inside = null, workRadius = 20) {
  const k = Math.min(1, workRadius / ((rMin + rMax) / 2)); // 縮到硬幣半徑約 workRadius 像素來算
  const pad = rMax * 1.7 + 4;
  const x0 = Math.max(0, Math.floor(box.x0 - pad)), y0 = Math.max(0, Math.floor(box.y0 - pad));
  const x1 = Math.min(canvas.width, Math.ceil(box.x1 + pad)), y1 = Math.min(canvas.height, Math.ceil(box.y1 + pad));
  const w = Math.round((x1 - x0) * k), h = Math.round((y1 - y0) * k);
  if (w < 12 || h < 12) return null;
  const small = document.createElement('canvas');
  small.width = w; small.height = h;
  const sctx = small.getContext('2d', { willReadFrequently: true });
  sctx.imageSmoothingQuality = 'high';
  sctx.drawImage(canvas, x0, y0, x1 - x0, y1 - y0, 0, 0, w, h);
  const px = sctx.getImageData(0, 0, w, h).data;

  // 每個像素取「變化最大的色版」的梯度：金色硬幣和皮膚亮度相近，但顏色不同
  const gx = new Float32Array(w * h), gy = new Float32Array(w * h), gm = new Float32Array(w * h);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      let bx = 0, by = 0, bm = 0;
      for (let c = 0; c < 3; c++) {
        const p = (dx, dy) => px[((y + dy) * w + x + dx) * 4 + c];
        const sx = p(1, -1) + 2 * p(1, 0) + p(1, 1) - p(-1, -1) - 2 * p(-1, 0) - p(-1, 1);
        const sy = p(-1, 1) + 2 * p(0, 1) + p(1, 1) - p(-1, -1) - 2 * p(0, -1) - p(1, -1);
        const m = sx * sx + sy * sy;
        if (m > bm) { bm = m; bx = sx; by = sy; }
      }
      gx[i] = bx; gy[i] = by; gm[i] = Math.sqrt(bm);
    }
  }

  const N = 36, cos = [], sin = [];
  for (let n = 0; n < N; n++) { cos.push(Math.cos((n / N) * 2 * Math.PI)); sin.push(Math.sin((n / N) * 2 * Math.PI)); }
  // 圓周上有多少比例的點是「夠明顯、而且方向垂直於圓周」的邊緣
  const ring = (cx, cy, r) => {
    let good = 0, sum = 0;
    for (let n = 0; n < N; n++) {
      const sx = Math.round(cx + r * cos[n]), sy = Math.round(cy + r * sin[n]);
      if (sx < 1 || sy < 1 || sx >= w - 1 || sy >= h - 1) continue;
      const i = sy * w + sx;
      const v = Math.abs(gx[i] * cos[n] + gy[i] * sin[n]);
      if (v > 28 && v > 0.8 * gm[i]) { good++; sum += Math.min(v, 160); }
    }
    return { full: good / N, strength: sum / N };
  };
  // 圓內與圓外一圈的顏色差（Lab 色差），以及外圈本身顏色是否一致。
  // 硬幣放在手上時，外圈一整圈都是皮膚；指尖、手的邊緣則是一半皮膚一半背景。
  const SECT = 8;
  const contrast = (cx, cy, r) => {
    const inner = [0, 0, 0, 0];
    const outer = Array.from({ length: SECT }, () => [0, 0, 0, 0]);
    const R = Math.ceil(r * 1.6);
    for (let dy = -R; dy <= R; dy++) {
      for (let dx = -R; dx <= R; dx++) {
        const d = Math.hypot(dx, dy) / r;
        const isInner = d <= 0.75;
        if (!isInner && (d < 1.2 || d > 1.6)) continue;
        const x = Math.round(cx + dx), y = Math.round(cy + dy);
        if (x < 0 || y < 0 || x >= w || y >= h) continue;
        const i = (y * w + x) * 4;
        const a = isInner ? inner : outer[Math.min(SECT - 1, Math.floor(((Math.atan2(dy, dx) + Math.PI) / (2 * Math.PI)) * SECT))];
        a[0] += px[i]; a[1] += px[i + 1]; a[2] += px[i + 2]; a[3]++;
      }
    }
    const lab = (a) => rgbToLab(a[0] / a[3], a[1] / a[3], a[2] / a[3]);
    const dist = (A, B) => Math.hypot((A[0] - B[0]) * 0.6, A[1] - B[1], A[2] - B[2]); // 亮度權重較低，避免陰影被當成硬幣
    const sectors = outer.filter((a) => a[3]).map(lab);
    if (!inner[3] || sectors.length < SECT) return { dE: 0, spread: 99 }; // 外圈超出照片：不採用
    const mean = [0, 1, 2].map((c) => sectors.reduce((t, v) => t + v[c], 0) / sectors.length);
    return { dE: dist(lab(inner), mean), spread: Math.max(...sectors.map((v) => dist(v, mean))) };
  };
  const rLo = rMin * k, rHi = rMax * k;
  const total = (cx, cy, r, e) => {
    const { dE, spread } = contrast(cx, cy, r);
    const even = Math.min(1, Math.max(0, 1 - (spread - 9) / 16)); // 外圈顏色越不一致，越不像放在手上的硬幣
    // 同樣條件下取較大的圓：硬幣外緣會包住表面的花紋與反光
    return { s: e.full * e.full * Math.min(e.strength, 90) * Math.min(1, Math.max(0, dE - 3) / 14) * even * Math.sqrt(r / rHi), dE };
  };

  // 第一步：只看邊緣，粗略掃過所有位置與半徑，留下邊緣最完整的候選
  const cands = [];
  for (let cy = (box.y0 - y0) * k; cy <= (box.y1 - y0) * k; cy += 2) {
    for (let cx = (box.x0 - x0) * k; cx <= (box.x1 - x0) * k; cx += 2) {
      if (inside && !inside(cx / k + x0, cy / k + y0)) continue;
      for (let r = rLo; r <= rHi; r += 1.5) {
        const e = ring(cx, cy, r);
        if (e.full >= 0.55) cands.push({ cx, cy, r, e, q: e.full * e.full * Math.min(e.strength, 90) });
      }
    }
  }
  if (!cands.length) return null;
  cands.sort((a, b) => b.q - a.q);
  // 第二步：對前幾名加上「顏色與周圍不同」的條件
  let best = null;
  for (const c of cands.slice(0, 150)) {
    const t = total(c.cx, c.cy, c.r, c.e);
    if (!best || t.s > best.s) best = { ...c, ...t };
  }
  if (!best || best.s <= 0) return null;
  // 第三步：在最佳候選附近微調位置與半徑
  for (let pass = 0; pass < 2; pass++) {
    const c = { ...best };
    for (let r = Math.max(rLo * 0.9, c.r - 2); r <= c.r + 2; r += 0.5) {
      for (let cy = c.cy - 2; cy <= c.cy + 2; cy += 0.5) {
        for (let cx = c.cx - 2; cx <= c.cx + 2; cx += 0.5) {
          const e = ring(cx, cy, r);
          if (e.full < 0.5) continue;
          const t = total(cx, cy, r, e);
          if (t.s > best.s) best = { cx, cy, r, e, ...t };
        }
      }
    }
  }
  return { x: best.cx / k + x0, y: best.cy / k + y0, r: best.r / k, score: best.s, full: best.e.full, dE: best.dE };
}

/* ---------- 判斷是哪一種硬幣 ---------- */

// 硬幣內部的平均顏色 → 銀色／金色／銅色的可能性
function coinTone(canvas, coin) {
  const r = Math.max(2, Math.floor(coin.r * 0.7));
  const x0 = Math.max(0, Math.round(coin.x - r)), y0 = Math.max(0, Math.round(coin.y - r));
  const w = Math.min(canvas.width - x0, r * 2), h = Math.min(canvas.height - y0, r * 2);
  if (w < 2 || h < 2) return null;
  const px = canvas.getContext('2d', { willReadFrequently: true }).getImageData(x0, y0, w, h).data;
  let R = 0, G = 0, B = 0, n = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if ((x - w / 2) ** 2 + (y - h / 2) ** 2 > r * r) continue;
      const i = (y * w + x) * 4;
      R += px[i]; G += px[i + 1]; B += px[i + 2]; n++;
    }
  }
  if (!n) return null;
  R /= n; G /= n; B /= n;
  const max = Math.max(R, G, B), min = Math.min(R, G, B);
  const sat = max ? (max - min) / max : 0;
  let hue = 0;
  if (max !== min) {
    hue = max === R ? ((G - B) / (max - min)) * 60 : max === G ? 120 + ((B - R) / (max - min)) * 60 : 240 + ((R - G) / (max - min)) * 60;
    if (hue < 0) hue += 360;
  }
  const sig = (v) => 1 / (1 + Math.exp(-v));
  const silver = sig((0.2 - sat) / 0.05);                 // 飽和度低 → 銀色
  // 1 元與 50 元在照片裡都偏金黃色，分不出來，交給大小去判斷
  return { silver, warm: 1 - silver };
}
// 綜合顏色與「換算出的手掌長度合不合理」來猜面額；handPx 為 0 表示沒有辨識到手
export function guessCoin(canvas, coin, handPx) {
  const tone = coinTone(canvas, coin);
  let best = null;
  for (const c of COINS) {
    let p = tone ? 0.08 + tone[c.tone] : 1;
    if (handPx) {
      const cm = (handPx / (2 * coin.r)) * c.cm;
      p *= Math.exp(-((cm - TYPICAL_PALM_CM) ** 2) / (2 * PALM_SD_CM ** 2));
    }
    if (!best || p > best.p) best = { id: c.id, p };
  }
  return best && best.p > 0 ? best.id : null;
}

/* ---------- 讀取照片並自動辨識 ---------- */

function loadPhoto(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement('canvas');
      c.width = Math.round(img.naturalWidth * k);
      c.height = Math.round(img.naturalHeight * k);
      c.getContext('2d', { willReadFrequently: true }).drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('無法讀取照片')); };
    img.src = url;
  });
}

async function analyse(file) {
  const id = ++job;
  $('m-intro').hidden = true;
  $('m-edit').hidden = false;
  setStatus('正在讀取照片…', 'busy');
  try { photo = await loadPhoto(file); } catch { if (id === job) { showIntro(); alert('這張照片讀不出來，請再試一次。'); } return; }
  if (id !== job) return;
  const W = photo.width, H = photo.height, S = Math.min(W, H);
  // 先給一組預設位置，辨識完成前也能手動調整
  marks = { coin: { x: W / 2, y: H * 0.6, r: S * 0.06 }, tip: { x: W / 2, y: H * 0.12 }, wrist: { x: W / 2, y: H * 0.9 } };
  layout();
  setStatus('正在辨識手掌與硬幣…（第一次需要下載辨識模型，請稍候）', 'busy');
  await new Promise((r) => setTimeout(r, 30));

  let hand = null, handFailed = false;
  try { hand = await detectHand(photo); } catch (err) { console.warn('手部辨識無法使用', err); handFailed = true; }
  if (id !== job) return;

  let coin = null, handPx = 0;
  coinId = DEFAULT_COIN; coinAuto = null;
  if (hand) {
    marks.tip = hand.tip;
    marks.wrist = hand.wrist;
    const len = Math.hypot(hand.tip.x - hand.wrist.x, hand.tip.y - hand.wrist.y);
    handPx = len;
    marks.coin = { x: hand.palm.x, y: hand.palm.y, r: len * 0.072 };
    // 硬幣可能放在手掌的任何位置（不一定在正中央），所以搜尋整隻手的範圍，
    // 但圓心必須落在手掌上，才不會抓到桌上其他圓形的東西
    const P = hand.points;
    // 只看手掌（手腕到各指根、拇指根部），不含手指：指尖和指甲的圓弧容易被誤認
    const bones = [[0, 1], [1, 2], [0, 5], [0, 9], [0, 13], [0, 17], [5, 9], [9, 13], [13, 17], [1, 5], [2, 5], [1, 9], [1, 13], [1, 17]];
    const palmPts = [0, 1, 2, 5, 9, 13, 17].map((i) => P[i]);
    const reach = len * 0.09;
    const onHand = (x, y) => bones.some(([a, b]) => {
      const ax = P[a].x, ay = P[a].y, vx = P[b].x - ax, vy = P[b].y - ay;
      const t = Math.max(0, Math.min(1, ((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy || 1)));
      return Math.hypot(x - ax - t * vx, y - ay - t * vy) < reach;
    });
    const xs = palmPts.map((p) => p.x), ys = palmPts.map((p) => p.y);
    const box = { x0: Math.min(...xs) - reach, y0: Math.min(...ys) - reach, x1: Math.max(...xs) + reach, y1: Math.max(...ys) + reach };
    // 1–50 元硬幣、手掌 10–26 公分時，硬幣半徑約為手掌長的 4%–14%
    coin = findCoin(photo, box, len * 0.04, len * 0.135, onHand);
  } else {
    coin = findCoin(photo, { x0: W * 0.1, y0: H * 0.1, x1: W * 0.9, y1: H * 0.9 }, S * 0.025, S * 0.09);
  }
  if (coin && coin.score > MIN_COIN_SCORE) {
    // 再用較高解析度在同一個位置重新對齊邊緣，讓半徑更準
    const m = coin.r * 0.2;
    const fine = findCoin(photo, { x0: coin.x - m, y0: coin.y - m, x1: coin.x + m, y1: coin.y + m }, coin.r * 0.85, coin.r * 1.2, null, 44);
    if (fine && fine.score > MIN_COIN_SCORE) coin = { ...fine, score: coin.score };
  }
  console.debug('coin', coin);
  if (coin && coin.score > MIN_COIN_SCORE) marks.coin = { x: coin.x, y: coin.y, r: coin.r }; else coin = null;
  if (coin) {
    coinAuto = guessCoin(photo, coin, handPx);
    if (coinAuto) coinId = coinAuto;
  }
  const coinName = COINS.find((c) => c.id === coinId).name;

  if (hand && coin) setStatus(`已自動找到手掌與硬幣，判斷是 ${coinName} 硬幣。${coinId === '5' || coinId === '10' ? '5 元和 10 元' : '1 元和 50 元'}顏色相近、容易混淆，請確認下方面額是否正確；圓圈或兩個點不準的話可以拖曳調整。`, 'ok');
  else if (hand) setStatus('找到手掌了，但沒找到硬幣。請在下方選擇硬幣面額，並拖曳橘色圓圈讓它剛好貼齊硬幣邊緣。', 'warn');
  else if (coin) setStatus(`${handFailed ? '手部辨識無法載入' : '沒有辨識到手掌'}。請把兩個綠點拖到中指指尖和手腕橫紋，並確認下方的硬幣面額（目前為 ${coinName}）與圓圈位置。`, 'warn');
  else setStatus('沒有辨識成功。請選擇硬幣面額、把橘色圓圈貼齊硬幣，並把兩個綠點拖到中指指尖和手腕橫紋；或重拍一張。', 'warn');
  renderCoins();
  render();
}

/* ---------- 畫面 ---------- */

const canvas = $('m-canvas');
const ctx = canvas.getContext('2d');

function setStatus(text, kind) {
  const el = $('m-status');
  el.textContent = text;
  el.dataset.kind = kind;
}
function palmCm() {
  if (!marks) return NaN;
  return (Math.hypot(marks.tip.x - marks.wrist.x, marks.tip.y - marks.wrist.y) / (2 * marks.coin.r)) * COINS.find((c) => c.id === coinId).cm;
}
function renderCoins() {
  $('m-coins').innerHTML = COINS.map((c) =>
    `<button type="button" class="chip ${c.id === coinId ? 'on' : ''}" data-coin="${c.id}">${c.name}${c.id === coinAuto ? '・自動' : ''}</button>`).join('');
}
$('m-coins').addEventListener('click', (e) => {
  const chip = e.target.closest('[data-coin]');
  if (!chip) return;
  coinId = chip.dataset.coin;
  renderCoins();
  render();
});
function layout() {
  if (!photo) return;
  const maxW = canvas.parentElement.clientWidth;
  const maxH = Math.max(240, window.innerHeight - 360);
  view.scale = Math.min(maxW / photo.width, maxH / photo.height);
  view.w = Math.round(photo.width * view.scale);
  view.h = Math.round(photo.height * view.scale);
  const dpr = window.devicePixelRatio || 1;
  canvas.style.width = view.w + 'px';
  canvas.style.height = view.h + 'px';
  canvas.width = Math.round(view.w * dpr);
  canvas.height = Math.round(view.h * dpr);
  render();
}
// 以「photo 像素 → 螢幕像素」的倍率 s 畫出照片與標記
function drawScene(s, lineScale = 1) {
  ctx.drawImage(photo, 0, 0, photo.width * s, photo.height * s);
  const { coin, tip, wrist } = marks;
  ctx.lineWidth = 2.5 * lineScale;
  ctx.strokeStyle = '#fff';
  ctx.setLineDash([6 * lineScale, 5 * lineScale]);
  ctx.beginPath(); ctx.moveTo(tip.x * s, tip.y * s); ctx.lineTo(wrist.x * s, wrist.y * s); ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = '#ff8a2a';
  ctx.fillStyle = 'rgba(255, 138, 42, .18)';
  ctx.beginPath(); ctx.arc(coin.x * s, coin.y * s, coin.r * s, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  const dot = (p, color, r = 7) => {
    ctx.beginPath(); ctx.arc(p.x * s, p.y * s, r * lineScale, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
    ctx.lineWidth = 2 * lineScale; ctx.strokeStyle = '#fff'; ctx.stroke();
  };
  dot({ x: coin.x + coin.r, y: coin.y }, '#ff8a2a', 6);
  dot(tip, '#35b36b');
  dot(wrist, '#35b36b');
}
function render() {
  if (!photo || !marks) return;
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, view.w, view.h);
  drawScene(view.scale);
  const label = (p, text, dy) => {
    ctx.font = '600 13px sans-serif';
    ctx.textAlign = 'center';
    const x = Math.min(view.w - 34, Math.max(34, p.x * view.scale)), y = Math.min(view.h - 6, Math.max(14, p.y * view.scale + dy));
    ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.strokeText(text, x, y);
    ctx.fillStyle = '#fff'; ctx.fillText(text, x, y);
  };
  if (!drag) {
    label(marks.tip, '中指指尖', -14);
    label(marks.wrist, '手腕橫紋', 24);
    label({ x: marks.coin.x, y: marks.coin.y - marks.coin.r }, COINS.find((c) => c.id === coinId).name + '硬幣', -8);
  } else {
    // 放大鏡：手指會遮住拖曳點，所以在另一側顯示放大畫面
    const p = drag.key === 'edge' ? { x: marks.coin.x + drag.ux * marks.coin.r, y: marks.coin.y + drag.uy * marks.coin.r } : drag.key === 'coin' ? marks.coin : marks[drag.key];
    const R = 62, zoom = Math.max(view.scale * 2.5, 1);
    const lx = p.x * view.scale < view.w / 2 ? view.w - R - 8 : R + 8, ly = R + 8;
    ctx.save();
    ctx.beginPath(); ctx.arc(lx, ly, R, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = '#000'; ctx.fillRect(lx - R, ly - R, R * 2, R * 2);
    ctx.translate(lx - p.x * zoom, ly - p.y * zoom);
    drawScene(zoom, 0.8);
    ctx.restore();
    ctx.lineWidth = 3; ctx.strokeStyle = '#fff';
    ctx.beginPath(); ctx.arc(lx, ly, R, 0, Math.PI * 2); ctx.stroke();
  }

  const cm = palmCm();
  const ok = isFinite(cm) && cm >= MIN_CM && cm <= MAX_CM;
  $('m-value').textContent = isFinite(cm) ? cm.toFixed(1) : '–';
  $('m-range').hidden = ok;
  $('m-accept').disabled = !ok;
}

/* ---------- 拖曳調整 ---------- */

function toPhoto(e) {
  const r = canvas.getBoundingClientRect();
  return { x: (e.clientX - r.left) / view.scale, y: (e.clientY - r.top) / view.scale };
}
canvas.addEventListener('pointerdown', (e) => {
  if (!marks) return;
  const p = toPhoto(e), c = marks.coin;
  const dCenter = Math.hypot(p.x - c.x, p.y - c.y);
  const candidates = [
    { key: 'tip', d: Math.hypot(p.x - marks.tip.x, p.y - marks.tip.y), ref: marks.tip },
    { key: 'wrist', d: Math.hypot(p.x - marks.wrist.x, p.y - marks.wrist.y), ref: marks.wrist },
    { key: 'edge', d: Math.abs(dCenter - c.r) },
    { key: 'coin', d: dCenter < c.r * 0.6 ? 0 : Infinity, ref: c },
  ].sort((a, b) => a.d - b.d);
  const hit = candidates[0];
  if (hit.d * view.scale > 44) return;
  e.preventDefault();
  canvas.setPointerCapture(e.pointerId);
  drag = { key: hit.key };
  if (hit.key === 'edge') {
    const d = dCenter || 1;
    drag.ux = (p.x - c.x) / d; drag.uy = (p.y - c.y) / d;
    drag.dr = c.r - dCenter;
  } else {
    drag.dx = hit.ref.x - p.x; drag.dy = hit.ref.y - p.y;
  }
  render();
});
canvas.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const p = toPhoto(e);
  if (drag.key === 'edge') {
    marks.coin.r = Math.max(4, Math.hypot(p.x - marks.coin.x, p.y - marks.coin.y) + drag.dr);
  } else {
    const target = drag.key === 'coin' ? marks.coin : marks[drag.key];
    target.x = Math.min(photo.width, Math.max(0, p.x + drag.dx));
    target.y = Math.min(photo.height, Math.max(0, p.y + drag.dy));
  }
  render();
});
const endDrag = () => { if (drag) { drag = null; render(); } };
canvas.addEventListener('pointerup', endDrag);
canvas.addEventListener('pointercancel', endDrag);
window.addEventListener('resize', () => { if (!$('measure').hidden && !$('m-edit').hidden) layout(); });

/* ---------- 開啟／關閉 ---------- */

function showIntro() {
  job++;
  photo = marks = null;
  coinId = DEFAULT_COIN; coinAuto = null;
  $('m-intro').hidden = false;
  $('m-edit').hidden = true;
}
function close() {
  showIntro();
  $('measure').hidden = true;
}
for (const id of ['m-camera', 'm-album']) {
  $(id).addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) analyse(file);
  });
}
$('m-close').addEventListener('click', close);
$('m-retake').addEventListener('click', showIntro);
$('m-accept').addEventListener('click', () => {
  const cm = Math.round(palmCm() * 10) / 10;
  const done = onDone;
  close();
  done?.(cm);
});

export function openMeasure(callback) {
  onDone = callback;
  showIntro();
  $('measure').hidden = false;
  loadLandmarker().catch(() => {}); // 先在背景下載辨識模型
}
