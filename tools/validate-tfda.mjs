#!/usr/bin/env node
// 核對全部 TFDA 樣品覆蓋率、原始營養值、缺值與供 App 載入的分批快取。
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'foods');
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const source = read('sources/tfda-complete/index.json');
const definitions = read('nutrients.json');
const keys = definitions.map((n) => n.key);
assert.equal(source.fieldCount, 104);
assert.equal(source.fields.length, 104);
assert.equal(new Set(source.fields.map((f) => f.name)).size, 104);
const index = read('index.json');
assert.deepEqual(index, fs.readdirSync(path.join(root, 'items')).filter((f) => f.endsWith('.json') && !f.startsWith('_')).sort());
const byFile = new Map(index.map((file) => [file, read('items/' + file)]));
const ids = new Set();
const bySample = new Map();
for (const [file, food] of byFile) {
  assert(!ids.has(food.id), `重複食物 id: ${file}`); ids.add(food.id);
  for (const s of food.sources || []) {
    if (!s.sampleId) continue;
    assert(!bySample.has(s.sampleId), `重複 TFDA sampleId: ${s.sampleId}`);
    bySample.set(s.sampleId, { file, food, source: s });
  }
}
const seen = new Set();
let imported = 0, reused = 0;
for (const group of source.categories) {
  const snapshot = read('sources/tfda-complete/' + group.file);
  assert.equal(snapshot.sourceCategory, group.sourceCategory);
  assert.equal(snapshot.records.length, group.count);
  for (const record of snapshot.records) {
    assert(!seen.has(record.sampleId), `來源重複: ${record.sampleId}`); seen.add(record.sampleId);
    assert.equal(record.values.length, source.fieldCount);
    const found = bySample.get(record.sampleId);
    assert(found, `漏收官方樣品: ${record.sampleId} ${record.name}`);
    assert.equal(source.coverage[record.sampleId], found.file);
    assert.equal(found.source.originalDescription, record.name);
    assert.equal(found.source.preparation, record.description);
    const expected = {};
    for (const key of keys) {
      const mapping = source.nutrientMappings[key]; assert(mapping, `缺少欄位對應: ${key}`);
      assert.equal(source.fields[mapping.fieldIndex].unit, mapping.unit);
      const raw = record.values[mapping.fieldIndex];
      if (raw === '') continue;
      assert(/^\d+(?:\.\d+)?$/.test(raw), `非數值: ${record.sampleId}.${key}`);
      expected[key] = Number(raw);
      assert(Number.isFinite(expected[key]) && expected[key] >= 0);
    }
    assert.deepEqual(found.food.per100g, expected, `數值與官方不符: ${record.sampleId}`);
    assert.deepEqual(found.food.dataNotes.missingNutrients, keys.filter((key) => !(key in expected)));
    if (found.food.dataNotes.sourceSet === source.sourceSet) imported++; else reused++;
  }
}
assert.equal(seen.size, source.sampleCount);
assert.equal(seen.size, 2213, '此來源快照應有 2213 個官方樣品');
assert.deepEqual([...seen].sort(), Object.keys(source.coverage).sort());
assert.equal(imported, source.importedCount);
assert.equal(reused, source.reusedCount);
assert.equal(imported + reused, source.sampleCount);
const catalog = read('catalog/index.json');
assert.equal(catalog.version, 1);
assert.equal(catalog.foodCount, index.length);
assert.deepEqual(catalog.itemFiles, index);
const cached = [];
for (const chunk of catalog.chunks) {
  assert(/^part-\d+-[a-f0-9]+\.json$/.test(chunk.file));
  const raw = fs.readFileSync(path.join(root, 'catalog', chunk.file));
  assert.equal(createHash('sha256').update(raw).digest('hex'), chunk.sha256);
  const foods = JSON.parse(raw);
  assert.equal(foods.length, chunk.count);
  assert(foods.length > 0 && foods.length <= 100);
  cached.push(...foods);
}
assert.deepEqual(cached, index.map((file) => byFile.get(file)), '快取必須與可編輯的食物 JSON 完全一致');
console.log(`✅ TFDA ${seen.size}/${source.sampleCount} 筆覆蓋；新增 ${imported}、沿用 ${reused}；21 種營養值及缺值全符來源；全站 ${index.length} 筆、${catalog.chunks.length} 批快取。`);
