// 產生供 App 載入的分批快取；foods/items 仍是編輯資料的唯一來源。
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export function buildCatalog(foodsRoot, files) {
  const dir = path.join(foodsRoot, 'catalog');
  fs.mkdirSync(dir, { recursive: true });
  const chunks = [];
  for (let start = 0; start < files.length; start += 100) {
    const foods = files.slice(start, start + 100).map((file) =>
      JSON.parse(fs.readFileSync(path.join(foodsRoot, 'items', file), 'utf8')));
    const content = JSON.stringify(foods) + '\n';
    const sha256 = createHash('sha256').update(content).digest('hex');
    const file = `part-${String(chunks.length + 1).padStart(3, '0')}-${sha256.slice(0, 12)}.json`;
    fs.writeFileSync(path.join(dir, file), content);
    chunks.push({ file, count: foods.length, sha256 });
  }
  const manifest = { version: 1, foodCount: files.length, itemFiles: files, chunks };
  fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify(manifest, null, 2) + '\n');
  const keep = new Set(['index.json', ...chunks.map((c) => c.file)]);
  for (const file of fs.readdirSync(dir)) {
    if (/^part-\d+-[a-f0-9]+\.json$/.test(file) && !keep.has(file)) fs.unlinkSync(path.join(dir, file));
  }
  return manifest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'foods');
  const files = JSON.parse(fs.readFileSync(path.join(root, 'index.json'), 'utf8'));
  const result = buildCatalog(root, files);
  console.log(`✅ 已產生 ${result.chunks.length} 批快取，共 ${result.foodCount} 筆食物。`);
}
