#!/usr/bin/env node
// 核對台灣甜點、餅乾、零食批次（sourceSet = tfda-snacks-2026）的 JSON
// 與保留的食藥署「食品營養成分資料庫」原始紀錄（foods/sources/tfda-snacks-2026.csv）。
// 用法：node tools/validate-snack-expansion.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const foods = path.join(root, 'foods');
const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
// App 營養欄位 ↔ 資料庫「分析項」
const items = { kcal: '熱量', protein: '粗蛋白', fat: '粗脂肪', satFat: '飽和脂肪', carbs: '總碳水化合物',
  sugar: '糖質總量', fiber: '膳食纖維', sodium: '鈉', potassium: '鉀', calcium: '鈣', iron: '鐵',
  vitC: '維生素C', cholesterol: '膽固醇' };

// 全部欄位皆以雙引號包住的 CSV
function parseCSV(text) {
  const rows = [];
  let row = [], value = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { value += '"'; i++; }
      else if (c === '"') quoted = false;
      else value += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(value); value = ''; }
    else if (c === '\n') { row.push(value); rows.push(row); row = []; value = ''; }
    else if (c !== '\r') value += c;
  }
  assert.equal(quoted, false, 'CSV 引號未關閉');
  if (value || row.length) { row.push(value); rows.push(row); }
  return rows;
}

const [header, ...lines] = parseCSV(fs.readFileSync(path.join(foods, 'sources/tfda-snacks-2026.csv'), 'utf8'));
const col = Object.fromEntries(header.map((h, i) => [h, i]));
const records = new Map();
for (const line of lines) {
  assert.equal(line.length, header.length, '原始紀錄欄位數錯誤');
  const id = line[col['整合編號']];
  if (!records.has(id)) records.set(id, { name: line[col['樣品名稱']], waste: line[col['廢棄率']], values: {} });
  const rec = records.get(id);
  assert(!(line[col['分析項']] in rec.values), `來源分析項重複：${id}`);
  rec.values[line[col['分析項']]] = line[col['每100克含量']].trim();
}

const index = readJSON(path.join(foods, 'index.json'));
const actual = fs.readdirSync(path.join(foods, 'items')).filter((f) => f.endsWith('.json') && !f.startsWith('_')).sort();
assert.deepEqual(index, actual, '索引與資料夾不一致');
const ids = new Set(), names = new Set(), used = new Set();
let checked = 0;
for (const file of index) {
  const food = readJSON(path.join(foods, 'items', file));
  assert(!ids.has(food.id), `id 重複：${file}`);
  ids.add(food.id);
  assert(!names.has(food.name), `名稱重複：${file}`);
  names.add(food.name);
  if (food.dataNotes?.sourceSet !== 'tfda-snacks-2026') continue;
  checked++;
  assert.equal(food.id + '.json', file);
  assert(food.category && food.subcategory);
  const source = food.sources[0], rec = records.get(source.integratedNo);
  assert(rec, `找不到來源：${file}`);
  assert(!used.has(source.integratedNo), `重複使用來源：${file}`);
  used.add(source.integratedNo);
  assert.equal(source.originalName, rec.name, `來源名稱錯誤：${file}`);
  const expected = {}, missing = [];
  for (const [key, item] of Object.entries(items)) {
    assert(item in rec.values, `來源缺少分析項 ${item}：${file}`);
    if (rec.values[item] === '') missing.push(key);
    else {
      const value = Number(rec.values[item]);
      assert(Number.isFinite(value) && value >= 0, `數值錯誤：${file}.${key}`);
      expected[key] = value;
    }
  }
  assert.deepEqual(food.per100g, expected, `營養數值不符：${file}`);
  assert.deepEqual(food.dataNotes.missingNutrients, missing, `缺值標示不符：${file}`);
  const ratio = Math.round((1 - Number(rec.waste || 0) / 100) * 1000) / 1000;
  assert.equal(food.edibleRatio, ratio, `可食比例不符：${file}`);
  assert(food.serving.grams > 0 && food.density > 0);
}
assert(checked >= 100, '本批至少應有 100 筆');
assert.equal(used.size, records.size, '原始紀錄未完整使用');
console.log(`✅ ${checked} 筆台灣甜點、餅乾、零食的 13 種營養欄位、缺值與可食比例均符合食藥署原始紀錄；索引共 ${index.length} 筆。`);
