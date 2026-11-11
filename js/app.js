// U R Wht U ET — 用手掌當尺的食物營養小工具
// 食物資料全部放在 foods/ 資料夾，新增食物請看 foods/README.md

import { openMeasure } from './measure.js';

const $ = (id) => document.getElementById(id);
const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem('urwue.' + key)) ?? fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('urwue.' + key, JSON.stringify(value)); } catch { /* 私密模式等情況：略過 */ }
  },
};

const state = {
  settings: store.get('settings', {}),
  log: store.get('log', []),
  foods: [],
  nutrients: [],
  category: '全部',
  food: null,
  strokes: [],        // 每一筆是一圈 [{x,y}]，單位公分，原點在畫布中心
  drawing: null,
  thickness: 1,
  zoom: 0,
  day: dayKey(new Date()),
};
const ZOOMS = [1.25, 1.9, 2.8]; // 畫布高度 = 手掌長 × 倍數

/* ---------- 資料載入 ---------- */

async function getJSON(path) {
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) throw new Error(path + ' ' + res.status);
  return res.json();
}

async function loadData() {
  const [nutrients, index] = await Promise.all([getJSON('foods/nutrients.json'), getJSON('foods/index.json')]);
  state.nutrients = nutrients;
  const loaded = await Promise.all(index.map((file) =>
    getJSON('foods/items/' + file).catch((err) => { console.warn('略過食物', file, err); return null; })));
  state.foods = loaded.filter((f) => f && f.id && f.name && f.per100g);
  for (const f of state.foods) {
    f._hay = [f.name, f.category, ...(f.aliases || []), ...(f.highlights || []),
      ...(f.benefits || []).map((b) => b.title + b.detail)].join(' ').toLowerCase();
  }
}

/* ---------- 小工具 ---------- */

function dayKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function fmt(v, unit) {
  if (!isFinite(v)) return '–';
  const digits = v >= 100 ? 0 : v >= 10 ? 1 : v >= 1 ? 1 : 2;
  return `${+v.toFixed(digits)} ${unit}`;
}
let toastTimer;
function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 1800);
}

/* ---------- 手掌圖 ---------- */

// 以「手掌長 = 100 單位」設計的簡化手形；(x, y) 為中指指尖正上方對齊點的左上角
const HAND_CENTER_X = 38;
function drawHand(ctx, left, top, h, color = '#f1d6bf') {
  const u = h / 100;
  ctx.save();
  ctx.translate(left, top);
  ctx.scale(u, u);
  ctx.fillStyle = ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  const finger = (cx, tipY, w, baseY = 60) => {
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(cx, tipY + w / 2);
    ctx.lineTo(cx, baseY);
    ctx.stroke();
  };
  finger(30, 9, 11.5);
  finger(43, 0, 11.5);
  finger(56, 7, 11.5);
  finger(68.6, 22, 10.5);
  // 拇指
  ctx.lineWidth = 13;
  ctx.beginPath();
  ctx.moveTo(8.5, 53);
  ctx.lineTo(31, 84);
  ctx.stroke();
  // 掌心
  ctx.beginPath();
  const x = 24.2, y = 50, w = 49.7, hh = 50, r = 13;
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + hh, r);
  ctx.arcTo(x + w, y + hh, x, y + hh, 16);
  ctx.arcTo(x, y + hh, x, y, 16);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.fill();
  ctx.restore();
}

/* ---------- 份量估算 ---------- */

function polygonArea(pts) {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    a += p.x * q.y - q.x * p.y;
  }
  return Math.abs(a) / 2;
}
function longestSpan(pts) {
  const step = Math.max(1, Math.floor(pts.length / 120));
  let best = 0;
  for (let i = 0; i < pts.length; i += step) {
    for (let j = i + step; j < pts.length; j += step) {
      const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
      if (d > best) best = d;
    }
  }
  return best;
}
// 回傳一圈的面積、長、寬（公分）
function strokeStats(pts) {
  const area = polygonArea(pts);
  const length = longestSpan(pts) || 0.01;
  const width = Math.min(length, (4 * area) / (Math.PI * length)); // 當成橢圓反推寬度
  return { area, length, width };
}
// 體積（立方公分）：round = 繞長軸的橢球；flat = 面積 × 厚度；mound = 堆起來的小丘
function strokeVolume(stats, shape, thickness) {
  if (shape.type === 'flat') return stats.area * thickness;
  if (shape.type === 'mound') return stats.area * thickness * (shape.fill ?? 0.6);
  return (Math.PI / 6) * stats.length * stats.width * stats.width;
}
function estimateGrams() {
  const f = state.food;
  const shape = f.shape || { type: 'round' };
  let volume = 0;
  for (const s of state.strokes) volume += strokeVolume(strokeStats(s), shape, state.thickness);
  return volume * (f.density ?? 1) * (f.edibleRatio ?? 1);
}
function nutrientsFor(food, grams) {
  const out = {};
  for (const n of state.nutrients) {
    const v = food.per100g[n.key];
    if (typeof v === 'number') out[n.key] = (v * grams) / 100;
  }
  return out;
}

/* ---------- 營養面板 ---------- */

function renderNutrition(totals, macrosEl, listEl) {
  const macroKeys = ['protein', 'fat', 'carbs'];
  macrosEl.innerHTML = macroKeys.map((k) => {
    const n = state.nutrients.find((x) => x.key === k);
    return n ? `<div class="macro"><b>${fmt(totals[k] ?? 0, n.unit)}</b><span>${esc(n.label)}</span></div>` : '';
  }).join('');
  listEl.innerHTML = state.nutrients
    .filter((n) => n.key !== 'kcal' && !macroKeys.includes(n.key) && totals[n.key] !== undefined)
    .map((n) => {
      const v = totals[n.key];
      const pct = n.dv ? (v / n.dv) * 100 : null;
      return `<div class="nrow ${n.kind === 'limit' ? 'limit' : ''}">
        <span>${esc(n.label)}</span>
        <span class="bar"><i style="width:${pct === null ? 0 : Math.min(100, pct)}%"></i></span>
        <span class="val">${fmt(v, n.unit)}</span>
        <span class="pct">${pct === null ? '' : Math.round(pct) + '%'}</span>
      </div>`;
    }).join('');
}

/* ---------- 搜尋頁 ---------- */

function renderSearch() {
  const cats = ['全部', ...new Set(state.foods.map((f) => f.category).filter(Boolean))];
  $('cats').innerHTML = cats.map((c) =>
    `<button class="chip ${c === state.category ? 'on' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
  const q = $('q').value.trim().toLowerCase();
  let list = state.foods.filter((f) => (state.category === '全部' || f.category === state.category) && (!q || f._hay.includes(q)));
  if (q) {
    const rank = (f) => (f.name.toLowerCase().startsWith(q) ? 0 : f.name.toLowerCase().includes(q) ? 1 :
      (f.aliases || []).some((a) => a.toLowerCase().includes(q)) ? 2 : 3);
    list.sort((a, b) => rank(a) - rank(b));
  }
  $('results').innerHTML = list.map((f) => `<li><a href="#/food/${encodeURIComponent(f.id)}">
      <span class="emo">${esc(f.emoji || '🍽️')}</span>
      <span class="info"><b>${esc(f.name)}</b><small>${esc(f.summary || f.category || '')}</small></span>
      <span class="kc"><b>${Math.round(f.per100g.kcal ?? 0)}</b><br>大卡/100g</span>
    </a></li>`).join('');
  $('no-results').hidden = list.length > 0;
}

/* ---------- 食物頁：畫布 ---------- */

const stage = $('stage');
const sctx = stage.getContext('2d');
let stageW = 0, stageH = 0;

function pxPerCm() { return stageH / (state.settings.palmCm * ZOOMS[state.zoom]); }

function resizeStage() {
  const w = stage.parentElement.clientWidth;
  if (!w) return;
  stageW = w;
  stageH = Math.round(Math.min(w * 1.12, window.innerHeight * 0.52));
  const dpr = window.devicePixelRatio || 1;
  stage.style.height = stageH + 'px';
  stage.width = Math.round(stageW * dpr);
  stage.height = Math.round(stageH * dpr);
  sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawStage();
}

function drawStage() {
  if (!state.food || !stageW) return;
  const k = pxPerCm();
  const cx = stageW / 2, cy = stageH / 2;
  sctx.clearRect(0, 0, stageW, stageH);

  // 1 公分格線
  sctx.strokeStyle = '#f1e9da';
  sctx.lineWidth = 1;
  sctx.beginPath();
  for (let x = cx % k; x < stageW; x += k) { sctx.moveTo(x, 0); sctx.lineTo(x, stageH); }
  for (let y = cy % k; y < stageH; y += k) { sctx.moveTo(0, y); sctx.lineTo(stageW, y); }
  sctx.stroke();

  // 手掌（實際比例）
  const handH = state.settings.palmCm * k;
  const left = cx - (HAND_CENTER_X * handH) / 100;
  const top = cy - handH / 2;
  drawHand(sctx, left, top, handH);

  // 手掌長度標示
  const rx = left + handH * 0.84;
  sctx.strokeStyle = sctx.fillStyle = '#c9b79e';
  sctx.lineWidth = 1.5;
  sctx.beginPath();
  sctx.moveTo(rx, top); sctx.lineTo(rx, top + handH);
  sctx.moveTo(rx - 5, top); sctx.lineTo(rx + 5, top);
  sctx.moveTo(rx - 5, top + handH); sctx.lineTo(rx + 5, top + handH);
  sctx.stroke();
  sctx.font = '12px sans-serif';
  sctx.save();
  sctx.translate(rx + 14, cy);
  sctx.rotate(Math.PI / 2);
  sctx.textAlign = 'center';
  sctx.fillText(`手掌 ${state.settings.palmCm} 公分`, 0, 0);
  sctx.restore();

  // 使用者畫的食物
  const all = state.drawing ? [...state.strokes, state.drawing] : state.strokes;
  for (const pts of all) {
    if (pts.length < 2) continue;
    sctx.beginPath();
    pts.forEach((p, i) => (i ? sctx.lineTo(cx + p.x * k, cy + p.y * k) : sctx.moveTo(cx + p.x * k, cy + p.y * k)));
    sctx.closePath();
    sctx.fillStyle = 'rgba(217, 119, 43, .28)';
    sctx.strokeStyle = '#d9772b';
    sctx.lineWidth = 2.5;
    sctx.lineJoin = 'round';
    sctx.fill();
    sctx.stroke();
  }
}

function stagePoint(e) {
  const r = stage.getBoundingClientRect();
  const k = pxPerCm();
  return { x: (e.clientX - r.left - stageW / 2) / k, y: (e.clientY - r.top - stageH / 2) / k };
}
stage.addEventListener('pointerdown', (e) => {
  if (!state.food) return;
  e.preventDefault();
  stage.setPointerCapture(e.pointerId);
  state.drawing = [stagePoint(e)];
  $('stage-hint').hidden = true;
});
stage.addEventListener('pointermove', (e) => {
  if (!state.drawing) return;
  const p = stagePoint(e), last = state.drawing[state.drawing.length - 1];
  if (Math.hypot(p.x - last.x, p.y - last.y) * pxPerCm() < 2) return;
  state.drawing.push(p);
  drawStage();
});
function endStroke() {
  if (!state.drawing) return;
  const pts = state.drawing;
  state.drawing = null;
  if (pts.length > 4 && polygonArea(pts) > 0.3) {
    state.strokes.push(pts);
    applyEstimate();
  } else if (!state.strokes.length) {
    $('stage-hint').hidden = false;
    toast('請畫一個圈，圈出食物的範圍');
  }
  drawStage();
}
stage.addEventListener('pointerup', endStroke);
stage.addEventListener('pointercancel', endStroke);

function applyEstimate() {
  const dim = $('stage-dim');
  if (!state.strokes.length) {
    dim.textContent = '';
  } else {
    const s = strokeStats(state.strokes[state.strokes.length - 1]);
    const count = state.strokes.length > 1 ? `${state.strokes.length} 塊・` : '';
    dim.textContent = `${count}約 ${s.length.toFixed(1)} × ${s.width.toFixed(1)} 公分`;
  }
  setGrams(Math.round(estimateGrams()));
}
function setGrams(g) {
  $('grams').value = g;
  renderFoodNutrition();
}
function currentGrams() { return Math.max(0, parseFloat($('grams').value) || 0); }
function renderFoodNutrition() {
  const totals = nutrientsFor(state.food, currentGrams());
  $('kcal').textContent = Math.round(totals.kcal ?? 0);
  renderNutrition(totals, $('macros'), $('nutri'));
}

function openFood(id) {
  const f = state.foods.find((x) => x.id === id);
  if (!f) { location.hash = '#/'; return false; }
  state.food = f;
  state.strokes = [];
  state.drawing = null;
  state.zoom = 0;
  $('food-emoji').textContent = f.emoji || '🍽️';
  $('food-name').textContent = f.name;
  $('stage-hint').hidden = false;
  $('stage-dim').textContent = '';

  const shape = f.shape || { type: 'round' };
  const adjustable = shape.type === 'flat' || shape.type === 'mound';
  $('thick-row').hidden = !adjustable;
  if (adjustable) {
    const base = shape.thickness ?? 2;
    const slider = $('thick');
    slider.min = shape.min ?? Math.max(0.1, +(base / 4).toFixed(1));
    slider.max = shape.max ?? +(base * 3).toFixed(1);
    slider.value = state.thickness = base;
    $('thick-label').textContent = shape.type === 'mound' ? '堆起來的高度' : '厚度';
    $('thick-val').textContent = base + ' 公分';
  }
  const sv = f.serving;
  $('use-serving').hidden = !sv;
  if (sv) $('use-serving').textContent = `不想畫？用常見份量：${sv.label}（${sv.grams} 公克）`;
  setGrams(0);
  return true;
}

$('thick').addEventListener('input', (e) => {
  state.thickness = parseFloat(e.target.value);
  $('thick-val').textContent = state.thickness + ' 公分';
  if (state.strokes.length) applyEstimate();
});
$('grams').addEventListener('input', renderFoodNutrition);
$('grams').addEventListener('focus', (e) => e.target.select());
$('use-serving').addEventListener('click', () => setGrams(state.food.serving.grams));
$('t-undo').addEventListener('click', () => { state.strokes.pop(); applyEstimate(); drawStage(); $('stage-hint').hidden = state.strokes.length > 0; });
$('t-clear').addEventListener('click', () => { state.strokes = []; applyEstimate(); drawStage(); $('stage-hint').hidden = false; });
$('t-zoom').addEventListener('click', () => {
  state.zoom = (state.zoom + 1) % ZOOMS.length;
  drawStage();
  toast(['手掌大小的食物', '較大的食物（便當、盤子）', '很大的食物（披薩、西瓜）'][state.zoom]);
});
$('food-back').addEventListener('click', () => (history.length > 1 ? history.back() : (location.hash = '#/')));
$('add-log').addEventListener('click', () => {
  const grams = currentGrams();
  if (!grams) { toast('先畫出食物大小，或輸入公克數'); return; }
  const f = state.food;
  state.log.push({ id: Date.now().toString(36), day: dayKey(new Date()), time: Date.now(), foodId: f.id, name: f.name, emoji: f.emoji, grams, n: nutrientsFor(f, grams) });
  store.set('log', state.log);
  toast(`已加入今日紀錄：${f.name} ${grams} 公克`);
});

/* ---------- 健康小書 ---------- */

function openBook() {
  const f = state.food;
  const items = (arr, cls, a, b) => (arr || []).map((x) =>
    `<div class="book-item ${cls}"><b>${esc(x[a])}</b><span>${esc(x[b])}</span></div>`).join('');
  $('sheet-content').innerHTML = `
    <p class="book-title">${esc(f.emoji || '')} ${esc(f.name)}</p>
    <p class="muted">${esc(f.summary || '')}</p>
    ${f.highlights?.length ? `<div class="tags">${f.highlights.map((h) => `<span>${esc(h)}</span>`).join('')}</div>` : ''}
    ${f.benefits?.length ? `<div class="book-sec"><h3>💚 可能有助於預防／保健</h3>${items(f.benefits, '', 'title', 'detail')}</div>` : ''}
    ${f.cautions?.length ? `<div class="book-sec"><h3>⚠️ 這些人要注意或不適合</h3>${items(f.cautions, 'warn', 'who', 'why')}</div>` : ''}
    ${f.tips ? `<div class="book-sec"><h3>💡 小撇步</h3><div class="book-tip">${esc(f.tips)}</div></div>` : ''}
    <p class="hint" style="margin-top:18px">以上為一般性衛教資訊，食物不能取代藥物或治療；有慢性病、過敏或正在服藥者，請以醫師、營養師的建議為準。</p>`;
  $('sheet').hidden = false;
}
$('food-book').addEventListener('click', openBook);
$('open-book').addEventListener('click', openBook);
$('sheet').addEventListener('click', (e) => { if (e.target.closest('[data-close]')) $('sheet').hidden = true; });

/* ---------- 紀錄頁 ---------- */

function renderLog() {
  const today = dayKey(new Date());
  const d = new Date(state.day + 'T00:00:00');
  const label = `${d.getMonth() + 1} 月 ${d.getDate()} 日（${'日一二三四五六'[d.getDay()]}）`;
  $('day-label').textContent = state.day === today ? `今天・${label}` : label;
  $('day-next').style.visibility = state.day >= today ? 'hidden' : 'visible';

  const entries = state.log.filter((e) => e.day === state.day);
  const totals = {};
  for (const e of entries) for (const [k, v] of Object.entries(e.n)) totals[k] = (totals[k] || 0) + v;
  $('day-kcal').textContent = Math.round(totals.kcal || 0);
  renderNutrition(totals, $('day-macros'), $('day-nutri'));
  $('log-list').innerHTML = entries.map((e) => `<li>
      <span class="emo">${esc(e.emoji || '🍽️')}</span>
      <span class="info"><b>${esc(e.name)}</b><small>${e.grams} 公克・${Math.round(e.n.kcal || 0)} 大卡・${new Date(e.time).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}</small></span>
      <button class="del" data-del="${esc(e.id)}" aria-label="刪除">✕</button>
    </li>`).join('');
  $('log-empty').hidden = entries.length > 0;
}
function shiftDay(delta) {
  const d = new Date(state.day + 'T00:00:00');
  d.setDate(d.getDate() + delta);
  state.day = dayKey(d);
  renderLog();
}
$('day-prev').addEventListener('click', () => shiftDay(-1));
$('day-next').addEventListener('click', () => shiftDay(1));
$('log-list').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-del]');
  if (!btn) return;
  state.log = state.log.filter((x) => x.id !== btn.dataset.del);
  store.set('log', state.log);
  renderLog();
});

/* ---------- 設定 ---------- */

function clampPalm(v) { return Math.min(26, Math.max(10, Math.round(v * 10) / 10)); }
function savePalm(v) {
  if (!isFinite(v)) return;
  state.settings.palmCm = clampPalm(v);
  store.set('settings', state.settings);
}
document.addEventListener('click', (e) => {
  const step = e.target.closest('[data-palm-step]');
  if (!step) return;
  const input = step.parentElement.querySelector('input');
  input.value = clampPalm((parseFloat(input.value) || 18) + parseFloat(step.dataset.palmStep));
  input.dispatchEvent(new Event('change'));
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('[data-measure]')) return;
  // 示意圖：掌心放一枚十元硬幣
  const demo = $('m-demo').getContext('2d');
  demo.clearRect(0, 0, 300, 330);
  drawHand(demo, 46, 20, 290);
  const cx = 46 + 49 * 2.9, cy = 20 + 74 * 2.9, r = (2.6 / 18) * 290 / 2;
  demo.fillStyle = '#c9a25a'; demo.strokeStyle = '#8f6f2f'; demo.lineWidth = 2;
  demo.beginPath(); demo.arc(cx, cy, r, 0, Math.PI * 2); demo.fill(); demo.stroke();
  demo.fillStyle = '#6b5220'; demo.font = '700 15px sans-serif'; demo.textAlign = 'center'; demo.textBaseline = 'middle';
  demo.fillText('10', cx, cy + 1);
  openMeasure((cm) => {
    savePalm(cm);
    $('setup-palm').value = $('set-palm').value = state.settings.palmCm;
    toast(`手掌長度已設定為 ${state.settings.palmCm} 公分`);
    if (!$('view-setup').hidden) route();
  });
});
$('set-palm').addEventListener('change', (e) => { savePalm(parseFloat(e.target.value)); e.target.value = state.settings.palmCm; toast('已更新手掌長度'); });
$('setup-done').addEventListener('click', () => {
  const v = parseFloat($('setup-palm').value);
  if (!isFinite(v) || v < 10 || v > 26) { toast('請輸入 10–26 公分之間的數字'); return; }
  savePalm(v);
  route();
});
$('clear-log').addEventListener('click', () => {
  if (!confirm('確定要清除所有飲食紀錄嗎？這個動作無法復原。')) return;
  state.log = [];
  store.set('log', state.log);
  toast('已清除紀錄');
});
$('export-log').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(state.log, null, 2)], { type: 'application/json' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: `food-log-${dayKey(new Date())}.json` });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

/* ---------- 路由 ---------- */

function show(name) {
  for (const v of document.querySelectorAll('.view')) v.hidden = v.id !== 'view-' + name;
  $('nav').hidden = name === 'setup';
  for (const a of document.querySelectorAll('[data-nav]')) a.classList.toggle('on', a.dataset.nav === (name === 'food' ? 'search' : name));
  $('sheet').hidden = true;
  window.scrollTo(0, 0);
}
function route() {
  if (!state.settings.palmCm) {
    show('setup');
    drawHand($('setup-hand').getContext('2d'), 30, 10, 240, '#f1d6bf');
    return;
  }
  const [, page, arg] = location.hash.split('/');
  if (page === 'food' && arg) {
    if (!openFood(decodeURIComponent(arg))) return;
    show('food');
    resizeStage();
  } else if (page === 'log') {
    show('log');
    renderLog();
  } else if (page === 'settings') {
    $('set-palm').value = state.settings.palmCm;
    $('food-count').textContent = state.foods.length;
    show('settings');
  } else {
    show('search');
    renderSearch();
  }
}
window.addEventListener('hashchange', route);
window.addEventListener('resize', () => { if (!$('view-food').hidden) resizeStage(); });
$('q').addEventListener('input', renderSearch);
$('cats').addEventListener('click', (e) => {
  const chip = e.target.closest('[data-cat]');
  if (!chip) return;
  state.category = chip.dataset.cat;
  renderSearch();
});

/* ---------- 啟動 ---------- */

loadData().then(route).catch((err) => {
  console.error(err);
  $('app').innerHTML = '<p class="empty">食物資料載入失敗，請確認網路後重新整理。</p>';
});
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
