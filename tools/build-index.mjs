#!/usr/bin/env node
// 掃描 foods/items/*.json，檢查格式並重新產生 foods/index.json
// 用法：node tools/build-index.mjs
import fs from 'node:fs';
import { buildCatalog } from './build-catalog.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'foods');
const nutrientKeys = JSON.parse(fs.readFileSync(path.join(root, 'nutrients.json'), 'utf8')).map((n) => n.key);
const files = fs.readdirSync(path.join(root, 'items')).filter((f) => f.endsWith('.json') && !f.startsWith('_')).sort();
const ids = new Set();
let problems = 0;
const warn = (file, msg) => { problems++; console.warn(`⚠️  ${file}: ${msg}`); };

for (const file of files) {
  let food;
  try { food = JSON.parse(fs.readFileSync(path.join(root, 'items', file), 'utf8')); } catch (e) { warn(file, 'JSON 格式錯誤：' + e.message); continue; }
  if (!food.id || !food.name) warn(file, '缺少 id 或 name');
  if (ids.has(food.id)) warn(file, `id「${food.id}」重複`);
  ids.add(food.id);
  if (!food.per100g || typeof food.per100g.kcal !== 'number') warn(file, '缺少 per100g.kcal');
  for (const k of Object.keys(food.per100g || {})) if (!nutrientKeys.includes(k)) warn(file, `per100g.${k} 不在 nutrients.json 裡，App 不會顯示`);
  if (!['round', 'flat', 'mound'].includes(food.shape?.type)) warn(file, 'shape.type 必須是 round、flat 或 mound');
  if (food.shape?.type !== 'round' && typeof food.shape?.thickness !== 'number') warn(file, 'flat／mound 需要 shape.thickness');
  if (typeof food.density !== 'number') warn(file, '缺少 density（公克／立方公分）');
}
fs.writeFileSync(path.join(root, 'index.json'), JSON.stringify(files, null, 2) + '\n');
console.log(`✅ 已更新 foods/index.json，共 ${files.length} 種食物${problems ? `，有 ${problems} 個問題待修正` : ''}`);
if (!problems) {
  const catalog = buildCatalog(root, files);
  console.log(`✅ 已更新 ${catalog.chunks.length} 批載入快取。`);
}
process.exit(problems ? 1 : 0);
