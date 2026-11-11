# 新增水果資料來源與整理方式

本次新增 35 筆水果資料，名稱、介紹、標籤及食用提示使用繁體中文，保留英文別名供搜尋。
既有食物檔案維持原樣。營養數值直接由官方檔案擷取，沒有以相近水果代填。

## 官方來源

- [USDA SR28 官方資料與版本說明](https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/methods-and-application-of-food-composition-laboratory/mafcl-site-pages/sr11-sr28/)
- [SR28 簡表原始資料 ZIP](https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/SR/sr28/dnload/sr28abbr.zip)
- [SR28 文件](https://www.ars.usda.gov/ARSUserFiles/80400535/Data/SR/SR28/sr28_doc.pdf)，Table 16 為欄位定義。

版本：USDA National Nutrient Database for Standard Reference, Release 28，2016 年 5 月修訂版。
查閱日期：2026-11-11。這是歷史版本，並非宣稱為最新 FoodData Central 資料。

## 數值與介面規則

- 每 100 公克「生鮮可食部分」；熱量為大卡，蛋白質、脂肪、飽和脂肪、碳水化合物、總糖、膳食纖維為克，其他既有營養素為毫克。
- `per100g` 沿用原始精度。原始空白欄位省略，並列在 `dataNotes.missingNutrients`；缺資料不當作零。原始數值為零才保留零。
- 總糖不是添加糖。不同產地、品種與成熟度可能有差異；果汁、果乾、罐頭與糖漬產品不能直接套用。
- 每個檔案的 `sources` 保存官方連結、NDB 編號與英文原名。下表可用 NDB 編號在 ZIP 中的 `ABBREV.txt` 精確對照。
- 常見份量統一為「可食部分 100 公克」，避免虛構單顆重量。`density=1` 是介面暫定估值，**不是 USDA 提供的實測密度**；`edibleRatio=1` 表示只畫可食部分。整顆含皮、核或成堆莓果的圖形可能有明顯誤差，建議使用秤重或 100 公克按鈕。
- `benefits`、`cautions` 保留空陣列：本次來源為營養成分資料，未據此推導疾病預防效果或個別醫療建議。食用提示為編輯整理，非 USDA 原文翻譯。

原始 ZIP SHA-256：`39df5c0516a7d343ffb043bb5542ab8c29f2c9998c93608e7fd3feca82ce1cef`

## 新增清單

| 檔案代號 | 中文名稱 | NDB 編號 | USDA 原始食物名稱 | 缺少的營養欄位 |
| --- | --- | --- | --- | --- |
| strawberry | 草莓 | 09316 | STRAWBERRIES,RAW | 無 |
| blueberry | 藍莓 | 09050 | BLUEBERRIES,RAW | 無 |
| blackberry | 黑莓 | 09042 | BLACKBERRIES,RAW | 無 |
| raspberry | 覆盆子 | 09302 | RASPBERRIES,RAW | 無 |
| cranberry | 蔓越莓 | 09078 | CRANBERRIES,RAW | 無 |
| blackcurrant | 黑醋栗 | 09083 | CURRANTS,EUROPEAN BLACK,RAW | sugar, fiber |
| red-white-currant | 紅白醋栗 | 09084 | CURRANTS,RED&WHITE,RAW | 無 |
| gooseberry | 醋栗 | 09107 | GOOSEBERRIES,RAW | sugar |
| mulberry | 桑葚 | 09190 | MULBERRIES,RAW | 無 |
| sweet-cherry | 甜櫻桃 | 09070 | CHERRIES,SWEET,RAW | 無 |
| sour-cherry | 酸櫻桃 | 09063 | CHERRIES,SOUR,RED,RAW | 無 |
| apricot | 杏桃 | 09021 | APRICOTS,RAW | 無 |
| peach | 黃肉桃 | 09236 | PEACHES,YEL,RAW | 無 |
| nectarine | 油桃 | 09191 | NECTARINES,RAW | 無 |
| plum | 李子 | 09279 | PLUMS,RAW | 無 |
| pear | 西洋梨 | 09252 | PEARS,RAW | 無 |
| asian-pear | 亞洲梨 | 09340 | PEARS,ASIAN,RAW | 無 |
| pineapple | 鳳梨 | 09266 | PINEAPPLE,RAW,ALL VAR | 無 |
| papaya | 木瓜 | 09226 | PAPAYAS,RAW | 無 |
| lemon | 檸檬 | 09150 | LEMONS,RAW,WITHOUT PEEL | 無 |
| lime | 萊姆 | 09159 | LIMES,RAW | 無 |
| grapefruit | 葡萄柚 | 09111 | GRAPEFRUIT,RAW,PINK&RED&WHITE,ALL AREAS | 無 |
| pomelo | 柚子 | 09295 | PUMMELO,RAW | satFat, sugar |
| mandarin | 橘子 | 09218 | TANGERINES,(MANDARIN ORANGES),RAW | 無 |
| kumquat | 金桔 | 09149 | KUMQUATS,RAW | 無 |
| lychee | 荔枝 | 09164 | LITCHIS,RAW | 無 |
| longan | 龍眼 | 09172 | LONGANS,RAW | satFat, sugar |
| loquat | 枇杷 | 09174 | LOQUATS,RAW | sugar |
| jackfruit | 波羅蜜 | 09144 | JACKFRUIT,RAW | 無 |
| passion-fruit | 紫色百香果 | 09231 | PASSION-FRUIT,(GRANADILLA),PURPLE,RAW | 無 |
| persimmon | 柿子 | 09263 | PERSIMMONS,JAPANESE,RAW | 無 |
| fig | 無花果 | 09089 | FIGS,RAW | 無 |
| pomegranate | 石榴 | 09286 | POMEGRANATES,RAW | 無 |
| soursop | 刺果番荔枝 | 09315 | SOURSOP,RAW | 無 |
| sugar-apple | 釋迦 | 09321 | SUGAR-APPLES,(SWEETSOP),RAW | sugar |
