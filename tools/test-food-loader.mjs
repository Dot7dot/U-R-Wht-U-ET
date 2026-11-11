#!/usr/bin/env node
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
const loader = source.slice(source.indexOf('const $'), source.indexOf('/* ---------- 小工具'));
const expectedIndex = JSON.parse(fs.readFileSync(path.join(root, 'foods/index.json'), 'utf8'));
const expectedIds = expectedIndex.map((file) => JSON.parse(fs.readFileSync(path.join(root, 'foods/items', file))).id);

async function run(mode) {
  let active = 0, peak = 0;
  const requests = [], warnings = [];
  const sandbox = {
    document: { getElementById: () => null },
    localStorage: { getItem: () => null },
    console: { warn: (...args) => warnings.push(args) },
    fetch: async (url) => {
      requests.push(url); active++; peak = Math.max(peak, active);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1));
        if (mode === 'missing' && url === 'foods/catalog/index.json') return { ok: false, status: 404 };
        let json = JSON.parse(fs.readFileSync(path.join(root, url), 'utf8'));
        if (mode === 'stale' && url === 'foods/catalog/index.json') json.itemFiles = json.itemFiles.slice(1);
        if (mode === 'broken' && url.startsWith('foods/catalog/part-001-')) json = [];
        return { ok: true, json: async () => json };
      } finally { active--; }
    },
  };
  const result = await vm.runInNewContext(`function dayKey() { return '2026-11-11'; }\n${loader}\nloadData().then(() => ({ count: state.foods.length, ids: state.foods.map(f => f.id), searchable: state.foods.every(f => typeof f._hay === 'string') }))`, sandbox);
  assert.equal(result.count, expectedIndex.length);
  assert.equal(JSON.stringify(result.ids), JSON.stringify(expectedIds));
  assert.equal(result.searchable, true);
  return { requests, warnings, peak };
}

test('大型資料庫透過分批快取完整載入，最多四批並行', async () => {
  const result = await run('normal');
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'foods/catalog/index.json')));
  assert.equal(result.requests.length, manifest.chunks.length + 3);
  assert(result.peak <= 4);
  assert.equal(result.requests.some((url) => url.startsWith('foods/items/')), false);
  assert.equal(result.warnings.length, 0);
});
for (const mode of ['missing', 'stale', 'broken']) {
  test(`快取 ${mode} 時，退回最多八筆並行且不漏資料`, async () => {
    const result = await run(mode);
    assert.equal(result.requests.filter((url) => url.startsWith('foods/items/')).length, expectedIndex.length);
    assert(result.peak <= 8);
    assert(result.warnings.length > 0);
  });
}
