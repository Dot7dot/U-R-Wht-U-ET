#!/usr/bin/env node
// 用保存的 TFDA、USDA、MEXT 原始欄位核對肉類資料。
// node tools/validate-meat-cuts.mjs
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const foods = path.join(root, 'foods');
const readJSON = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const snapshot = readJSON(path.join(foods, 'sources/meat-cuts-reference.json'));
const nutrients = readJSON(path.join(foods, 'nutrients.json'));
const keys = nutrients.map((n) => n.key);
assert.equal(new Set(keys).size, keys.length, '營養素代號重複');
for (const key of ['vitB12', 'vitD']) assert.equal(nutrients.find((n) => n.key === key).unit, '微克');
for (const key of ['epa', 'dha', 'zinc']) assert.equal(nutrients.find((n) => n.key === key).unit, '毫克');
const index = readJSON(path.join(foods, 'index.json'));
const files = fs.readdirSync(path.join(foods, 'items')).filter((f) => f.endsWith('.json') && !f.startsWith('_')).sort();
assert.deepEqual(index, files, '索引與實際檔案不一致');
const ids = new Set(), names = new Set(), used = new Set();
const counts = {}, groups = new Set();
let checked = 0;
for (const file of index) {
  const food = readJSON(path.join(foods, 'items', file));
  assert(!ids.has(food.id), `重複 id: ${file}`); ids.add(food.id);
  if (food.dataNotes?.sourceSet !== snapshot.sourceSet) continue;
  checked++;
  assert.equal(file, food.id + '.json');
  assert.equal(food.category, '豆魚蛋肉');
  assert(/[\u3400-\u9fff]/u.test(food.name));
  assert(!names.has(food.name), `重複中文名稱: ${file}`); names.add(food.name);
  const ref = food.dataNotes.sourceRecord;
  assert(!used.has(ref), `重複來源: ${file}`); used.add(ref);
  const record = snapshot.records[ref]; assert(record, `來源不存在: ${file}`);
  const source = food.sources[0];
  assert.equal(source.originalDescription, record.originalName, `來源名稱不符: ${file}`);
  assert.equal(source.sampleId || source.ndbNo || source.foodNo, record.code);
  const expected = {}, qualifiers = {};
  for (const [key, field] of Object.entries(snapshot.fieldMappings[record.provider])) {
    let raw, unit;
    if (record.provider === 'USDA') raw = record.rawFields[field];
    else {
      const entry = record.nutrients[field[0]];
      if (!entry) continue;
      raw = entry.rawValue; unit = entry.unit;
      assert.equal(unit, field[1], `單位不符: ${file}.${key}`);
    }
    if (raw === '') continue;
    if (record.provider === 'MEXT') {
      const normalized = raw.replace(/^\(|\)$/g, '');
      if (/^\d+(?:\.\d+)?$/.test(normalized)) {
        expected[key] = Number(normalized);
        if (raw.startsWith('(')) qualifiers[key] = '來源以括號標示的推定／估計值：' + raw;
      } else if (raw === 'Tr') qualifiers[key] = '來源標示微量 Tr；未以零代填';
    } else {
      const value = Number(raw); assert(Number.isFinite(value) && value >= 0);
      expected[key] = value;
    }
  }
  assert.deepEqual(food.per100g, expected, `營養值與原始欄位不符: ${file}`);
  assert.deepEqual(food.dataNotes.qualifiers, qualifiers, `推定值註記不符: ${file}`);
  assert.deepEqual(food.dataNotes.missingNutrients, keys.filter((key) => !(key in expected)), `缺值標示不符: ${file}`);
  assert.equal(food.edibleRatio, 1);
  assert.equal(food.serving.grams, 100);
  assert.equal(food.shape.type, 'flat');
  assert(food.shape.thickness > 0 && food.shape.min > 0 && food.shape.max >= food.shape.thickness);
  assert(food.meatDetails.referenceScope && food.meatDetails.weightBasis && food.meatDetails.commonUses.length);
  groups.add(food.subcategory);
  counts[record.provider] = (counts[record.provider] || 0) + 1;
}
assert.equal(checked, snapshot.expectedCount);
assert.equal(used.size, Object.keys(snapshot.records).length);
assert.deepEqual(counts, { MEXT: 8, TFDA: 139, USDA: 25 });
assert.equal(groups.size, 11);
console.log(`✅ ${checked} 筆肉類與水產、11 個細分類，營養值、單位、缺值與推定值均符合來源；全站 ${index.length} 筆。`);
