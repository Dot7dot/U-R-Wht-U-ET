#!/usr/bin/env node
// 核對品牌零食批次（sourceSet = branded-snacks-2026）與保留的來源紀錄
// foods/sources/branded-snacks-2026.jsonl（通路商品頁刊載的包裝營養標示）。
// 用法：node tools/validate-branded-snacks.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const foods = path.join(root, 'foods');
const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const nutrientKeys = new Set(readJSON(path.join(foods, 'nutrients.json')).map((n) => n.key));
const records = new Map(fs.readFileSync(path.join(foods, 'sources/branded-snacks-2026.jsonl'), 'utf8')
  .trim().split('\n').map((l) => JSON.parse(l)).map((r) => [r.id, r]));
const index = readJSON(path.join(foods, 'index.json'));
const actual = fs.readdirSync(path.join(foods, 'items')).filter((f) => f.endsWith('.json') && !f.startsWith('_')).sort();
assert.deepEqual(index, actual, '索引與資料夾不一致');
const names = new Set();
let checked = 0;
for (const file of index) {
  const food = readJSON(path.join(foods, 'items', file));
  assert(!names.has(food.name), `名稱重複：${file}`);
  names.add(food.name);
  if (food.dataNotes?.sourceSet !== 'branded-snacks-2026') continue;
  checked++;
  assert.equal(food.id + '.json', file);
  const rec = records.get(food.id);
  assert(rec, `找不到來源紀錄：${file}`);
  assert(food.brand && food.name.includes(food.brand), `名稱缺少品牌：${file}`);
  assert.equal(food.sources[0].url, rec.url);
  assert.equal(food.sources[0].originalName, rec.originalName);
  assert.deepEqual(food.per100g, rec.per100, `營養數值不符：${file}`);
  const p = food.per100g;
  for (const k of Object.keys(p)) assert(nutrientKeys.has(k) && Number.isFinite(p[k]) && p[k] >= 0, `欄位錯誤：${file}.${k}`);
  for (const k of ['kcal', 'protein', 'fat', 'carbs', 'sodium']) assert(k in p, `缺少 ${k}：${file}`);
  // 標示內部一致性：熱量 ≈ 4×蛋白質 + 9×脂肪 + 4×碳水化合物
  const est = 4 * p.protein + 9 * p.fat + 4 * p.carbs;
  assert(Math.abs(p.kcal - est) <= Math.max(0.15 * p.kcal, 20), `熱量與三大營養素不一致：${file}`);
  assert((p.satFat ?? 0) <= p.fat + 0.5 && (p.sugar ?? 0) <= p.carbs + 0.5, `子項大於母項：${file}`);
  // 有每份數值時，與每 100 公克的換算要一致
  if (rec.perServing && rec.servingG && !rec.derivedFromServing && rec.perServing.kcal > 0) {
    const scaled = rec.perServing.kcal * 100 / rec.servingG;
    if (Math.abs(scaled - p.kcal) > Math.max(0.1 * p.kcal, 5)) assert(food.dataNotes, `每份與每 100 公克不一致：${file}`);
  }
  assert.equal(food.dataNotes.derivedFromServing, rec.derivedFromServing);
  assert(food.serving.grams > 0 && food.density > 0 && food.edibleRatio === 1);
}
assert.equal(checked, records.size, '來源紀錄與食物筆數不一致');
console.log(`✅ ${checked} 筆品牌零食的營養數值與來源紀錄一致，且通過標示內部一致性檢查；索引共 ${index.length} 筆。`);
