# 台灣甜點、餅乾、零食：來源與整理說明

本批新增 145 筆台灣常見的甜點、餅乾、糖果與零食（鳳梨酥、太陽餅、牛軋糖、蛋捲、洋芋片、肉乾、瓜子、豆花等），
分類為「點心零食」，檔名一律以 `tw-` 開頭；既有食物檔案維持原樣。

## 資料來源

- 衛生福利部食品藥物管理署「食品營養成分資料庫」，政府資料開放平臺資料集（[下載連結](https://data.fda.gov.tw/opendata/exportDataList.do?method=ExportData&InfoId=20&logType=2)，
  線上查詢：<https://consumer.fda.gov.tw/Food/TFND.aspx?nodeID=178>）。
- 下載日期：2026-11-11。下載 ZIP 的 SHA-256：`9aeb0cdbefad3f82be9b4089f044c8d0bc087a6b7453ba96832d126ff6ea3aa1`（內含 `20_2.csv`）。
- 依「政府資料開放授權條款－第 1 版」利用並標示出處。

這是食藥署對台灣市售樣品抽樣分析的**通用品項代表值**，不是特定品牌的包裝標示。
不同品牌、口味與配方會有差異，包裝食品請優先參考實際營養標示。

每筆 JSON 的 `sources` 記錄整合編號、原始樣品名稱、原始分類與內容物描述。
[sources/tfda-snacks-2026.csv](sources/tfda-snacks-2026.csv) 保存本批用到的原始紀錄（每筆食物 13 個分析項，欄位與數字未變動）。
可執行 `node tools/validate-snack-expansion.mjs` 離線逐筆核對營養數值、缺值與可食比例。

## 整理原則

1. 每 100 公克可食部分。欄位對應：熱量＝「熱量」、蛋白質＝「粗蛋白」、脂肪＝「粗脂肪」、飽和脂肪＝「飽和脂肪」、
   碳水化合物＝「總碳水化合物」、糖＝「糖質總量」（總糖，非添加糖）、膳食纖維、鈉、鉀、鈣、鐵、維生素 C、膽固醇。
2. 保留原始數值；資料庫空白的欄位省略並列在 `dataNotes.missingNutrients`，不以零代填。原始值為零才填零。
3. 名稱沿用資料庫樣品名稱；與既有食物同名者加註「（台灣樣品）」。別名取自資料庫的俗名與英文名稱。
4. `edibleRatio` 依資料庫「廢棄率」換算（例如帶殼瓜子），畫圖估重時請連殼一起畫。
5. `serving`：資料庫有「每單位重」時採用該值並標示為「食藥署樣品 1 單位」，這是受測樣品的單位重，
   可能是一顆、一片或一包，不代表建議攝取量；沒有時為秤重 100 公克。
6. `shape` 與 `density` 是依食物型態（餅乾、糕點、糖果、膨化零食等）編輯估計的介面估重設定，非食藥署實測物性，圖形估重會有誤差。
7. 不從成分表推導疾病預防或醫療建議，`benefits`、`cautions` 保留空陣列。

## 細分類數量

| 細分類 | 新增筆數 |
| --- | ---: |
| 糖果巧克力 | 27 |
| 中式糕點 | 22 |
| 堅果瓜子零食 | 19 |
| 蛋糕西點 | 11 |
| 蜜餞果乾 | 11 |
| 甜湯豆花 | 10 |
| 布丁果凍 | 9 |
| 甜麵包 | 9 |
| 餅乾 | 8 |
| 肉乾肉鬆 | 7 |
| 鹹酥零食 | 6 |
| 冰品 | 3 |
| 沖泡甜品 | 3 |

## 完整清單

| 檔案 | 名稱 | 細分類 | 整合編號 | 資料庫分類 | 缺少欄位 |
| --- | --- | --- | --- | --- | --- |
| [items/tw-chocolate-ice-cream.json](items/tw-chocolate-ice-cream.json) | 巧克力冰淇淋 | 冰品 | Q2200101 | 糕餅點心類 | fiber |
| [items/tw-vanilla-ice-cream.json](items/tw-vanilla-ice-cream.json) | 香草冰淇淋 | 冰品 | Q2200201 | 糕餅點心類 | fiber |
| [items/tw-red-bean-milk-popsicle.json](items/tw-red-bean-milk-popsicle.json) | 紅豆牛奶冰棒 | 冰品 | Q2200301 | 糕餅點心類 | 無 |
| [items/tw-milk-pudding.json](items/tw-milk-pudding.json) | 鮮奶布丁 | 布丁果凍 | Q2102101 | 糕餅點心類 | fiber |
| [items/tw-egg-pudding.json](items/tw-egg-pudding.json) | 黃布丁 | 布丁果凍 | Q2102301 | 糕餅點心類 | fiber |
| [items/tw-baked-pudding.json](items/tw-baked-pudding.json) | 烤布丁 | 布丁果凍 | Q2102201 | 糕餅點心類 | fiber |
| [items/tw-fruit-jelly.json](items/tw-fruit-jelly.json) | 果凍 | 布丁果凍 | Q2100301 | 糕餅點心類 | protein, vitC, cholesterol |
| [items/tw-aiyu-jelly.json](items/tw-aiyu-jelly.json) | 原味愛玉凍 | 布丁果凍 | Q2100401 | 糕餅點心類 | protein, fat, satFat, sugar, cholesterol |
| [items/tw-lemon-aiyu-jelly.json](items/tw-lemon-aiyu-jelly.json) | 檸檬愛玉凍 | 布丁果凍 | Q2100501 | 糕餅點心類 | protein, fat, satFat, sugar, cholesterol |
| [items/tw-grass-jelly.json](items/tw-grass-jelly.json) | 仙草凍 | 布丁果凍 | Q2100101 | 糕餅點心類 | satFat, cholesterol |
| [items/tw-coffee-jelly.json](items/tw-coffee-jelly.json) | 咖啡凍 | 布丁果凍 | Q2100201 | 糕餅點心類 | cholesterol |
| [items/tw-fen-guo.json](items/tw-fen-guo.json) | 粉粿 | 布丁果凍 | Q2100601 | 糕餅點心類 | 無 |
| [items/tw-yokan.json](items/tw-yokan.json) | 羊羹 | 中式糕點 | Q2106101 | 糕餅點心類 | 無 |
| [items/tw-peanut-soup.json](items/tw-peanut-soup.json) | 花生仁湯 | 甜湯豆花 | Q2300101 | 糕餅點心類 | cholesterol |
| [items/tw-peanut-douhua.json](items/tw-peanut-douhua.json) | 豆花(花生) | 甜湯豆花 | Q2104101 | 糕餅點心類 | cholesterol |
| [items/tw-plain-douhua.json](items/tw-plain-douhua.json) | 傳統豆花(未加糖) | 甜湯豆花 | Q2104201 | 糕餅點心類 | cholesterol |
| [items/tw-grass-jelly-drink.json](items/tw-grass-jelly-drink.json) | 仙草蜜 | 甜湯豆花 | O0200201 | 飲料類 | satFat, sugar |
| [items/tw-sweetened-red-bean-can.json](items/tw-sweetened-red-bean-can.json) | 紅豆罐頭(糖漬) | 甜湯豆花 | R4900401 | 加工調理食品及其他類 | sugar, cholesterol |
| [items/tw-sweetened-flower-bean-can.json](items/tw-sweetened-flower-bean-can.json) | 花豆罐頭(糖漬) | 甜湯豆花 | R4900301 | 加工調理食品及其他類 | sugar, cholesterol |
| [items/tw-taro-balls.json](items/tw-taro-balls.json) | 芋圓 | 甜湯豆花 | R4100101 | 加工調理食品及其他類 | 無 |
| [items/tw-tapioca-balls.json](items/tw-tapioca-balls.json) | 粉圓 | 甜湯豆花 | R4100201 | 加工調理食品及其他類 | 無 |
| [items/tw-sesame-tangyuan.json](items/tw-sesame-tangyuan.json) | 冷凍芝麻湯圓 | 甜湯豆花 | R0900101 | 加工調理食品及其他類 | 無 |
| [items/tw-peanut-tangyuan.json](items/tw-peanut-tangyuan.json) | 冷凍花生湯圓 | 甜湯豆花 | R0900201 | 加工調理食品及其他類 | 無 |
| [items/tw-radish-pastry.json](items/tw-radish-pastry.json) | 蘿蔔酥 | 中式糕點 | Q0500601 | 糕餅點心類 | 無 |
| [items/tw-egg-yolk-pastry.json](items/tw-egg-yolk-pastry.json) | 蛋黃酥 | 中式糕點 | Q0500401 | 糕餅點心類 | 無 |
| [items/tw-egg-yolk-taro-pastry.json](items/tw-egg-yolk-taro-pastry.json) | 蛋黃芋頭酥 | 中式糕點 | Q0500301 | 糕餅點心類 | sugar |
| [items/tw-ox-tongue-pastry.json](items/tw-ox-tongue-pastry.json) | 牛舌餅 | 中式糕點 | Q0500201 | 糕餅點心類 | 無 |
| [items/tw-sun-cake.json](items/tw-sun-cake.json) | 太陽餅 | 中式糕點 | Q0500101 | 糕餅點心類 | 無 |
| [items/tw-pineapple-cake.json](items/tw-pineapple-cake.json) | 鳳梨酥 | 中式糕點 | Q0500501 | 糕餅點心類 | 無 |
| [items/tw-jujube-mooncake.json](items/tw-jujube-mooncake.json) | 月餅(棗泥) | 中式糕點 | Q0300201 | 糕餅點心類 | sugar |
| [items/tw-mung-bean-pastry.json](items/tw-mung-bean-pastry.json) | 綠豆凸 | 中式糕點 | Q0300301 | 糕餅點心類 | 無 |
| [items/tw-taro-pastry.json](items/tw-taro-pastry.json) | 芋仔餅 | 中式糕點 | Q0300101 | 糕餅點心類 | sugar |
| [items/tw-sweet-potato-pastry.json](items/tw-sweet-potato-pastry.json) | 蕃薯餅 | 中式糕點 | Q0300401 | 糕餅點心類 | sugar |
| [items/tw-phoenix-eye-cake.json](items/tw-phoenix-eye-cake.json) | 鳳眼糕 | 中式糕點 | Q0600701 | 糕餅點心類 | 無 |
| [items/tw-rice-lao.json](items/tw-rice-lao.json) | 米粩 | 中式糕點 | Q0600801 | 糕餅點心類 | 無 |
| [items/tw-sachima.json](items/tw-sachima.json) | 沙其馬 | 中式糕點 | Q4900101 | 糕餅點心類 | 無 |
| [items/tw-malay-sponge-cake.json](items/tw-malay-sponge-cake.json) | 冷凍馬拉糕 | 中式糕點 | Q0800101 | 糕餅點心類 | sugar, vitC |
| [items/tw-water-chestnut-cake.json](items/tw-water-chestnut-cake.json) | 冷凍馬蹄條 | 中式糕點 | Q0800301 | 糕餅點心類 | sugar, vitC, cholesterol |
| [items/tw-dorayaki.json](items/tw-dorayaki.json) | 銅鑼燒 | 中式糕點 | Q0800201 | 糕餅點心類 | 無 |
| [items/tw-sweet-nian-gao.json](items/tw-sweet-nian-gao.json) | 冷藏甜年糕 | 中式糕點 | Q0100201 | 糕餅點心類 | satFat, sugar, vitC, cholesterol |
| [items/tw-red-bean-mochi.json](items/tw-red-bean-mochi.json) | 包餡甜麻糬(紅豆) | 中式糕點 | Q0100501 | 糕餅點心類 | cholesterol |
| [items/tw-savory-mochi.json](items/tw-savory-mochi.json) | 鹹麻糬 | 中式糕點 | Q0200101 | 糕餅點心類 | sugar |
| [items/tw-red-bean-wheel-cake.json](items/tw-red-bean-wheel-cake.json) | 車輪餅(紅豆) | 中式糕點 | Q0400101 | 糕餅點心類 | 無 |
| [items/tw-radish-wheel-cake.json](items/tw-radish-wheel-cake.json) | 車輪餅(菜脯) | 中式糕點 | Q0400201 | 糕餅點心類 | 無 |
| [items/tw-cheesecake.json](items/tw-cheesecake.json) | 乳酪蛋糕 | 蛋糕西點 | Q0900101 | 糕餅點心類 | vitC |
| [items/tw-honey-cake.json](items/tw-honey-cake.json) | 蜂蜜蛋糕(原味) | 蛋糕西點 | Q0900401 | 糕餅點心類 | vitC |
| [items/tw-chocolate-honey-cake.json](items/tw-chocolate-honey-cake.json) | 蜂蜜蛋糕(巧克力) | 蛋糕西點 | Q0900501 | 糕餅點心類 | vitC |
| [items/tw-cheese-honey-cake.json](items/tw-cheese-honey-cake.json) | 蜂蜜蛋糕(起司) | 蛋糕西點 | Q0900601 | 糕餅點心類 | vitC |
| [items/tw-tiramisu.json](items/tw-tiramisu.json) | 提拉米蘇(圓形) | 蛋糕西點 | Q0900301 | 糕餅點心類 | 無 |
| [items/tw-sponge-cake.json](items/tw-sponge-cake.json) | 海綿蛋糕(圓形) | 蛋糕西點 | Q0900201 | 糕餅點心類 | 無 |
| [items/tw-black-forest-cake.json](items/tw-black-forest-cake.json) | 黑森林蛋糕 | 蛋糕西點 | Q0900701 | 糕餅點心類 | 無 |
| [items/tw-egg-tart.json](items/tw-egg-tart.json) | 蛋塔 | 蛋糕西點 | Q0700301 | 糕餅點心類 | 無 |
| [items/tw-portuguese-egg-tart.json](items/tw-portuguese-egg-tart.json) | 蛋塔(葡式) | 蛋糕西點 | Q0700401 | 糕餅點心類 | 無 |
| [items/tw-chocolate-puff.json](items/tw-chocolate-puff.json) | 泡芙(巧克力) | 蛋糕西點 | Q0700201 | 糕餅點心類 | vitC |
| [items/tw-croissant.json](items/tw-croissant.json) | 可頌 | 甜麵包 | Q0700101 | 糕餅點心類 | 無 |
| [items/tw-waffle.json](items/tw-waffle.json) | 鬆餅 | 蛋糕西點 | Q0700501 | 糕餅點心類 | 無 |
| [items/tw-pineapple-bun.json](items/tw-pineapple-bun.json) | 菠蘿麵包 | 甜麵包 | Q1000801 | 糕餅點心類 | vitC |
| [items/tw-butter-crumb-bun.json](items/tw-butter-crumb-bun.json) | 奶酥麵包 | 甜麵包 | Q1000401 | 糕餅點心類 | vitC |
| [items/tw-raisin-butter-crumb-bun.json](items/tw-raisin-butter-crumb-bun.json) | 葡萄乾奶酥麵包 | 甜麵包 | Q1000901 | 糕餅點心類 | 無 |
| [items/tw-pork-floss-bun.json](items/tw-pork-floss-bun.json) | 肉鬆麵包 | 甜麵包 | Q1000501 | 糕餅點心類 | 無 |
| [items/tw-red-bean-toast.json](items/tw-red-bean-toast.json) | 紅豆土司 | 甜麵包 | Q1000301 | 糕餅點心類 | 無 |
| [items/tw-twin-donut-bread.json](items/tw-twin-donut-bread.json) | 雙胞胎麵包 | 甜麵包 | Q1001201 | 糕餅點心類 | 無 |
| [items/tw-sugar-donut.json](items/tw-sugar-donut.json) | 糖粒甜甜圈(油炸) | 甜麵包 | Q1000701 | 糕餅點心類 | 無 |
| [items/tw-glazed-mochi-donut.json](items/tw-glazed-mochi-donut.json) | 蜜糖甜甜圈(波/摩堤) | 甜麵包 | Q1000601 | 糕餅點心類 | 無 |
| [items/tw-square-crisp.json](items/tw-square-crisp.json) | 方塊酥 | 餅乾 | Q4100101 | 糕餅點心類 | 無 |
| [items/tw-strawberry-sandwich-cookie.json](items/tw-strawberry-sandwich-cookie.json) | 夾心餅乾(草莓) | 餅乾 | Q4100201 | 糕餅點心類 | vitC |
| [items/tw-senbei-cookie.json](items/tw-senbei-cookie.json) | 煎餅 | 餅乾 | Q4100501 | 糕餅點心類 | 無 |
| [items/tw-ration-biscuit.json](items/tw-ration-biscuit.json) | 營養口糧 | 餅乾 | Q4100601 | 糕餅點心類 | 無 |
| [items/tw-vegetable-soda-cracker.json](items/tw-vegetable-soda-cracker.json) | 蘇打餅乾(蔬菜) | 餅乾 | Q4100701 | 糕餅點心類 | 無 |
| [items/tw-sesame-egg-roll.json](items/tw-sesame-egg-roll.json) | 蛋捲(芝麻) | 餅乾 | Q4100401 | 糕餅點心類 | 無 |
| [items/tw-wafer-roll.json](items/tw-wafer-roll.json) | 捲心酥 | 餅乾 | Q4100301 | 糕餅點心類 | 無 |
| [items/tw-snow-rice-cracker.json](items/tw-snow-rice-cracker.json) | 雪餅 | 餅乾 | Q4300101 | 糕餅點心類 | 無 |
| [items/tw-fish-crisp.json](items/tw-fish-crisp.json) | 魚酥 | 鹹酥零食 | Q4200301 | 糕餅點心類 | 無 |
| [items/tw-potato-chips.json](items/tw-potato-chips.json) | 洋芋片（台灣樣品） | 鹹酥零食 | Q4200201 | 糕餅點心類 | 無 |
| [items/tw-corn-snack.json](items/tw-corn-snack.json) | 玉米餅乾(原味) | 鹹酥零食 | Q4200101 | 糕餅點心類 | 無 |
| [items/tw-snack-noodles.json](items/tw-snack-noodles.json) | 零食泡麵 | 鹹酥零食 | Q4200401 | 糕餅點心類 | 無 |
| [items/tw-spiced-dried-tofu-cubes.json](items/tw-spiced-dried-tofu-cubes.json) | 豆干丁(五香) | 鹹酥零食 | Q9100101 | 糕餅點心類 | cholesterol |
| [items/tw-satay-dried-tofu-slices.json](items/tw-satay-dried-tofu-slices.json) | 豆干片(沙茶) | 鹹酥零食 | Q9100202 | 糕餅點心類 | 無 |
| [items/tw-milk-chocolate.json](items/tw-milk-chocolate.json) | 牛奶巧克力 | 糖果巧克力 | Q6100101 | 糕餅點心類 | fiber, vitC |
| [items/tw-white-chocolate-candy.json](items/tw-white-chocolate-candy.json) | 白巧克力風味糖 | 糖果巧克力 | Q6100501 | 糕餅點心類 | fiber, vitC |
| [items/tw-dark-chocolate-85.json](items/tw-dark-chocolate-85.json) | 黑巧克力(85%) | 糖果巧克力 | Q6100601 | 糕餅點心類 | cholesterol |
| [items/tw-candy-coated-milk-chocolate.json](items/tw-candy-coated-milk-chocolate.json) | 糖衣牛奶巧克力 | 糖果巧克力 | Q6100401 | 糕餅點心類 | vitC |
| [items/tw-peanut-milk-chocolate.json](items/tw-peanut-milk-chocolate.json) | 花生牛奶巧克力 | 糖果巧克力 | Q6100201 | 糕餅點心類 | vitC, cholesterol |
| [items/tw-hazelnut-milk-chocolate.json](items/tw-hazelnut-milk-chocolate.json) | 榛果牛奶巧克力 | 糖果巧克力 | Q6100301 | 糕餅點心類 | vitC |
| [items/tw-goat-milk-tablet.json](items/tw-goat-milk-tablet.json) | 羊乳片 | 糖果巧克力 | Q6900201 | 糕餅點心類 | fiber |
| [items/tw-mung-bean-ball.json](items/tw-mung-bean-ball.json) | 綠豆球 | 糖果巧克力 | Q6900401 | 糕餅點心類 | satFat, sugar, vitC, cholesterol |
| [items/tw-red-bean-ball.json](items/tw-red-bean-ball.json) | 紅豆球 | 糖果巧克力 | Q6900301 | 糕餅點心類 | satFat, sugar, vitC, cholesterol |
| [items/tw-lactic-candy-ball.json](items/tw-lactic-candy-ball.json) | 乳酸球 | 糖果巧克力 | Q6900101 | 糕餅點心類 | sugar, vitC |
| [items/tw-marshmallow.json](items/tw-marshmallow.json) | 棉花糖 | 糖果巧克力 | Q6900501 | 糕餅點心類 | vitC, cholesterol |
| [items/tw-toffee.json](items/tw-toffee.json) | 太妃糖 | 糖果巧克力 | Q6400101 | 糕餅點心類 | sugar, fiber, vitC |
| [items/tw-kucha-herbal-candy.json](items/tw-kucha-herbal-candy.json) | 苦茶糖 | 糖果巧克力 | Q6400401 | 糕餅點心類 | sugar, vitC, cholesterol |
| [items/tw-ginger-candy.json](items/tw-ginger-candy.json) | 薑糖 | 糖果巧克力 | Q6400501 | 糕餅點心類 | sugar, vitC, cholesterol |
| [items/tw-loquat-candy.json](items/tw-loquat-candy.json) | 枇杷糖 | 糖果巧克力 | Q6400301 | 糕餅點心類 | satFat, sugar, vitC, cholesterol |
| [items/tw-lotus-root-candy.json](items/tw-lotus-root-candy.json) | 蓮藕糖 | 糖果巧克力 | Q6400201 | 糕餅點心類 | sugar, vitC, cholesterol |
| [items/tw-chocolate-filled-candy.json](items/tw-chocolate-filled-candy.json) | 巧克力夾心糖 | 糖果巧克力 | Q6400601 | 糕餅點心類 | sugar, fiber |
| [items/tw-milk-chew.json](items/tw-milk-chew.json) | 牛奶軟糖 | 糖果巧克力 | Q6310101 | 糕餅點心類 | fiber, vitC |
| [items/tw-chocolate-milk-chew.json](items/tw-chocolate-milk-chew.json) | 巧克力牛奶軟糖 | 糖果巧克力 | Q6310201 | 糕餅點心類 | sugar, fiber, vitC |
| [items/tw-fruit-gummy.json](items/tw-fruit-gummy.json) | 水果軟糖 | 糖果巧克力 | Q6300101 | 糕餅點心類 | fiber, vitC, cholesterol |
| [items/tw-qq-fruit-gummy.json](items/tw-qq-fruit-gummy.json) | 水果QQ軟糖 | 糖果巧克力 | Q6300201 | 糕餅點心類 | vitC, cholesterol |
| [items/tw-white-sesame-brittle.json](items/tw-white-sesame-brittle.json) | 白芝麻糖 | 糖果巧克力 | Q6200101 | 糕餅點心類 | sugar, vitC, cholesterol |
| [items/tw-black-sesame-brittle.json](items/tw-black-sesame-brittle.json) | 黑芝麻糖 | 糖果巧克力 | Q6200201 | 糕餅點心類 | vitC, cholesterol |
| [items/tw-peanut-brittle.json](items/tw-peanut-brittle.json) | 花生糖 | 糖果巧克力 | Q6200301 | 糕餅點心類 | vitC, cholesterol |
| [items/tw-peanut-gongtang.json](items/tw-peanut-gongtang.json) | 花生貢糖 | 糖果巧克力 | Q6200401 | 糕餅點心類 | vitC, cholesterol |
| [items/tw-nougat.json](items/tw-nougat.json) | 牛軋糖 | 糖果巧克力 | Q6200501 | 糕餅點心類 | vitC |
| [items/tw-walnut-date-cake.json](items/tw-walnut-date-cake.json) | 核棗糕 | 糖果巧克力 | Q6200601 | 糕餅點心類 | sugar, vitC, cholesterol |
| [items/tw-green-mango-pickle.json](items/tw-green-mango-pickle.json) | 芒果青 | 蜜餞果乾 | Q8100201 | 糕餅點心類 | cholesterol |
| [items/tw-dried-pineapple.json](items/tw-dried-pineapple.json) | 鳳梨果乾 | 蜜餞果乾 | Q8100501 | 糕餅點心類 | 無 |
| [items/tw-dried-lemon.json](items/tw-dried-lemon.json) | 檸檬果乾 | 蜜餞果乾 | Q8100601 | 糕餅點心類 | 無 |
| [items/tw-dried-guava.json](items/tw-dried-guava.json) | 芭樂果乾 | 蜜餞果乾 | Q8100401 | 糕餅點心類 | 無 |
| [items/tw-candied-sweet-potato.json](items/tw-candied-sweet-potato.json) | 甘薯蜜餞 | 蜜餞果乾 | Q8100101 | 糕餅點心類 | satFat, sugar, cholesterol |
| [items/tw-dried-mango.json](items/tw-dried-mango.json) | 芒果乾 | 蜜餞果乾 | D2110101 | 水果類 | cholesterol |
| [items/tw-dried-longan.json](items/tw-dried-longan.json) | 龍眼乾 | 蜜餞果乾 | D2310101 | 水果類 | cholesterol |
| [items/tw-dried-fig.json](items/tw-dried-fig.json) | 無花果乾 | 蜜餞果乾 | D4410101 | 水果類 | sugar, cholesterol |
| [items/tw-dried-persimmon.json](items/tw-dried-persimmon.json) | 柿餅 | 蜜餞果乾 | D2700501 | 水果類 | 無 |
| [items/tw-amanatto.json](items/tw-amanatto.json) | 甘納豆 | 蜜餞果乾 | R4900501 | 加工調理食品及其他類 | cholesterol |
| [items/tw-candied-lotus-seeds.json](items/tw-candied-lotus-seeds.json) | 糖漬蓮子 | 蜜餞果乾 | R7101901 | 加工調理食品及其他類 | sugar, cholesterol |
| [items/tw-licorice-sunflower-seeds.json](items/tw-licorice-sunflower-seeds.json) | 甘草葵瓜子(帶殼) | 堅果瓜子零食 | R7101701 | 加工調理食品及其他類 | sugar, cholesterol |
| [items/tw-salted-sunflower-seeds.json](items/tw-salted-sunflower-seeds.json) | 鹽酥葵瓜子(帶殼) | 堅果瓜子零食 | R7101801 | 加工調理食品及其他類 | cholesterol |
| [items/tw-cinnamon-watermelon-seeds.json](items/tw-cinnamon-watermelon-seeds.json) | 玉桂西瓜子 | 堅果瓜子零食 | R7100801 | 加工調理食品及其他類 | sugar, cholesterol |
| [items/tw-soy-sauce-watermelon-seeds.json](items/tw-soy-sauce-watermelon-seeds.json) | 醬油西瓜子 | 堅果瓜子零食 | R7100901 | 加工調理食品及其他類 | cholesterol |
| [items/tw-seasoned-pumpkin-seeds-in-shell.json](items/tw-seasoned-pumpkin-seeds-in-shell.json) | 調味南瓜子(帶殼) | 堅果瓜子零食 | R7101602 | 加工調理食品及其他類 | cholesterol |
| [items/tw-seasoned-pumpkin-seeds.json](items/tw-seasoned-pumpkin-seeds.json) | 調味南瓜子(去殼) | 堅果瓜子零食 | R7101601 | 加工調理食品及其他類 | cholesterol |
| [items/tw-fried-peanuts.json](items/tw-fried-peanuts.json) | 油炸花生仁 | 堅果瓜子零食 | R7101301 | 加工調理食品及其他類 | cholesterol |
| [items/tw-egg-crisp-peanuts.json](items/tw-egg-crisp-peanuts.json) | 蛋酥花生仁 | 堅果瓜子零食 | R7101401 | 加工調理食品及其他類 | sugar |
| [items/tw-salted-peanuts.json](items/tw-salted-peanuts.json) | 鹽酥花生仁 | 堅果瓜子零食 | R7101501 | 加工調理食品及其他類 | cholesterol |
| [items/tw-salted-peanuts-in-shell.json](items/tw-salted-peanuts-in-shell.json) | 鹽酥帶殼花生(熟) | 堅果瓜子零食 | R7101001 | 加工調理食品及其他類 | cholesterol |
| [items/tw-candied-peanuts.json](items/tw-candied-peanuts.json) | 糖漬花生仁 | 堅果瓜子零食 | R7101201 | 加工調理食品及其他類 | sugar, cholesterol |
| [items/tw-honey-pine-nuts.json](items/tw-honey-pine-nuts.json) | 蜜汁松子仁 | 堅果瓜子零食 | R7100301 | 加工調理食品及其他類 | sugar, cholesterol |
| [items/tw-honey-cashews.json](items/tw-honey-cashews.json) | 蜜汁腰果 | 堅果瓜子零食 | R7100701 | 加工調理食品及其他類 | sugar |
| [items/tw-salted-macadamia.json](items/tw-salted-macadamia.json) | 鹽酥夏威夷豆 | 堅果瓜子零食 | R7100401 | 加工調理食品及其他類 | 無 |
| [items/tw-candied-walnuts.json](items/tw-candied-walnuts.json) | 甜核桃 | 堅果瓜子零食 | R7100501 | 加工調理食品及其他類 | cholesterol |
| [items/tw-sugar-roasted-chestnuts.json](items/tw-sugar-roasted-chestnuts.json) | 糖炒栗子 | 堅果瓜子零食 | R7100601 | 加工調理食品及其他類 | sugar, cholesterol |
| [items/tw-garlic-almonds.json](items/tw-garlic-almonds.json) | 蒜味甘扁桃仁 | 堅果瓜子零食 | R7100101 | 加工調理食品及其他類 | cholesterol |
| [items/tw-salted-fava-beans.json](items/tw-salted-fava-beans.json) | 鹽酥蠶豆 | 堅果瓜子零食 | R4900701 | 加工調理食品及其他類 | sugar, cholesterol |
| [items/tw-roasted-black-beans.json](items/tw-roasted-black-beans.json) | 烘烤黑豆 | 堅果瓜子零食 | H0610201 | 豆類 | satFat, sugar, cholesterol |
| [items/tw-pork-fu.json](items/tw-pork-fu.json) | 豬肉脯 | 肉乾肉鬆 | R5600101 | 加工調理食品及其他類 | sugar, fiber, vitC |
| [items/tw-pork-floss.json](items/tw-pork-floss.json) | 豬肉酥 | 肉乾肉鬆 | R5600201 | 加工調理食品及其他類 | fiber, vitC |
| [items/tw-beef-jerky-slices.json](items/tw-beef-jerky-slices.json) | 片狀肉乾(牛肉) | 肉乾肉鬆 | R5200101 | 加工調理食品及其他類 | fiber |
| [items/tw-spicy-beef-jerky-slices.json](items/tw-spicy-beef-jerky-slices.json) | 片狀肉乾(牛肉,辣味) | 肉乾肉鬆 | R5200102 | 加工調理食品及其他類 | fiber |
| [items/tw-pork-jerky-slices.json](items/tw-pork-jerky-slices.json) | 片狀肉乾(豬肉) | 肉乾肉鬆 | R5200201 | 加工調理食品及其他類 | fiber |
| [items/tw-pork-jerky-strips.json](items/tw-pork-jerky-strips.json) | 條狀肉乾(豬肉) | 肉乾肉鬆 | R5200301 | 加工調理食品及其他類 | fiber |
| [items/tw-fish-snack-slices.json](items/tw-fish-snack-slices.json) | 香魚片 | 肉乾肉鬆 | R7501001 | 加工調理食品及其他類 | fiber |
| [items/tw-miancha-powder.json](items/tw-miancha-powder.json) | 麵茶粉 | 沖泡甜品 | R8100601 | 加工調理食品及其他類 | 無 |
| [items/tw-sesame-paste-mix.json](items/tw-sesame-paste-mix.json) | 芝麻糊沖泡包 | 沖泡甜品 | R8100901 | 加工調理食品及其他類 | sugar, cholesterol |
| [items/tw-almond-tea-mix.json](items/tw-almond-tea-mix.json) | 杏仁茶沖泡包 | 沖泡甜品 | R8100801 | 加工調理食品及其他類 | sugar, cholesterol |
