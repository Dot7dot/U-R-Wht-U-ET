// 拍照測量手掌：把一枚硬幣（1、5、10、50 元皆可）放在掌心拍照，用硬幣當比例尺推算手掌長度。
// 1. MediaPipe 找出手腕與中指指尖  2. 在掌心附近找圓形硬幣  3. 依顏色與大小判斷是哪一種硬幣
// 4. 使用者可改選硬幣、拖曳微調
// 照片只在這支手機上處理，不會上傳。

// 新台幣硬幣：直徑（公分）與顏色
const COINS = [
  { id: '1', name: '1 元', cm: 2.0, tone: 'copper' },
  { id: '5', name: '5 元', cm: 2.2, tone: 'silver' },
  { id: '10', name: '10 元', cm: 2.6, tone: 'silver' },
  { id: '50', name: '50 元', cm: 2.8, tone: 'gold' },
];
const DEFAULT_COIN = '10';
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
  return { wrist, tip, palm };
}

/* ---------- 找硬幣：在指定範圍內找邊緣最完整的圓 ---------- */

// region: { x, y, half }（搜尋中心與半寬），rMin/rMax 為半徑範圍（photo 像素）
export function findCoin(canvas, region, rMin, rMax, workRadius = 16) {
  const k = Math.min(1, workRadius / ((rMin + rMax) / 2)); // 縮到硬幣半徑約 workRadius 像素來算
  const pad = rMax + 4;
  const x0 = Math.max(0, Math.floor(region.x - region.half - pad));
  const y0 = Math.max(0, Math.floor(region.y - region.half - pad));
  const x1 = Math.min(canvas.width, Math.ceil(region.x + region.half + pad));
  const y1 = Math.min(canvas.height, Math.ceil(region.y + region.half + pad));
  const w = Math.max(8, Math.round((x1 - x0) * k)), h = Math.max(8, Math.round((y1 - y0) * k));
  const small = document.createElement('canvas');
  small.width = w; small.height = h;
  const sctx = small.getContext('2d', { willReadFrequently: true });
  sctx.imageSmoothingQuality = 'high';
  sctx.drawImage(canvas, x0, y0, x1 - x0, y1 - y0, 0, 0, w, h);
  const px = sctx.getImageData(0, 0, w, h).data;
  const gray = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) gray[i] = 0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2];
  const gx = new Float32Array(w * h), gy = new Float32Array(w * h);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      gx[i] = gray[i - w + 1] + 2 * gray[i + 1] + gray[i + w + 1] - gray[i - w - 1] - 2 * gray[i - 1] - gray[i + w - 1];
      gy[i] = gray[i + w - 1] + 2 * gray[i + w] + gray[i + w + 1] - gray[i - w - 1] - 2 * gray[i - w] - gray[i - w + 1];
    }
  }
  const N = 40;
  const cos = [], sin = [];
  for (let n = 0; n < N; n++) { cos.push(Math.cos((n / N) * 2 * Math.PI)); sin.push(Math.sin((n / N) * 2 * Math.PI)); }
  // 沿著半徑 r 的圓周，把「往外的亮度變化」加總；同時算有多少比例的點方向一致
  const ring = (cx, cy, r) => {
    let sum = 0, pos = 0, neg = 0;
    for (let n = 0; n < N; n++) {
      const sx = Math.round(cx + r * cos[n]), sy = Math.round(cy + r * sin[n]);
      if (sx < 1 || sy < 1 || sx >= w - 1 || sy >= h - 1) return null;
      const d = gx[sy * w + sx] * cos[n] + gy[sy * w + sx] * sin[n];
      sum += d;
      if (d > 8) pos++; else if (d < -8) neg++;
    }
    return { edge: Math.abs(sum) / N, full: Math.max(pos, neg) / N };
  };
  // 硬幣邊緣是一圈「清楚的線」：r 處的變化要明顯大於內外兩側，
  // 這樣才不會把硬幣表面的漸層反光或皮膚的明暗當成邊緣
  const score = (cx, cy, r) => {
    const at = ring(cx, cy, r);
    if (!at) return 0;
    const inner = ring(cx, cy, Math.max(1, r - 3)), outer = ring(cx, cy, r + 3);
    if (!inner || !outer) return 0;
    const sharp = at.edge - (inner.edge + outer.edge) / 2;
    // 對比強度設上限：硬幣和膚色的對比不一定強，重點是整圈邊緣是否完整
    return sharp <= 0 ? 0 : Math.min(sharp, 45) * at.full ** 2;
  };
  // 越靠近搜尋中心（掌心）越優先，避免抓到指縫或背景裡的圓形
  const mx = (region.x - x0) * k, my = (region.y - y0) * k, sigma = region.half * k * 0.75;
  const near = (cx, cy) => Math.exp(-((cx - mx) ** 2 + (cy - my) ** 2) / (2 * sigma * sigma));
  const cxMin = (region.x - region.half - x0) * k, cxMax = (region.x + region.half - x0) * k;
  const cyMin = (region.y - region.half - y0) * k, cyMax = (region.y + region.half - y0) * k;
  const rTop = rMax * k;
  let best = { s: 0 };
  const search = (ax, bx, ay, by, ar, br, step) => {
    for (let r = ar; r <= br; r += step) {
      for (let cy = ay; cy <= by; cy += step) {
        for (let cx = ax; cx <= bx; cx += step) {
          // 同樣清楚的圓，取比較大的：硬幣外緣會包住表面的反光與花紋
          const s = score(cx, cy, r) * near(cx, cy) * Math.sqrt(r / rTop);
          if (s > best.s) best = { s, cx, cy, r };
        }
      }
    }
  };
  search(cxMin, cxMax, cyMin, cyMax, rMin * k, rMax * k, 2);
  if (!best.s) return null;
  const c = best;
  search(c.cx - 2, c.cx + 2, c.cy - 2, c.cy + 2, Math.max(2, c.r - 2), c.r + 2, 0.5);
  return { x: best.cx / k + x0, y: best.cy / k + y0, r: best.r / k, score: best.s };
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
  const gold = (1 - silver) * sig((hue - 31) / 5);        // 偏黃 → 金色
  const copper = (1 - silver) * (1 - sig((hue - 31) / 5)); // 偏紅 → 銅色
  return { silver, gold, copper };
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
    // 1–50 元硬幣、手掌 10–26 公分時，硬幣半徑約為手掌長的 4%–14%
    coin = findCoin(photo, { x: hand.palm.x, y: hand.palm.y, half: len * 0.22 }, len * 0.04, len * 0.135);
  } else {
    coin = findCoin(photo, { x: W / 2, y: H / 2, half: S * 0.3 }, S * 0.025, S * 0.09);
  }
  if (coin && coin.score > 4) {
    // 第二輪：在找到的圓附近用較高解析度重新對齊邊緣，讓半徑更準
    const fine = findCoin(photo, { x: coin.x, y: coin.y, half: coin.r * 0.25 }, coin.r * 0.8, coin.r * 1.3, 40);
    if (fine) coin = { ...fine, score: coin.score };
  }
  console.debug('coin', coin);
  if (coin && coin.score > 4) marks.coin = { x: coin.x, y: coin.y, r: coin.r }; else coin = null;
  if (coin) {
    coinAuto = guessCoin(photo, coin, handPx);
    if (coinAuto) coinId = coinAuto;
  }
  const coinName = COINS.find((c) => c.id === coinId).name;

  if (hand && coin) setStatus(`已自動找到手掌與硬幣，判斷是 ${coinName} 硬幣。${coinId === '5' || coinId === '10' ? '5 元和 10 元顏色相同、容易混淆，請確認下方面額是否正確' : '如果面額不對請在下方改選'}；圓圈或兩個點不準的話可以拖曳調整。`, 'ok');
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
