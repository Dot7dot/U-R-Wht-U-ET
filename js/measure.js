// 拍照測量手掌：把十元硬幣放在掌心拍照，用硬幣當比例尺推算手掌長度。
// 1. MediaPipe 找出手腕與中指指尖  2. 在掌心附近找圓形硬幣  3. 使用者可拖曳微調
// 照片只在這支手機上處理，不會上傳。

const COIN_CM = 2.6;          // 新台幣十元硬幣直徑 26 mm
const MAX_SIDE = 1280;        // 照片縮小後的最長邊
const MIN_CM = 10, MAX_CM = 26;
const $ = (id) => document.getElementById(id);

let onDone = null;
let photo = null;             // 縮小後的照片 canvas
let marks = null;             // { coin:{x,y,r}, tip:{x,y}, wrist:{x,y} }，單位為 photo 像素
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
export function findCoin(canvas, region, rMin, rMax) {
  const k = Math.min(1, 16 / ((rMin + rMax) / 2));      // 縮到硬幣半徑約 16px 來算
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
  // 圓周上每一點的亮度變化都朝同一個方向（往內或往外）時分數最高
  const score = (cx, cy, r) => {
    let sum = 0, pos = 0, neg = 0;
    for (let n = 0; n < N; n++) {
      const sx = Math.round(cx + r * cos[n]), sy = Math.round(cy + r * sin[n]);
      if (sx < 1 || sy < 1 || sx >= w - 1 || sy >= h - 1) return 0;
      const d = gx[sy * w + sx] * cos[n] + gy[sy * w + sx] * sin[n];
      sum += d;
      if (d > 12) pos++; else if (d < -12) neg++;
    }
    return (Math.abs(sum) / N) * (Math.max(pos, neg) / N) ** 2;
  };
  const cxMin = (region.x - region.half - x0) * k, cxMax = (region.x + region.half - x0) * k;
  const cyMin = (region.y - region.half - y0) * k, cyMax = (region.y + region.half - y0) * k;
  let best = { s: 0 };
  const search = (ax, bx, ay, by, ar, br, step) => {
    for (let r = ar; r <= br; r += step) {
      for (let cy = ay; cy <= by; cy += step) {
        for (let cx = ax; cx <= bx; cx += step) {
          const s = score(cx, cy, r);
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

  let coin = null;
  if (hand) {
    marks.tip = hand.tip;
    marks.wrist = hand.wrist;
    const len = Math.hypot(hand.tip.x - hand.wrist.x, hand.tip.y - hand.wrist.y);
    marks.coin = { x: hand.palm.x, y: hand.palm.y, r: len * 0.072 };
    // 手掌 10–26 公分時，硬幣半徑約為手掌長的 5%–13%
    coin = findCoin(photo, { x: hand.palm.x, y: hand.palm.y, half: len * 0.22 }, len * 0.045, len * 0.125);
  } else {
    coin = findCoin(photo, { x: W / 2, y: H / 2, half: S * 0.3 }, S * 0.025, S * 0.09);
  }
  if (coin && coin.score > 6) marks.coin = { x: coin.x, y: coin.y, r: coin.r }; else coin = null;

  if (hand && coin) setStatus('已自動找到手掌與硬幣。請確認圓圈貼齊硬幣、兩個點對準指尖和手腕橫紋，不準的話可以拖曳調整。', 'ok');
  else if (hand) setStatus('找到手掌了，但沒找到硬幣。請拖曳橘色圓圈，讓它剛好貼齊硬幣邊緣。', 'warn');
  else if (coin) setStatus(`${handFailed ? '手部辨識無法載入' : '沒有辨識到手掌'}。請把兩個綠點拖到中指指尖和手腕橫紋，並確認圓圈貼齊硬幣。`, 'warn');
  else setStatus('沒有辨識成功。請手動把橘色圓圈貼齊硬幣，並把兩個綠點拖到中指指尖和手腕橫紋；或重拍一張。', 'warn');
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
  return (Math.hypot(marks.tip.x - marks.wrist.x, marks.tip.y - marks.wrist.y) / (2 * marks.coin.r)) * COIN_CM;
}
function layout() {
  if (!photo) return;
  const maxW = canvas.parentElement.clientWidth;
  const maxH = Math.max(240, window.innerHeight - 300);
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
    label({ x: marks.coin.x, y: marks.coin.y - marks.coin.r }, '十元硬幣', -8);
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
