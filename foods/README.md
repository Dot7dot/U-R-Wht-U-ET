# 食物資料夾

App 裡所有食物的營養與健康資訊都放在這裡，**不用改程式**就能新增或調整。

```
foods/
├── index.json        ← 食物清單（由工具自動產生）
├── nutrients.json    ← 營養素定義：名稱、單位、每日參考值
├── _template.json    ← 新增食物用的範本
└── items/            ← 一種食物一個檔案
    ├── apple.json
    └── ...
```

## 新增一種食物

1. 複製 `_template.json` 到 `items/`，改成英文檔名，例如 `items/papaya.json`。
2. 填入內容（欄位說明見下表）。
3. 更新清單，二擇一：
   - 執行 `node tools/build-index.mjs`（會順便檢查格式）；或
   - 手動在 `index.json` 加上一行 `"papaya.json"`。
4. commit 並 push 到 `main`，GitHub Pages 更新後手機重新整理就會出現。

## 欄位說明

| 欄位 | 必填 | 說明 |
| --- | --- | --- |
| `id` | ✅ | 唯一的英文代號，建議和檔名相同 |
| `name` | ✅ | 顯示名稱 |
| `emoji` | | 圖示 |
| `category` | | 分類，會自動變成搜尋頁的篩選按鈕（寫新的分類名稱就會多一顆按鈕） |
| `aliases` | | 別名，搜尋時也找得到 |
| `summary` | | 一句話介紹 |
| `shape` | ✅ | 怎麼把畫出來的圖形換算成體積，見下方 |
| `density` | ✅ | 密度（公克／立方公分）。堆起來的食物請填「含空隙」的鬆密度 |
| `edibleRatio` | | 可食比例（0–1）。例如香蕉連皮畫，可食部分約 0.65 |
| `serving` | | 常見份量 `{ "label": "1 顆", "grams": 180 }`，讓使用者不畫也能快速帶入 |
| `per100g` | ✅ | 每 100 公克**可食部分**的營養，key 要對應 `nutrients.json` |
| `highlights` | | 營養亮點標籤 |
| `benefits` | | 小書：可能有助預防／保健 `{ "title", "detail" }` |
| `cautions` | | 小書：不適合或需注意的人 `{ "who", "why" }` |
| `tips` | | 小書：小撇步 |

### `shape`：三種估算方式

| type | 適合 | 體積算法 | 參數 |
| --- | --- | --- | --- |
| `round` | 蘋果、蛋、香蕉、地瓜等立體的食物 | 以畫出的長與寬當作橢球 | 無 |
| `flat` | 吐司、肉排、魚片、披薩等片狀食物 | 面積 × 厚度 | `thickness`（預設厚度，公分），可選 `min`、`max`（滑桿範圍） |
| `mound` | 飯、麵、青菜、堅果等堆起來的食物 | 面積 × 高度 × `fill` | `thickness`（預設堆高），可選 `min`、`max`、`fill`（預設 0.6） |

重量 = 體積 × `density` × `edibleRatio`。如果估出來偏重或偏輕，調整 `density` 就好。

## 新增一種營養素

1. 在 `nutrients.json` 加一行，例如
   `{ "key": "vitA", "label": "維生素A", "unit": "微克", "dv": 700, "kind": "good" }`
   - `dv`：每日參考值，用來算百分比；不想顯示百分比可填 `null`
   - `kind`：`good`（綠色）、`limit`（橘色，建議少吃的）、`neutral`
2. 在想顯示的食物 `per100g` 裡加上 `"vitA": 數值`。沒填的食物就不會顯示那一列。

## 資料來源

數值為參考衛福部食藥署「食品營養成分資料庫」與 USDA FoodData Central 整理的近似值，
健康資訊為一般性衛教內容，不能取代醫師或營養師的建議。
