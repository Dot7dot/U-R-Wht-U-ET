#!/usr/bin/env node
// 核對本批 300 筆 JSON 與保留的 USDA SR28 原始紀錄。
// 用法：node tools/validate-food-expansion.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const foods = path.join(root, 'foods');
const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
// SR28 Table 16，零起算欄位索引；g 與 mg 依 foods/nutrients.json。
const columns = { kcal: 3, protein: 4, fat: 5, satFat: 44, carbs: 7, sugar: 9,
  fiber: 8, sodium: 15, potassium: 14, calcium: 10, iron: 11, vitC: 20, cholesterol: 47 };
function parseRecord(line) {
  const fields = [];
  let value = '', quoted = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '~') {
      if (quoted && line[i + 1] === '~') { value += '~'; i++; }
      else quoted = !quoted;
    } else if (char === '^' && !quoted) { fields.push(value); value = ''; }
    else value += char;
  }
  assert.equal(quoted, false, '原始紀錄引號未關閉');
  fields.push(value);
  assert.equal(fields.length, 53, 'SR28 原始紀錄欄位數錯誤');
  return fields;
}
const sourceRows = fs.readFileSync(path.join(foods, 'sources/sr28-expansion-abbrev.txt'), 'utf8')
  .trimEnd().split(/\r?\n/).map(parseRecord);
const records = new Map(sourceRows.map((row) => [row[0], row]));
assert.equal(sourceRows.length, 300);
assert.equal(records.size, 300, '來源編號重複');
const index = readJSON(path.join(foods, 'index.json'));
const actualFiles = fs.readdirSync(path.join(foods, 'items')).filter((f) => f.endsWith('.json') && !f.startsWith('_')).sort();
assert.deepEqual(index, actualFiles, '索引與資料夾不一致');
const ids = new Set(), names = new Set(), used = new Set(), groups = new Set();
let checked = 0;
for (const file of index) {
  const food = readJSON(path.join(foods, 'items', file));
  assert(!ids.has(food.id), `id 重複：${file}`);
  ids.add(food.id);
  if (food.dataNotes?.sourceSet !== 'sr28-expansion-300') continue;
  checked++;
  assert.equal(food.id + '.json', file);
  assert(!names.has(food.name), `名稱重複：${file}`);
  names.add(food.name);
  assert(/[\u3400-\u9fff]/u.test(food.name), `缺少中文名稱：${file}`);
  assert(food.category && food.subcategory);
  groups.add(food.subcategory);
  const source = food.sources[0], row = records.get(source.ndbNo);
  assert(row, `找不到來源：${file}`);
  assert(!used.has(source.ndbNo), `重複使用來源：${file}`);
  used.add(source.ndbNo);
  assert.equal(source.originalDescription, row[1], `來源名稱錯誤：${file}`);
  const expected = {}, missing = [];
  for (const [key, column] of Object.entries(columns)) {
    if (row[column] === '') missing.push(key);
    else {
      const value = Number(row[column]);
      assert(Number.isFinite(value) && value >= 0, `數值錯誤：${file}.${key}`);
      expected[key] = value;
    }
  }
  assert.deepEqual(food.per100g, expected, `營養數值不符：${file}`);
  assert.deepEqual(food.dataNotes.missingNutrients, missing, `缺值標示不符：${file}`);
  assert.equal(food.edibleRatio, 1);
  assert(food.serving.grams > 0);
}
assert.equal(checked, 300, '本批應有 300 筆食物');
assert.equal(used.size, records.size, '原始紀錄未完整使用');
assert.equal(groups.size, 14, '本批應涵蓋 14 個細分類');
console.log(`✅ ${checked} 筆食物、14 個細分類、13 種營養欄位與缺值均符合 USDA 原始紀錄；索引共 ${index.length} 筆。`);
