# 300 種新增食物：來源與整理說明

本批新增 300 筆不同食物項目，原有 73 筆食物維持原樣，更新後共 373 筆。
所有顯示名稱、介紹、營養亮點與使用提示均使用繁體中文；保留英文搜尋別名及來源原文。

## 資料來源

- [USDA 官方 SR28 資料頁](https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/methods-and-application-of-food-composition-laboratory/mafcl-site-pages/sr11-sr28/)
- [官方簡表 ZIP](https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/SR/sr28/dnload/sr28abbr.zip)
- [官方文件](https://www.ars.usda.gov/ARSUserFiles/80400535/Data/SR/SR28/sr28_doc.pdf)，Table 16 說明 ABBREV.txt 欄位。

資料版本為 USDA National Nutrient Database for Standard Reference, Release 28，2016 年 5 月修訂版。
查閱日期為 2026-11-11；這是歷史參考資料，並非最新 FoodData Central 或台灣特定品牌檢驗值。

原始 ZIP SHA-256：`39df5c0516a7d343ffb043bb5542ab8c29f2c9998c93608e7fd3feca82ce1cef`

每筆 JSON 的 `sources` 包含來源連結、NDB 編號及原文名稱。
[sources/sr28-expansion-abbrev.txt](sources/sr28-expansion-abbrev.txt) 保存本批對應的 300 行原始紀錄，僅將原檔 ISO-8859-1 解碼後以 UTF-8 儲存，欄位與數字未變動。
可執行 `node tools/validate-food-expansion.mjs` 離線逐筆核對 13 種營養欄位及缺值。

## 整理原則

1. 每 100 公克可食部分。熱量為大卡；蛋白質、脂肪、飽和脂肪、碳水化合物、總糖、膳食纖維為克；鈉、鉀、鈣、鐵、維生素 C、膽固醇為毫克。
2. 保留原始精度；空白欄位省略並記錄於 `dataNotes.missingNutrients`，不能解讀為零。只有原始值為零才填零。
3. 中文名稱區分生重、熟重、乾燥、含皮、含骨、加鹽、強化營養、罐頭瀝乾等相關狀態。數值僅適用於對應紀錄，不把生食材數值當作熟食，也不虛構地方料理配方。
4. 類別沿用既有 `category`；新類別只用於飲品、油脂、醬料與香料調味。`subcategory` 記錄本批 14 個細分類，App 可忽略此附加欄位。
5. 常用計算份量為秤取可食部分 100 公克；香料和油脂採 5 公克，醬料採 10 公克。這些是定量計算按鈕，不宣稱是每顆重量、每湯匙重量或建議攝取量。
6. `shape`、`density=1` 為介面估重暫定設定，非 USDA 實測物性。`edibleRatio=1` 只適用於已去除不可食部分的圖形；成堆食物、液體與不規則形狀的圖形估重有誤差，請優先秤重。
7. 不從成分表推導疾病預防或個別醫療建議，`benefits`、`cautions` 保留空陣列。提示是編輯整理，非 USDA 原文翻譯。生重紀錄不表示可以生食。
8. 不同產地、成熟度、品牌、製程與配方會影響數值；包裝食品宜優先使用實際標示。

## 細分類數量

| 細分類 | 新增筆數 |
| --- | ---: |
| 蔬菜 | 60 |
| 乳品與蛋 | 25 |
| 穀物與主食 | 25 |
| 堅果與種子 | 20 |
| 豆類與豆製品 | 20 |
| 魚類與海鮮 | 30 |
| 肉類與加工肉品 | 25 |
| 麵包與烘焙 | 25 |
| 水果與果乾 | 15 |
| 香料與調味 | 15 |
| 油脂 | 10 |
| 醬料 | 10 |
| 零食與甜味料 | 10 |
| 飲品 | 10 |

## 完整清單

| 檔案 | 中文名稱 | 細分類 | NDB 編號 | USDA 原名 | 缺少欄位 |
| --- | --- | --- | --- | --- | --- |
| [items/amaranth-leaves.json](items/amaranth-leaves.json) | 莧菜葉（生重） | 蔬菜 | 11003 | AMARANTH LEAVES,RAW | sugar, fiber |
| [items/artichoke.json](items/artichoke.json) | 朝鮮薊（生重） | 蔬菜 | 11007 | ARTICHOKES,(GLOBE OR FRENCH),RAW | 無 |
| [items/asparagus.json](items/asparagus.json) | 蘆筍（生重） | 蔬菜 | 11011 | ASPARAGUS,RAW | 無 |
| [items/bitter-gourd.json](items/bitter-gourd.json) | 苦瓜（生重） | 蔬菜 | 11024 | BALSAM-PEAR (BITTER GOURD),PODS,RAW | satFat, sugar |
| [items/bamboo-shoots.json](items/bamboo-shoots.json) | 竹筍（生重） | 蔬菜 | 11026 | BAMBOO SHOOTS,RAW | 無 |
| [items/mung-sprouts.json](items/mung-sprouts.json) | 綠豆芽（生重） | 蔬菜 | 11043 | MUNG BNS,MATURE SEEDS,SPROUTED,RAW | 無 |
| [items/green-beans.json](items/green-beans.json) | 四季豆（生重） | 蔬菜 | 11052 | BEANS,SNAP,GREEN,RAW | 無 |
| [items/beetroot.json](items/beetroot.json) | 甜菜根（生重） | 蔬菜 | 11080 | BEETS,RAW | 無 |
| [items/beet-greens.json](items/beet-greens.json) | 甜菜葉（生重） | 蔬菜 | 11086 | BEET GREENS,RAW | 無 |
| [items/broccoli-raab.json](items/broccoli-raab.json) | 義大利芥藍（生重） | 蔬菜 | 11096 | BROCCOLI RAAB,RAW | 無 |
| [items/brussels-sprouts.json](items/brussels-sprouts.json) | 抱子甘藍（生重） | 蔬菜 | 11098 | BRUSSELS SPROUTS,RAW | 無 |
| [items/burdock.json](items/burdock.json) | 牛蒡（生重） | 蔬菜 | 11104 | BURDOCK ROOT,RAW | 無 |
| [items/red-cabbage.json](items/red-cabbage.json) | 紫高麗菜（生重） | 蔬菜 | 11112 | CABBAGE,RED,RAW | 無 |
| [items/savoy-cabbage.json](items/savoy-cabbage.json) | 皺葉甘藍（生重） | 蔬菜 | 11114 | CABBAGE,SAVOY,RAW | 無 |
| [items/pak-choi.json](items/pak-choi.json) | 青江菜（生重） | 蔬菜 | 11116 | CABBAGE,CHINESE (PAK-CHOI),RAW | 無 |
| [items/napa-cabbage.json](items/napa-cabbage.json) | 大白菜（生重） | 蔬菜 | 11119 | CABBAGE,CHINESE (PE-TSAI),RAW | 無 |
| [items/cauliflower.json](items/cauliflower.json) | 白花椰菜（生重） | 蔬菜 | 11135 | CAULIFLOWER,RAW | 無 |
| [items/winter-melon.json](items/winter-melon.json) | 冬瓜（生重） | 蔬菜 | 11593 | WAXGOURD,(CHINESE PRESERVING MELON),RAW | sugar |
| [items/celery.json](items/celery.json) | 芹菜（生重） | 蔬菜 | 11143 | CELERY,RAW | 無 |
| [items/celtuce.json](items/celtuce.json) | 萵筍（生重） | 蔬菜 | 11145 | CELTUCE,RAW | satFat, sugar |
| [items/swiss-chard.json](items/swiss-chard.json) | 瑞士甜菜（生重） | 蔬菜 | 11147 | CHARD,SWISS,RAW | 無 |
| [items/chayote.json](items/chayote.json) | 佛手瓜（生重） | 蔬菜 | 11149 | CHAYOTE,FRUIT,RAW | 無 |
| [items/water-chestnut.json](items/water-chestnut.json) | 荸薺（生重） | 蔬菜 | 11588 | WATERCHESTNUTS,CHINESE,(MATAI),RAW | 無 |
| [items/chives.json](items/chives.json) | 細香蔥（生重） | 蔬菜 | 11156 | CHIVES,RAW | 無 |
| [items/garland-chrysanthemum.json](items/garland-chrysanthemum.json) | 茼蒿（生重） | 蔬菜 | 11157 | CHRYSANTHEMUM,GARLAND,RAW | satFat, sugar |
| [items/sweet-potato-leaves.json](items/sweet-potato-leaves.json) | 地瓜葉（生重） | 蔬菜 | 11505 | SWEET POTATO LEAVES,RAW | sugar |
| [items/cilantro.json](items/cilantro.json) | 香菜（生重） | 蔬菜 | 11165 | CORIANDER (CILANTRO) LEAVES,RAW | 無 |
| [items/yardlong-bean.json](items/yardlong-bean.json) | 長豇豆（生重） | 蔬菜 | 11199 | YARDLONG BEAN,RAW | sugar, fiber |
| [items/cucumber.json](items/cucumber.json) | 小黃瓜（帶皮生重） | 蔬菜 | 11205 | CUCUMBER,WITH PEEL,RAW | 無 |
| [items/chinese-broccoli.json](items/chinese-broccoli.json) | 芥藍（生重） | 蔬菜 | 11994 | BROCCOLI,CHINESE,RAW | 無 |
| [items/eggplant.json](items/eggplant.json) | 茄子（生重） | 蔬菜 | 11209 | EGGPLANT,RAW | 無 |
| [items/endive.json](items/endive.json) | 苦苣（生重） | 蔬菜 | 11213 | ENDIVE,RAW | 無 |
| [items/garlic.json](items/garlic.json) | 大蒜（生重） | 蔬菜 | 11215 | GARLIC,RAW | 無 |
| [items/ginger.json](items/ginger.json) | 薑（生重） | 蔬菜 | 11216 | GINGER ROOT,RAW | 無 |
| [items/calabash.json](items/calabash.json) | 瓠瓜（生重） | 蔬菜 | 11218 | GOURD,WHITE-FLOWERED (CALABASH),RAW | sugar |
| [items/loofah.json](items/loofah.json) | 絲瓜（生重） | 蔬菜 | 11220 | GOURD,DISHCLOTH (TOWELGOURD),RAW | 無 |
| [items/jerusalem-artichoke.json](items/jerusalem-artichoke.json) | 菊芋（生重） | 蔬菜 | 11226 | JERUSALEM-ARTICHOKES,RAW | 無 |
| [items/wood-ear.json](items/wood-ear.json) | 黑木耳（鮮品生重） | 蔬菜 | 11228 | JEW'S EAR,(PEPEAO),RAW | satFat, sugar, fiber |
| [items/kale.json](items/kale.json) | 羽衣甘藍（生重） | 蔬菜 | 11233 | KALE,RAW | 無 |
| [items/shiitake.json](items/shiitake.json) | 香菇（鮮品生重） | 蔬菜 | 11238 | MUSHROOMS,SHIITAKE,RAW | satFat, vitC, cholesterol |
| [items/kohlrabi.json](items/kohlrabi.json) | 球莖甘藍（生重） | 蔬菜 | 11241 | KOHLRABI,RAW | 無 |
| [items/leek.json](items/leek.json) | 西洋韭蔥（生重） | 蔬菜 | 11246 | LEEKS,(BULB&LOWER LEAF-PORTION),RAW | 無 |
| [items/romaine.json](items/romaine.json) | 蘿蔓萵苣（生重） | 蔬菜 | 11251 | LETTUCE,COS OR ROMAINE,RAW | 無 |
| [items/iceberg-lettuce.json](items/iceberg-lettuce.json) | 結球萵苣（生重） | 蔬菜 | 11252 | LETTUCE,ICEBERG (INCL CRISPHEAD TYPES),RAW | 無 |
| [items/lotus-root.json](items/lotus-root.json) | 蓮藕（生重） | 蔬菜 | 11254 | LOTUS ROOT,RAW | sugar |
| [items/white-mushroom.json](items/white-mushroom.json) | 白蘑菇（生重） | 蔬菜 | 11260 | MUSHROOMS,WHITE,RAW | 無 |
| [items/portobello.json](items/portobello.json) | 波特菇（生重） | 蔬菜 | 11265 | MUSHROOMS,PORTABELLA,RAW | 無 |
| [items/mustard-greens.json](items/mustard-greens.json) | 芥菜（生重） | 蔬菜 | 11270 | MUSTARD GREENS,RAW | 無 |
| [items/okra.json](items/okra.json) | 秋葵（生重） | 蔬菜 | 11278 | OKRA,RAW | 無 |
| [items/onion.json](items/onion.json) | 洋蔥（生重） | 蔬菜 | 11282 | ONIONS,RAW | 無 |
| [items/scallion.json](items/scallion.json) | 青蔥（生重） | 蔬菜 | 11291 | ONIONS,SPRING OR SCALLIONS (INCL TOPS&BULB),RAW | 無 |
| [items/enoki.json](items/enoki.json) | 金針菇（生重） | 蔬菜 | 11950 | MUSHROOMS,ENOKI,RAW | 無 |
| [items/snow-peas.json](items/snow-peas.json) | 荷蘭豆（生重） | 蔬菜 | 11300 | PEAS,EDIBLE-PODDED,RAW | 無 |
| [items/green-peas.json](items/green-peas.json) | 青豌豆（生重） | 蔬菜 | 11304 | PEAS,GREEN,RAW | 無 |
| [items/green-pepper.json](items/green-pepper.json) | 青椒（生重） | 蔬菜 | 11333 | PEPPERS,SWT,GRN,RAW | 無 |
| [items/pumpkin.json](items/pumpkin.json) | 南瓜（生重） | 蔬菜 | 11422 | PUMPKIN,RAW | 無 |
| [items/radish.json](items/radish.json) | 櫻桃蘿蔔（生重） | 蔬菜 | 11429 | RADISHES,RAW | 無 |
| [items/daikon.json](items/daikon.json) | 白蘿蔔（生重） | 蔬菜 | 11430 | RADISHES,ORIENTAL,RAW | 無 |
| [items/zucchini.json](items/zucchini.json) | 櫛瓜（帶皮生重） | 蔬菜 | 11477 | SQUASH,SMMR,ZUCCHINI,INCL SKN,RAW | 無 |
| [items/taro.json](items/taro.json) | 芋頭（生重） | 蔬菜 | 11518 | TARO,RAW | 無 |
| [items/blue-cheese.json](items/blue-cheese.json) | 藍紋起司 | 乳品與蛋 | 01004 | CHEESE,BLUE | 無 |
| [items/brie.json](items/brie.json) | 布里起司 | 乳品與蛋 | 01006 | CHEESE,BRIE | 無 |
| [items/camembert.json](items/camembert.json) | 卡門貝爾起司 | 乳品與蛋 | 01007 | CHEESE,CAMEMBERT | 無 |
| [items/cottage-cheese.json](items/cottage-cheese.json) | 茅屋起司（含乳脂） | 乳品與蛋 | 01012 | CHEESE,COTTAGE,CRMD,LRG OR SML CURD | 無 |
| [items/cream-cheese.json](items/cream-cheese.json) | 奶油乳酪 | 乳品與蛋 | 01017 | CHEESE,CREAM | 無 |
| [items/edam.json](items/edam.json) | 艾登起司 | 乳品與蛋 | 01018 | CHEESE,EDAM | 無 |
| [items/feta.json](items/feta.json) | 菲達起司 | 乳品與蛋 | 01019 | CHEESE,FETA | 無 |
| [items/gouda.json](items/gouda.json) | 高達起司 | 乳品與蛋 | 01022 | CHEESE,GOUDA | 無 |
| [items/gruyere.json](items/gruyere.json) | 格呂耶爾起司 | 乳品與蛋 | 01023 | CHEESE,GRUYERE | 無 |
| [items/mozzarella.json](items/mozzarella.json) | 莫札瑞拉起司（全脂） | 乳品與蛋 | 01026 | CHEESE,MOZZARELLA,WHL MILK | 無 |
| [items/parmesan.json](items/parmesan.json) | 帕瑪森硬質起司 | 乳品與蛋 | 01033 | CHEESE,PARMESAN,HARD | 無 |
| [items/ricotta.json](items/ricotta.json) | 瑞可塔起司（全脂） | 乳品與蛋 | 01036 | CHEESE,RICOTTA,WHOLE MILK | 無 |
| [items/swiss-cheese.json](items/swiss-cheese.json) | 瑞士起司 | 乳品與蛋 | 01040 | CHEESE,SWISS | 無 |
| [items/heavy-cream.json](items/heavy-cream.json) | 動物性鮮奶油（高脂） | 乳品與蛋 | 01053 | CREAM,FLUID,HVY WHIPPING | 無 |
| [items/sour-cream.json](items/sour-cream.json) | 酸奶油（發酵） | 乳品與蛋 | 01056 | CREAM,SOUR,CULTURED | 無 |
| [items/whole-milk.json](items/whole-milk.json) | 全脂牛奶（3.25% 脂肪、添加維生素 D） | 乳品與蛋 | 01077 | MILK,WHL,3.25% MILKFAT,W/ ADDED VITAMIN D | 無 |
| [items/condensed-milk.json](items/condensed-milk.json) | 煉乳（加糖） | 乳品與蛋 | 01095 | MILK,CND,COND,SWTND | 無 |
| [items/evaporated-milk.json](items/evaporated-milk.json) | 淡奶（添加維生素 D） | 乳品與蛋 | 01096 | MILK,CND,EVAP,W/ ADDED VITAMIN D & WO/ ADDED VIT A | 無 |
| [items/goat-milk.json](items/goat-milk.json) | 羊奶（添加維生素 D） | 乳品與蛋 | 01106 | MILK,GOAT,FLUID,W/ ADDED VITAMIN D | 無 |
| [items/plain-yogurt.json](items/plain-yogurt.json) | 原味優格（全脂） | 乳品與蛋 | 01116 | YOGURT,PLN,WHL MILK,8 GRAMS PROT PER 8 OZ | 無 |
| [items/fried-egg.json](items/fried-egg.json) | 煎蛋 | 乳品與蛋 | 01128 | EGG,WHL,CKD,FRIED | 無 |
| [items/omelet.json](items/omelet.json) | 歐姆蛋 | 乳品與蛋 | 01130 | EGG,WHOLE,COOKED,OMELET | 無 |
| [items/scrambled-egg.json](items/scrambled-egg.json) | 炒蛋 | 乳品與蛋 | 01132 | EGG,WHL,CKD,SCRMBLD | 無 |
| [items/duck-egg.json](items/duck-egg.json) | 鴨蛋（生重） | 乳品與蛋 | 01138 | EGG,DUCK,WHOLE,FRESH,RAW | 無 |
| [items/quail-egg.json](items/quail-egg.json) | 鵪鶉蛋（生重） | 乳品與蛋 | 01140 | EGG,QUAIL,WHOLE,FRESH,RAW | 無 |
| [items/cooked-amaranth.json](items/cooked-amaranth.json) | 莧籽飯（水煮熟重） | 穀物與主食 | 20002 | AMARANTH GRAIN,CKD | satFat, sugar, vitC, cholesterol |
| [items/cooked-barley.json](items/cooked-barley.json) | 珍珠大麥（水煮熟重） | 穀物與主食 | 20006 | BARLEY,PEARLED,COOKED | 無 |
| [items/cooked-buckwheat.json](items/cooked-buckwheat.json) | 烘焙蕎麥粒（水煮熟重） | 穀物與主食 | 20010 | BUCKWHEAT GROATS,RSTD,CKD | 無 |
| [items/cooked-bulgur.json](items/cooked-bulgur.json) | 布格麥（水煮熟重） | 穀物與主食 | 20013 | BULGUR,COOKED | 無 |
| [items/cooked-couscous.json](items/cooked-couscous.json) | 庫斯庫斯（熟重） | 穀物與主食 | 20029 | COUSCOUS,COOKED | 無 |
| [items/cooked-millet.json](items/cooked-millet.json) | 小米（水煮熟重） | 穀物與主食 | 20032 | MILLET,COOKED | 無 |
| [items/cooked-oat-bran.json](items/cooked-oat-bran.json) | 燕麥麩（熟重） | 穀物與主食 | 20034 | OAT BRAN,COOKED | sugar |
| [items/cooked-quinoa.json](items/cooked-quinoa.json) | 藜麥（水煮熟重） | 穀物與主食 | 20137 | QUINOA,CKD | 無 |
| [items/cooked-glutinous-rice.json](items/cooked-glutinous-rice.json) | 糯米飯（未強化營養） | 穀物與主食 | 20055 | RICE,WHITE,GLUTINOUS,UNENR,CKD | 無 |
| [items/cooked-wild-rice.json](items/cooked-wild-rice.json) | 野米飯 | 穀物與主食 | 20089 | WILD RICE,COOKED | 無 |
| [items/cooked-soba.json](items/cooked-soba.json) | 日式蕎麥麵（熟重） | 穀物與主食 | 20115 | NOODLES,JAPANESE,SOBA,CKD | sugar, fiber |
| [items/cooked-somen.json](items/cooked-somen.json) | 日式素麵（熟重） | 穀物與主食 | 20117 | NOODLES,JAPANESE,SOMEN,CKD | sugar, fiber |
| [items/cooked-wholewheat-pasta.json](items/cooked-wholewheat-pasta.json) | 全麥義大利麵（熟重） | 穀物與主食 | 20125 | PASTA,WHOLE-WHEAT,CKD | 無 |
| [items/cooked-rice-noodles.json](items/cooked-rice-noodles.json) | 米粉（熟重） | 穀物與主食 | 20134 | RICE NOODLES,CKD | 無 |
| [items/cooked-kamut.json](items/cooked-kamut.json) | 卡姆小麥（熟重） | 穀物與主食 | 20139 | WHEAT,KAMUT KHORASAN,CKD | vitC |
| [items/cooked-spelt.json](items/cooked-spelt.json) | 斯佩爾特小麥（熟重） | 穀物與主食 | 20141 | SPELT,CKD | satFat, sugar |
| [items/cooked-teff.json](items/cooked-teff.json) | 苔麩（熟重） | 穀物與主食 | 20143 | TEFF,CKD | satFat, sugar, vitC |
| [items/cornstarch.json](items/cornstarch.json) | 玉米澱粉（乾粉） | 穀物與主食 | 20027 | CORNSTARCH | 無 |
| [items/white-rice-flour.json](items/white-rice-flour.json) | 白米粉（未強化營養、乾粉） | 穀物與主食 | 20061 | RICE FLR,WHITE,UNENR | 無 |
| [items/wholewheat-flour.json](items/wholewheat-flour.json) | 全麥麵粉（乾粉） | 穀物與主食 | 20080 | WHEAT FLOUR,WHOLE-GRAIN | 無 |
| [items/all-purpose-flour.json](items/all-purpose-flour.json) | 中筋麵粉（未強化營養、乾粉） | 穀物與主食 | 20481 | WHEAT FLR,WHITE,ALL-PURPOSE,UNENR | 無 |
| [items/buckwheat-flour.json](items/buckwheat-flour.json) | 全粒蕎麥粉（乾粉） | 穀物與主食 | 20011 | BUCKWHEAT FLR,WHOLE-GROAT | 無 |
| [items/sorghum.json](items/sorghum.json) | 高粱（乾穀粒） | 穀物與主食 | 20067 | SORGHUM GRAIN | 無 |
| [items/cooked-oatmeal.json](items/cooked-oatmeal.json) | 燕麥粥（水煮、無鹽） | 穀物與主食 | 08121 | CEREALS,OATS,REG & QUICK,UNENR,CKD W/ H2O,WO/ SALT | 無 |
| [items/tapioca-pearls.json](items/tapioca-pearls.json) | 樹薯粉圓（乾品） | 穀物與主食 | 20068 | TAPIOCA,PEARL,DRY | 無 |
| [items/chia.json](items/chia.json) | 奇亞籽（乾品） | 堅果與種子 | 12006 | CHIA SEEDS,DRIED | sugar |
| [items/hemp-seeds.json](items/hemp-seeds.json) | 去殼大麻籽 | 堅果與種子 | 12012 | SEEDS,HEMP SD,HULLED | 無 |
| [items/lotus-seeds.json](items/lotus-seeds.json) | 蓮子（乾品） | 堅果與種子 | 12013 | LOTUS SEEDS,DRIED | sugar, fiber |
| [items/pumpkin-seeds.json](items/pumpkin-seeds.json) | 南瓜籽仁（烘烤、無鹽） | 堅果與種子 | 12016 | PUMPKIN&SQUASH SD KRNLS,RSTD,WO/SALT | 無 |
| [items/sesame.json](items/sesame.json) | 芝麻（全粒乾品） | 堅果與種子 | 12023 | SESAME SEEDS,WHOLE,DRIED | 無 |
| [items/sunflower-seeds.json](items/sunflower-seeds.json) | 葵花籽仁（乾烘、無鹽） | 堅果與種子 | 12037 | SUNFLOWER SD KRNLS,DRY RSTD,WO/SALT | 無 |
| [items/sunflower-butter.json](items/sunflower-butter.json) | 葵花籽醬（無鹽） | 堅果與種子 | 12040 | SUNFLOWER SD BUTTER,WO/SALT | 無 |
| [items/brazil-nuts.json](items/brazil-nuts.json) | 巴西堅果（乾品） | 堅果與種子 | 12078 | BRAZILNUTS,DRIED,UNBLANCHED | 無 |
| [items/cashew.json](items/cashew.json) | 腰果（乾烘、無鹽） | 堅果與種子 | 12085 | CASHEW NUTS,DRY RSTD,WO/SALT | 無 |
| [items/cashew-butter.json](items/cashew-butter.json) | 腰果醬（原味無鹽） | 堅果與種子 | 12088 | CASHEW BUTTER,PLN,WO/SALT | sugar |
| [items/chinese-chestnut.json](items/chinese-chestnut.json) | 板栗（水煮或蒸熟） | 堅果與種子 | 12095 | CHESTNUTS,CHINESE,BLD&STMD | sugar, fiber |
| [items/coconut-flesh.json](items/coconut-flesh.json) | 椰肉（生鮮） | 堅果與種子 | 12104 | COCONUT MEAT,RAW | 無 |
| [items/coconut-milk.json](items/coconut-milk.json) | 椰奶（現榨、椰肉加水） | 堅果與種子 | 12117 | COCONUT MILK,RAW (LIQ EXPRESSED FROM GRATED MEAT&H2O) | 無 |
| [items/hazelnut.json](items/hazelnut.json) | 榛果 | 堅果與種子 | 12120 | HAZELNUTS OR FILBERTS | 無 |
| [items/macadamia.json](items/macadamia.json) | 夏威夷豆（生品） | 堅果與種子 | 12131 | MACADAMIA NUTS,RAW | 無 |
| [items/pecan.json](items/pecan.json) | 碧根果 | 堅果與種子 | 12142 | PECANS | 無 |
| [items/pine-nut.json](items/pine-nut.json) | 松子（乾品） | 堅果與種子 | 12147 | NUTS,PINE NUTS,DRIED | 無 |
| [items/pistachio.json](items/pistachio.json) | 開心果（乾烘、無鹽） | 堅果與種子 | 12152 | PISTACHIO NUTS,DRY RSTD,WO/SALT | 無 |
| [items/walnut.json](items/walnut.json) | 核桃（英國核桃） | 堅果與種子 | 12155 | WALNUTS,ENGLISH | 無 |
| [items/tahini.json](items/tahini.json) | 芝麻醬（烘烤芝麻仁製） | 堅果與種子 | 12166 | SESAME BUTTER,TAHINI,FROM RSTD&TSTD KRNLS (MOST COMMON TYPE) | 無 |
| [items/cooked-adzuki.json](items/cooked-adzuki.json) | 紅豆（水煮、無鹽） | 豆類與豆製品 | 16002 | BEANS,ADZUKI,MATURE SEEDS,CKD,BLD,WO/SALT | sugar |
| [items/cooked-black-beans.json](items/cooked-black-beans.json) | 黑龜豆（水煮、無鹽） | 豆類與豆製品 | 16015 | BEANS,BLACK,MATURE SEEDS,CKD,BLD,WO/SALT | 無 |
| [items/cooked-cranberry-beans.json](items/cooked-cranberry-beans.json) | 蔓越莓豆（水煮、無鹽） | 豆類與豆製品 | 16020 | BEANS,CRANBERRY (ROMAN),MATURE SEEDS,CKD,BLD,WO/SALT | sugar |
| [items/cooked-great-northern.json](items/cooked-great-northern.json) | 大北白豆（水煮、無鹽） | 豆類與豆製品 | 16025 | BEANS,GREAT NORTHERN,MATURE SEEDS,CKD,BLD,WO/SALT | sugar |
| [items/cooked-red-kidney.json](items/cooked-red-kidney.json) | 紅腰豆（水煮、無鹽） | 豆類與豆製品 | 16033 | BEANS,KIDNEY,RED,MATURE SEEDS,CKD,BLD,WO/SALT | 無 |
| [items/cooked-navy-beans.json](items/cooked-navy-beans.json) | 海軍豆（水煮、無鹽） | 豆類與豆製品 | 16038 | BEANS,NAVY,MATURE SEEDS,CKD,BLD,WO/SALT | cholesterol |
| [items/cooked-pinto.json](items/cooked-pinto.json) | 斑豆（水煮、無鹽） | 豆類與豆製品 | 16043 | BEANS,PINTO,MATURE SEEDS,CKD,BLD,WO/SALT | 無 |
| [items/cooked-fava.json](items/cooked-fava.json) | 蠶豆（成熟豆水煮、無鹽） | 豆類與豆製品 | 16053 | BROADBEANS (FAVA BNS),MATURE SEEDS,CKD,BLD,WO/SALT | 無 |
| [items/cooked-chickpeas.json](items/cooked-chickpeas.json) | 鷹嘴豆（水煮、無鹽） | 豆類與豆製品 | 16057 | CHICKPEAS ,MATURE SEEDS,CKD,BLD,WO/SALT | 無 |
| [items/cooked-blackeyed-peas.json](items/cooked-blackeyed-peas.json) | 眉豆（水煮、無鹽） | 豆類與豆製品 | 16063 | COWPEAS,COMMON (BLKEYES,CRWDR,STHRN),MTURE,CKD,BLD,WO/SALT | 無 |
| [items/cooked-lentils.json](items/cooked-lentils.json) | 扁豆（水煮、無鹽） | 豆類與豆製品 | 16070 | LENTILS,MATURE SEEDS,CKD,BLD,WO/SALT | 無 |
| [items/cooked-lima.json](items/cooked-lima.json) | 利馬豆（水煮、無鹽） | 豆類與豆製品 | 16072 | LIMA BNS,LRG,MATURE SEEDS,CKD,BLD,WO/SALT | 無 |
| [items/cooked-mung.json](items/cooked-mung.json) | 綠豆（水煮、無鹽） | 豆類與豆製品 | 16081 | MUNG BNS,MATURE SEEDS,CKD,BLD,WO/SALT | 無 |
| [items/cooked-split-peas.json](items/cooked-split-peas.json) | 去皮豌豆（水煮、無鹽） | 豆類與豆製品 | 16086 | PEAS,SPLIT,MATURE SEEDS,CKD,BLD,WO/SALT | 無 |
| [items/cooked-soybeans.json](items/cooked-soybeans.json) | 黃豆（成熟豆水煮、無鹽） | 豆類與豆製品 | 16109 | SOYBEANS,MATURE CKD,BLD,WO/SALT | 無 |
| [items/natto.json](items/natto.json) | 納豆 | 豆類與豆製品 | 16113 | NATTO | 無 |
| [items/cooked-tempeh.json](items/cooked-tempeh.json) | 天貝（熟重） | 豆類與豆製品 | 16174 | TEMPEH,CKD | sugar, fiber, vitC, cholesterol |
| [items/fried-tofu.json](items/fried-tofu.json) | 油豆腐 | 豆類與豆製品 | 16129 | TOFU,FRIED | 無 |
| [items/fermented-tofu.json](items/fermented-tofu.json) | 豆腐乳（鹽漬發酵） | 豆類與豆製品 | 16132 | TOFU,SALTED&FERMENTED (FUYU) | sugar, fiber |
| [items/hummus.json](items/hummus.json) | 鷹嘴豆泥（市售） | 豆類與豆製品 | 16158 | HUMMUS,COMMERCIAL | sugar |
| [items/cooked-carp.json](items/cooked-carp.json) | 鯉魚（乾熱烹調） | 魚類與海鮮 | 15009 | CARP,COOKED,DRY HEAT | sugar |
| [items/cooked-atlantic-cod.json](items/cooked-atlantic-cod.json) | 大西洋鱈魚（乾熱烹調） | 魚類與海鮮 | 15016 | COD,ATLANTIC,CKD,DRY HEAT | 無 |
| [items/cooked-eel.json](items/cooked-eel.json) | 鰻魚（混合品種、乾熱烹調） | 魚類與海鮮 | 15026 | EEL,MXD SP,CKD,DRY HEAT | sugar |
| [items/cooked-flatfish.json](items/cooked-flatfish.json) | 比目魚與鰈魚（乾熱烹調） | 魚類與海鮮 | 15029 | FLATFISH (FLOUNDER&SOLE SP),CKD,DRY HEAT | 無 |
| [items/cooked-grouper.json](items/cooked-grouper.json) | 石斑魚（乾熱烹調） | 魚類與海鮮 | 15032 | GROUPER,MXD SP,CKD,DRY HEAT | sugar |
| [items/cooked-haddock.json](items/cooked-haddock.json) | 黑線鱈（乾熱烹調） | 魚類與海鮮 | 15034 | HADDOCK,COOKED,DRY HEAT | 無 |
| [items/cooked-halibut.json](items/cooked-halibut.json) | 大比目魚（乾熱烹調） | 魚類與海鮮 | 15037 | HALIBUT,ATLANTIC&PACIFIC,CKD,DRY HEAT | 無 |
| [items/cooked-herring.json](items/cooked-herring.json) | 大西洋鯡魚（乾熱烹調） | 魚類與海鮮 | 15040 | HERRING,ATLANTIC,CKD,DRY HEAT | 無 |
| [items/cooked-mackerel.json](items/cooked-mackerel.json) | 大西洋鯖魚（乾熱烹調） | 魚類與海鮮 | 15047 | MACKEREL,ATLANTIC,CKD,DRY HEAT | sugar |
| [items/cooked-mullet.json](items/cooked-mullet.json) | 烏魚（乾熱烹調） | 魚類與海鮮 | 15056 | MULLET,STRIPED,CKD,DRY HEAT | sugar |
| [items/cooked-alaska-pollock.json](items/cooked-alaska-pollock.json) | 阿拉斯加狹鱈（乾熱烹調） | 魚類與海鮮 | 15067 | FISH,POLLOCK,ALASKA,CKD,DRY HEAT (MAYBE PREVIOUSLY FROZEN) | 無 |
| [items/cooked-seabass.json](items/cooked-seabass.json) | 海鱸魚（混合品種、乾熱烹調） | 魚類與海鮮 | 15092 | SEA BASS,MXD SP,CKD,DRY HEAT | sugar |
| [items/cooked-snapper.json](items/cooked-snapper.json) | 笛鯛（乾熱烹調） | 魚類與海鮮 | 15102 | SNAPPER,MXD SP,CKD,DRY HEAT | sugar |
| [items/cooked-sturgeon.json](items/cooked-sturgeon.json) | 鱘魚（乾熱烹調） | 魚類與海鮮 | 15105 | STURGEON,MXD SP,CKD,DRY HEAT | 無 |
| [items/cooked-rainbow-trout.json](items/cooked-rainbow-trout.json) | 野生虹鱒（乾熱烹調） | 魚類與海鮮 | 15116 | TROUT,RAINBOW,WILD,CKD,DRY HEAT | sugar |
| [items/cooked-skipjack.json](items/cooked-skipjack.json) | 正鰹（乾熱烹調） | 魚類與海鮮 | 15220 | TUNA,SKIPJACK,FRSH,CKD,DRY HEAT | sugar |
| [items/cooked-yellowfin.json](items/cooked-yellowfin.json) | 黃鰭鮪魚（乾熱烹調） | 魚類與海鮮 | 15221 | TUNA,YELLOWFIN,FRSH,CKD,DRY HEAT | 無 |
| [items/cooked-milkfish.json](items/cooked-milkfish.json) | 虱目魚（乾熱烹調） | 魚類與海鮮 | 15202 | MILKFISH,COOKED,DRY HEAT | satFat, sugar |
| [items/cooked-tilapia.json](items/cooked-tilapia.json) | 吳郭魚（乾熱烹調） | 魚類與海鮮 | 15262 | FISH,TILAPIA,CKD,DRY HEAT | 無 |
| [items/cooked-king-crab.json](items/cooked-king-crab.json) | 阿拉斯加帝王蟹（水煮或蒸熟） | 魚類與海鮮 | 15137 | CRAB,ALASKA KING,CKD,MOIST HEAT | sugar |
| [items/cooked-blue-crab.json](items/cooked-blue-crab.json) | 藍蟹（水煮或蒸熟） | 魚類與海鮮 | 15140 | CRAB,BLUE,CKD,MOIST HEAT | 無 |
| [items/cooked-lobster.json](items/cooked-lobster.json) | 美洲龍蝦（水煮或蒸熟） | 魚類與海鮮 | 15148 | LOBSTER,NORTHERN,CKD,MOIST HEAT | 無 |
| [items/cooked-clams.json](items/cooked-clams.json) | 蛤蜊（水煮或蒸熟） | 魚類與海鮮 | 15159 | CLAM,MXD SP,CKD,MOIST HEAT | sugar |
| [items/cooked-mussels.json](items/cooked-mussels.json) | 藍貽貝（水煮或蒸熟） | 魚類與海鮮 | 15165 | MUSSEL,BLUE,CKD,MOIST HEAT | sugar |
| [items/cooked-cuttlefish.json](items/cooked-cuttlefish.json) | 烏賊（水煮或蒸熟） | 魚類與海鮮 | 15229 | CUTTLEFISH,MXD SP,CKD,MOIST HEAT | sugar |
| [items/cooked-octopus.json](items/cooked-octopus.json) | 章魚（水煮或蒸熟） | 魚類與海鮮 | 15230 | OCTOPUS,COMMON,CKD,MOIST HEAT | 無 |
| [items/cooked-pacific-oyster.json](items/cooked-pacific-oyster.json) | 太平洋牡蠣（水煮或蒸熟） | 魚類與海鮮 | 15231 | OYSTER,PACIFIC,CKD,MOIST HEAT | 無 |
| [items/canned-sardine.json](items/canned-sardine.json) | 沙丁魚罐頭（油漬瀝乾、含骨） | 魚類與海鮮 | 15088 | SARDINE,ATLANTIC,CND IN OIL,DRND SOL W/BONE | 無 |
| [items/canned-light-tuna.json](items/canned-light-tuna.json) | 淡色鮪魚罐頭（水漬瀝乾） | 魚類與海鮮 | 15121 | FISH,TUNA,LT,CND IN H2O,DRND SOL | 無 |
| [items/canned-anchovy.json](items/canned-anchovy.json) | 歐洲鯷魚罐頭（油漬瀝乾） | 魚類與海鮮 | 15002 | ANCHOVY,EUROPEAN,CND IN OIL,DRND SOL | 無 |
| [items/cooked-chicken-gizzard.json](items/cooked-chicken-gizzard.json) | 雞胗（燉熟） | 肉類與加工肉品 | 05024 | CHICKEN,GIZZARD,ALL CLASSES,CKD,SIMMRD | 無 |
| [items/cooked-chicken-heart.json](items/cooked-chicken-heart.json) | 雞心（燉熟） | 肉類與加工肉品 | 05026 | CHICKEN,HEART,ALL CLASSES,CKD,SIMMRD | sugar |
| [items/cooked-chicken-liver.json](items/cooked-chicken-liver.json) | 雞肝（燉熟） | 肉類與加工肉品 | 05028 | CHICKEN,LIVER,ALL CLASSES,CKD,SIMMRD | 無 |
| [items/roasted-chicken-leg.json](items/roasted-chicken-leg.json) | 烤雞腿（含皮） | 肉類與加工肉品 | 05078 | CHICKEN,BROILERS OR FRYERS,LEG,MEAT&SKN,CKD,RSTD | 無 |
| [items/roasted-duck.json](items/roasted-duck.json) | 烤鴨（含皮） | 肉類與加工肉品 | 05140 | DUCK,DOMESTICATED,MEAT&SKN,CKD,RSTD | 無 |
| [items/roasted-goose.json](items/roasted-goose.json) | 烤鵝（含皮） | 肉類與加工肉品 | 05147 | GOOSE,DOMESTICATED,MEAT&SKN,CKD,RSTD | 無 |
| [items/roasted-turkey.json](items/roasted-turkey.json) | 火雞肉（去皮烤熟） | 肉類與加工肉品 | 05168 | TURKEY,WHL,MEAT ONLY,CKD,RSTD | 無 |
| [items/cooked-ground-turkey.json](items/cooked-ground-turkey.json) | 火雞絞肉（熟重） | 肉類與加工肉品 | 05306 | GROUND TURKEY,CKD | 無 |
| [items/braised-pork-ribs.json](items/braised-pork-ribs.json) | 豬肋排（含瘦肉與脂肪、燉熟） | 肉類與加工肉品 | 10089 | PORK,FRSH,SPARERIBS,LN&FAT,CKD,BRSD | 無 |
| [items/braised-pork-heart.json](items/braised-pork-heart.json) | 豬心（燉熟） | 肉類與加工肉品 | 10104 | PORK,FRSH,VAR MEATS&BY-PRODUCTS,HEART,CKD,BRSD | sugar |
| [items/braised-pork-kidney.json](items/braised-pork-kidney.json) | 豬腰（燉熟） | 肉類與加工肉品 | 10107 | PORK,FRSH,VAR MEATS&BY-PRODUCTS,KIDNEYS,CKD,BRSD | sugar |
| [items/braised-pork-liver.json](items/braised-pork-liver.json) | 豬肝（燉熟） | 肉類與加工肉品 | 10111 | PORK,FRSH,VAR MEATS&BY-PRODUCTS,LIVER,CKD,BRSD | sugar |
| [items/braised-pork-tongue.json](items/braised-pork-tongue.json) | 豬舌（燉熟） | 肉類與加工肉品 | 10122 | PORK,FRSH,VAR MEATS&BY-PRODUCTS,TONGUE,CKD,BRSD | sugar |
| [items/simmered-pork-feet.json](items/simmered-pork-feet.json) | 豬腳（燉熟） | 肉類與加工肉品 | 10173 | PORK,FRSH,VAR MEATS&BY-PRODUCTS,FEET,CKD,SIMMRD | 無 |
| [items/cooked-ground-pork.json](items/cooked-ground-pork.json) | 豬絞肉（84% 瘦肉、炒碎熟重） | 肉類與加工肉品 | 10975 | PORK,GROUND,84% LN / 16% FAT,CKD,CRUMBLES | 無 |
| [items/cooked-beef-heart.json](items/cooked-beef-heart.json) | 牛心（燉熟） | 肉類與加工肉品 | 13322 | BEEF,VAR MEATS&BY-PRODUCTS,HEART,CKD,SIMMRD | 無 |
| [items/braised-beef-liver.json](items/braised-beef-liver.json) | 牛肝（燉熟） | 肉類與加工肉品 | 13326 | BEEF,VAR MEATS & BY-PRODUCTS,LIVER,CKD,BRSD | 無 |
| [items/cooked-beef-tongue.json](items/cooked-beef-tongue.json) | 牛舌（燉熟） | 肉類與加工肉品 | 13340 | BEEF,VAR MEATS&BY-PRODUCTS,TONGUE,CKD,SIMMRD | 無 |
| [items/roasted-lamb-leg.json](items/roasted-lamb-leg.json) | 綿羊腿（含瘦肉與脂肪、烤熟） | 肉類與加工肉品 | 17012 | LAMB,DOM,LEG,WHL (SHK&SIRL),LN&FAT,1/4"FAT,CHOIC,CKD,RSTD | 無 |
| [items/roasted-goat.json](items/roasted-goat.json) | 山羊肉（烤熟） | 肉類與加工肉品 | 17169 | GAME MEAT,GOAT,CKD,RSTD | 無 |
| [items/roasted-rabbit.json](items/roasted-rabbit.json) | 家兔肉（烤熟） | 肉類與加工肉品 | 17178 | GAME MEAT,RABBIT,DOMESTICATED,COMP OF CUTS,CKD,RSTD | sugar |
| [items/cooked-bratwurst.json](items/cooked-bratwurst.json) | 德式豬肉香腸（熟重） | 肉類與加工肉品 | 07013 | BRATWURST,PORK,CKD | 無 |
| [items/sliced-ham.json](items/sliced-ham.json) | 切片火腿（一般脂肪含量） | 肉類與加工肉品 | 07029 | HAM,SLICED,REG (APPROX 11% FAT) | 無 |
| [items/canned-luncheon-meat.json](items/canned-luncheon-meat.json) | 豬肉午餐肉罐頭 | 肉類與加工肉品 | 07045 | LUNCHEON MEAT,PORK,CANNED | 無 |
| [items/pepperoni.json](items/pepperoni.json) | 佩佩羅尼辣腸（牛豬肉、切片） | 肉類與加工肉品 | 07057 | PEPPERONI,BF & PORK,SLICED | 無 |
| [items/egg-bagel.json](items/egg-bagel.json) | 蛋貝果 | 麵包與烘焙 | 18003 | BAGELS,EGG | sugar |
| [items/raisin-bagel.json](items/raisin-bagel.json) | 肉桂葡萄乾貝果 | 麵包與烘焙 | 18005 | BAGELS,CINNAMON-RAISIN | 無 |
| [items/banana-bread.json](items/banana-bread.json) | 香蕉蛋糕麵包（人造奶油配方） | 麵包與烘焙 | 18019 | BREAD,BANANA,PREP FROM RECIPE,MADE W/MARGARINE | sugar |
| [items/cornbread.json](items/cornbread.json) | 玉米麵包（2% 牛奶配方） | 麵包與烘焙 | 18024 | BREAD,CORNBREAD,PREP FROM RECIPE,MADE W/LOFAT (2%) MILK | sugar, fiber |
| [items/egg-bread.json](items/egg-bread.json) | 雞蛋麵包 | 麵包與烘焙 | 18027 | BREAD,EGG | 無 |
| [items/french-bread.json](items/french-bread.json) | 法國麵包 | 麵包與烘焙 | 18029 | Bread, french | 無 |
| [items/irish-soda-bread.json](items/irish-soda-bread.json) | 愛爾蘭蘇打麵包 | 麵包與烘焙 | 18032 | BREAD,IRISH SODA,PREP FROM RECIPE | sugar |
| [items/italian-bread.json](items/italian-bread.json) | 義大利麵包 | 麵包與烘焙 | 18033 | BREAD,ITALIAN | 無 |
| [items/oat-bran-bread.json](items/oat-bran-bread.json) | 燕麥麩麵包 | 麵包與烘焙 | 18037 | BREAD,OAT BRAN | 無 |
| [items/wholewheat-pita.json](items/wholewheat-pita.json) | 全麥皮塔餅 | 麵包與烘焙 | 18042 | BREAD,PITA,WHOLE-WHEAT | 無 |
| [items/pumpernickel.json](items/pumpernickel.json) | 普姆珀尼克爾黑麥麵包 | 麵包與烘焙 | 18044 | BREAD,PUMPERNICKEL | 無 |
| [items/raisin-bread.json](items/raisin-bread.json) | 葡萄乾麵包（強化營養） | 麵包與烘焙 | 18047 | BREAD,RAISIN,ENRICHED | 無 |
| [items/rye-bread.json](items/rye-bread.json) | 黑麥麵包 | 麵包與烘焙 | 18060 | BREAD,RYE | 無 |
| [items/wholewheat-bread.json](items/wholewheat-bread.json) | 全麥麵包（市售） | 麵包與烘焙 | 18075 | BREAD,WHOLE-WHEAT,COMM. PREPARED | 無 |
| [items/angel-cake.json](items/angel-cake.json) | 天使蛋糕（市售） | 麵包與烘焙 | 18086 | CAKE,ANGELFOOD,COMMLY PREP | sugar |
| [items/chocolate-cake.json](items/chocolate-cake.json) | 巧克力蛋糕（無糖霜配方） | 麵包與烘焙 | 18101 | CAKE,CHOC,PREP FROM RECIPE WO/FRSTNG | sugar |
| [items/gingerbread-cake.json](items/gingerbread-cake.json) | 薑味蛋糕 | 麵包與烘焙 | 18116 | CAKE,GINGERBREAD,PREP FROM RECIPE | sugar, fiber |
| [items/pound-cake.json](items/pound-cake.json) | 奶油磅蛋糕（市售） | 麵包與烘焙 | 18120 | CAKE,POUND,COMMLY PREP,BUTTER (INCLUDES FRSH & FROZEN) | 無 |
| [items/sponge-cake.json](items/sponge-cake.json) | 海綿蛋糕（市售） | 麵包與烘焙 | 18133 | CAKE,SPONGE,COMMLY PREP | 無 |
| [items/cheesecake.json](items/cheesecake.json) | 起司蛋糕（市售） | 麵包與烘焙 | 18147 | CHEESECAKE COMMLY PREP | 無 |
| [items/brownie.json](items/brownie.json) | 布朗尼（市售） | 麵包與烘焙 | 18151 | COOKIES,BROWNIES,COMMLY PREP | 無 |
| [items/butter-cookie.json](items/butter-cookie.json) | 奶油餅乾（市售、強化營養） | 麵包與烘焙 | 18155 | COOKIES,BUTTER,COMMLY PREP,ENR | 無 |
| [items/oatmeal-cookie.json](items/oatmeal-cookie.json) | 燕麥餅乾（市售一般型） | 麵包與烘焙 | 18178 | COOKIES,OATMEAL,COMMLY PREP,REG | 無 |
| [items/croissant.json](items/croissant.json) | 奶油可頌 | 麵包與烘焙 | 18239 | CROISSANTS,BUTTER | 無 |
| [items/blueberry-muffin.json](items/blueberry-muffin.json) | 藍莓瑪芬（市售） | 麵包與烘焙 | 18274 | MUFFINS,BLUEBERRY,COMMLY PREP (INCLUDES MINI-MUFFINS) | 無 |
| [items/acerola.json](items/acerola.json) | 西印度櫻桃（生鮮） | 水果與果乾 | 09001 | ACEROLA,(WEST INDIAN CHERRY),RAW | sugar |
| [items/breadfruit.json](items/breadfruit.json) | 麵包果（生重） | 水果與果乾 | 09059 | BREADFRUIT,RAW | 無 |
| [items/cherimoya.json](items/cherimoya.json) | 秘魯番荔枝（生鮮） | 水果與果乾 | 09062 | CHERIMOYA,RAW | 無 |
| [items/custard-apple.json](items/custard-apple.json) | 牛心番荔枝（生鮮） | 水果與果乾 | 09086 | CUSTARD-APPLE,(BULLOCK'S-HEART),RAW | sugar |
| [items/cape-gooseberry.json](items/cape-gooseberry.json) | 黃金莓（生鮮） | 水果與果乾 | 09138 | GROUNDCHERRIES,(CAPE-GOOSEBERRIES OR POHA),RAW | satFat, sugar, fiber, sodium, potassium |
| [items/jujube.json](items/jujube.json) | 棗（鮮果） | 水果與果乾 | 09146 | JUJUBE,RAW | satFat, sugar, fiber |
| [items/cantaloupe.json](items/cantaloupe.json) | 哈密瓜（橙肉香瓜、生鮮） | 水果與果乾 | 09181 | MELONS,CANTALOUPE,RAW | 無 |
| [items/honeydew.json](items/honeydew.json) | 蜜露瓜（生鮮） | 水果與果乾 | 09184 | MELONS,HONEYDEW,RAW | 無 |
| [items/quince.json](items/quince.json) | 榲桲（生重） | 水果與果乾 | 09296 | QUINCES,RAW | sugar |
| [items/sapodilla.json](items/sapodilla.json) | 人心果（生鮮） | 水果與果乾 | 09313 | SAPODILLA,RAW | sugar |
| [items/feijoa.json](items/feijoa.json) | 費約果（生鮮） | 水果與果乾 | 09334 | FEIJOA,RAW | 無 |
| [items/durian.json](items/durian.json) | 榴槤（生鮮或冷凍） | 水果與果乾 | 09422 | DURIAN,RAW OR FROZEN | satFat, sugar |
| [items/deglet-noor-dates.json](items/deglet-noor-dates.json) | 椰棗（Deglet Noor 品種） | 水果與果乾 | 09087 | DATES,DEGLET NOOR | 無 |
| [items/prunes.json](items/prunes.json) | 西梅乾 | 水果與果乾 | 09291 | PLUMS,DRIED (PRUNES),UNCKD | 無 |
| [items/raisins.json](items/raisins.json) | 無籽葡萄乾 | 水果與果乾 | 09298 | RAISINS,SEEDLESS | 無 |
| [items/allspice.json](items/allspice.json) | 多香果粉 | 香料與調味 | 02001 | ALLSPICE,GROUND | sugar |
| [items/anise-seed.json](items/anise-seed.json) | 西洋茴香籽 | 香料與調味 | 02002 | ANISE SEED | sugar |
| [items/dried-basil.json](items/dried-basil.json) | 羅勒（乾燥） | 香料與調味 | 02003 | SPICES,BASIL,DRIED | 無 |
| [items/cardamom.json](items/cardamom.json) | 小荳蔻 | 香料與調味 | 02006 | SPICES,CARDAMOM | sugar |
| [items/cinnamon.json](items/cinnamon.json) | 肉桂粉 | 香料與調味 | 02010 | CINNAMON,GROUND | 無 |
| [items/cloves.json](items/cloves.json) | 丁香粉 | 香料與調味 | 02011 | CLOVES,GROUND | 無 |
| [items/coriander-seed.json](items/coriander-seed.json) | 芫荽籽 | 香料與調味 | 02013 | CORIANDER SEED | sugar |
| [items/cumin-seed.json](items/cumin-seed.json) | 孜然籽 | 香料與調味 | 02014 | CUMIN SEED | 無 |
| [items/curry-powder.json](items/curry-powder.json) | 咖哩粉 | 香料與調味 | 02015 | CURRY POWDER | 無 |
| [items/garlic-powder.json](items/garlic-powder.json) | 蒜粉 | 香料與調味 | 02020 | GARLIC POWDER | 無 |
| [items/ginger-powder.json](items/ginger-powder.json) | 薑粉 | 香料與調味 | 02021 | GINGER,GROUND | 無 |
| [items/nutmeg.json](items/nutmeg.json) | 肉荳蔻粉 | 香料與調味 | 02025 | NUTMEG,GROUND | 無 |
| [items/dried-oregano.json](items/dried-oregano.json) | 奧勒岡葉（乾燥） | 香料與調味 | 02027 | SPICES,OREGANO,DRIED | 無 |
| [items/black-pepper.json](items/black-pepper.json) | 黑胡椒 | 香料與調味 | 02030 | PEPPER,BLACK | 無 |
| [items/turmeric.json](items/turmeric.json) | 薑黃粉 | 香料與調味 | 02043 | TURMERIC,GROUND | 無 |
| [items/salted-butter.json](items/salted-butter.json) | 有鹽奶油 | 油脂 | 01001 | BUTTER,WITH SALT | 無 |
| [items/lard.json](items/lard.json) | 豬油 | 油脂 | 04002 | LARD | 無 |
| [items/rice-bran-oil.json](items/rice-bran-oil.json) | 米糠油 | 油脂 | 04037 | OIL,RICE BRAN | 無 |
| [items/peanut-oil.json](items/peanut-oil.json) | 花生油 | 油脂 | 04042 | OIL,PNUT,SALAD OR COOKING | 無 |
| [items/soybean-oil.json](items/soybean-oil.json) | 大豆油 | 油脂 | 04044 | OIL,SOYBN,SALAD OR COOKING | 無 |
| [items/coconut-oil.json](items/coconut-oil.json) | 椰子油 | 油脂 | 04047 | OIL,COCNT | 無 |
| [items/olive-oil.json](items/olive-oil.json) | 橄欖油 | 油脂 | 04053 | OIL,OLIVE,SALAD OR COOKING | 無 |
| [items/sesame-oil.json](items/sesame-oil.json) | 芝麻油 | 油脂 | 04058 | OIL,SESAME,SALAD OR COOKING | 無 |
| [items/grapeseed-oil.json](items/grapeseed-oil.json) | 葡萄籽油 | 油脂 | 04517 | OIL,GRAPESEED | 無 |
| [items/canola-oil.json](items/canola-oil.json) | 芥花油 | 油脂 | 04582 | OIL,CANOLA | 無 |
| [items/teriyaki-sauce.json](items/teriyaki-sauce.json) | 照燒醬（即食） | 醬料 | 06112 | SAUCE,TERIYAKI,RTS | 無 |
| [items/barbecue-sauce.json](items/barbecue-sauce.json) | 烤肉醬 | 醬料 | 06150 | SAUCE,BARBECUE | 無 |
| [items/plum-sauce.json](items/plum-sauce.json) | 梅子醬（即食） | 醬料 | 06151 | SAUCE,PLUM,READY-TO-SERVE | sugar |
| [items/salsa.json](items/salsa.json) | 莎莎醬（即食） | 醬料 | 06164 | SAUCE,SALSA,RTS | 無 |
| [items/hoisin-sauce.json](items/hoisin-sauce.json) | 海鮮醬（即食） | 醬料 | 06175 | SAUCE,HOISIN,RTS | 無 |
| [items/oyster-sauce.json](items/oyster-sauce.json) | 蠔油（即食） | 醬料 | 06176 | SAUCE,OYSTER,RTS | 無 |
| [items/fish-sauce.json](items/fish-sauce.json) | 魚露（即食） | 醬料 | 06179 | SAUCE,FISH,READY-TO-SERVE | 無 |
| [items/miso.json](items/miso.json) | 味噌 | 醬料 | 16112 | MISO | 無 |
| [items/shoyu.json](items/shoyu.json) | 醬油（黃豆與小麥釀製） | 醬料 | 16123 | SOY SAU MADE FROM SOY&WHEAT (SHOYU) | 無 |
| [items/pesto.json](items/pesto.json) | 青醬（冷藏即食） | 醬料 | 06626 | SAUCE,PESTO,RTS,REFR | cholesterol |
| [items/beef-jerky.json](items/beef-jerky.json) | 牛肉乾（重組型） | 零食與甜味料 | 19002 | BEEF JERKY,CHOPD&FORMED | 無 |
| [items/granola-bar.json](items/granola-bar.json) | 穀麥棒（硬質原味） | 零食與甜味料 | 19015 | GRANOLA BARS,HARD,PLAIN | 無 |
| [items/air-popped-popcorn.json](items/air-popped-popcorn.json) | 爆米花（熱風爆製） | 零食與甜味料 | 19034 | POPCORN,AIR-POPPED | 無 |
| [items/hard-pretzel.json](items/hard-pretzel.json) | 蝴蝶脆餅（原味加鹽） | 零食與甜味料 | 19047 | PRETZELS,HARD,PLN,SALTED | 無 |
| [items/brown-rice-cracker.json](items/brown-rice-cracker.json) | 糙米米餅（原味） | 零食與甜味料 | 19051 | SNACKS,RICE CRACKER BROWN RICE,PLN | 無 |
| [items/tortilla-chips.json](items/tortilla-chips.json) | 玉米脆片（原味） | 零食與甜味料 | 19056 | TORTILLA CHIPS,PLAIN | 無 |
| [items/cocoa-powder.json](items/cocoa-powder.json) | 可可粉（無糖） | 零食與甜味料 | 19165 | COCOA,DRY PDR,UNSWTND | 無 |
| [items/honey.json](items/honey.json) | 蜂蜜 | 零食與甜味料 | 19296 | HONEY | 無 |
| [items/jam.json](items/jam.json) | 果醬（一般型） | 零食與甜味料 | 19297 | JAMS AND PRESERVES | 無 |
| [items/granulated-sugar.json](items/granulated-sugar.json) | 白砂糖 | 零食與甜味料 | 19335 | SUGARS,GRANULATED | 無 |
| [items/coconut-water.json](items/coconut-water.json) | 椰子水（鮮品） | 飲品 | 12119 | COCONUT H2O (LIQ FROM COCONUTS) | 無 |
| [items/soy-milk.json](items/soy-milk.json) | 豆奶（原味或香草、未強化營養） | 飲品 | 16120 | SOYMILK,ORIGINAL & VANILLA,UNFORTIFIED | 無 |
| [items/brewed-coffee.json](items/brewed-coffee.json) | 黑咖啡（以自來水沖煮） | 飲品 | 14209 | BEVERAGES,COFFEE,BREWED,PREP W/ TAP H2O | 無 |
| [items/espresso.json](items/espresso.json) | 義式濃縮咖啡 | 飲品 | 14210 | BEVERAGES,COFFEE,BREWED,ESPRESSO,REST-PREP | 無 |
| [items/black-tea.json](items/black-tea.json) | 紅茶（以自來水沖泡） | 飲品 | 14355 | BEVERAGES,TEA,BLACK,BREWED,PREP W/ TAP H2O | 無 |
| [items/green-tea.json](items/green-tea.json) | 綠茶（沖泡） | 飲品 | 14278 | BEVERAGES,TEA,GRN,BREWED,REG | 無 |
| [items/oolong-tea.json](items/oolong-tea.json) | 烏龍茶（沖泡） | 飲品 | 14185 | BEVERAGES,TEA,OOLONG,BREWED | 無 |
| [items/apple-juice.json](items/apple-juice.json) | 蘋果汁（瓶裝或罐裝、未加糖及維生素 C） | 飲品 | 09016 | APPLE JUC,CND OR BTLD,UNSWTND,WO/ ADDED VIT C | 無 |
| [items/orange-juice.json](items/orange-juice.json) | 柳橙汁（鮮榨） | 飲品 | 09206 | ORANGE JUICE,RAW | 無 |
| [items/hot-cocoa.json](items/hot-cocoa.json) | 熱可可（調製粉加水沖泡） | 飲品 | 14194 | BEVERAGES,COCOA MIX,PDR,PREP W/ H2O | 無 |
