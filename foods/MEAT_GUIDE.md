# 台灣常見肉類、火鍋肉片與生魚片資料指南

本次新增 **172 筆**，原有 373 筆食物維持原樣，索引共 **545 筆**。
每筆為一個來源明確的「部位／商品與處理狀態」，不是把同一筆數值複製成多個菜單名稱。

## 優先依台灣用語選擇

| 店家／市場名稱 | 本次對應紀錄與限制 |
| --- | --- |
| 梅花豬、梅花豬火鍋片 | [上肩肉](items/tw-pork-collar.json)：台灣樣品、去皮生重；同一部位切薄片不另外虛構每片重量。 |
| 培根豬、五花豬火鍋片 | [未醃製去皮腹脇肉](items/tw-pork-belly-skinless.json)：對應新鮮五花原料；請確認產品是未醃製肉。 |
| 早餐培根、煙肉 | [加工培根](items/tw-cured-bacon.json)：來源配方含肉、鹽糖、黃豆蛋白等，與培根豬火鍋片分開。 |
| 松阪豬 | [豬頸肉](items/tw-pork-jowl.json)，不是日本松阪產地保證；與[豬頰肉／菊花肉](items/tw-pork-cheek.json)分開。 |
| 豬里肌 | [大里肌](items/tw-pork-loin.json)與[小里肌／腰內肉](items/tw-pork-tenderloin.json)分開。 |
| 牛五花、牛梅花、嫩肩里肌、紐約客火鍋片 | 各採食藥署的獨立火鍋片樣品，沒有統一套用「牛肉」平均值。 |
| 沙朗 | 台灣來源的[沙朗／肋眼](items/tw-beef-ribeye.json)在肋脊；[Top sirloin](items/us-beef-top-sirloin-raw.json)為上後腰脊。先確認菜單英文，不能只憑中文判定。 |
| 板腱、flat iron | 台灣[板腱](items/tw-beef-top-blade.json)與 USDA top blade 有來源；flat iron 會進一步移除內部筋膜，沒有宣稱是同一去筋成品。 |
| 戰斧 | [帶骨肋眼的 Choice 參考紀錄](items/us-beef-bone-in-ribeye-raw.json)，只計可食肉，不含長骨；不宣稱所有戰斧等級、油花相同。 |
| 丁骨、紅屋／Porterhouse | 各有生重與熟重紀錄，骨頭另扣。它們不是同一筆肉複製兩個名稱。 |
| 橫隔膜、裙邊 | 區分 inside skirt、outside skirt 與 flank；hanger／腹脅蓋 flap 等沒有精確對應紀錄的切割不硬套數值。 |
| 雞排、小雞腿 | [雞腿排](items/tw-chicken-thigh-steak.json)來源是生腿肉，不是夜市炸雞排；[翅根](items/tw-chicken-wing-drumette.json)與[棒棒腿](items/tw-chicken-drumstick.json)分開。 |
| 鮭魚肚、鮭魚生魚片 | [腹肉](items/tw-salmon-belly.json)、[一般生魚片](items/tw-salmon-sashimi.json)、中段、尾段各用獨立台灣樣品。 |
| 黑鮪大腹／中腹、Toro | 分天然／養殖脂身與赤身；日本來源只把脂身作為一類，沒有大腹、中腹各自固定值，不能憑空拆分。 |
| 青甘、紅甘 | 青甘採日本 Seriola quinqueradiata 養殖幼魚去皮刺身；紅甘為 Seriola dumerili，另分來源含皮／分切肉／背側肉。保留來源學名，不視為同一魚種。 |
| 真鯛、台灣鯛 | 真鯛與台灣鯛魚片不是同一魚種。真鯛採一筆明確標示月份的樣品，不混合不同季節數值。 |
| 比目魚、鰈魚、緣側 | 鰈魚切片紀錄不代表所有「銀鱈」商品，也不當作高脂鰭邊肉／緣側。 |
| 蟹味棒、魚板、貢丸、魚餃、燕餃 | 使用調理品來源，不以純蟹肉、純魚肉或純豬肉替代；品牌差異以實際包裝標示為準。 |

## 常見項目數值範例

以下只是對應樣品的比較，單位均為每 100 公克可食部分；不同產地、修脂與製程會改變數值。
表中的生重、熟重不能互換，也不能直接用兩者反推固定失水率。

| 食物與狀態 | 熱量（大卡） | 蛋白質（克） | 脂肪（克） | 飽和脂肪（克） |
| --- | ---: | ---: | ---: | ---: |
| 梅花豬／上肩肉（生重、去皮） | 207 | 18.9 | 14 | 5.5 |
| 培根豬火鍋片／去皮五花（生重、未醃製） | 360 | 14.9 | 32.9 | 12.8 |
| 松阪豬／豬頸肉（生重） | 284 | 17.2 | 23.3 | 8.4 |
| 豬小里肌（生重） | 139 | 21.1 | 5.4 | 2.2 |
| 牛五花火鍋片（生重） | 430 | 15.7 | 40.3 | 20.9 |
| 牛梅花火鍋片（生重） | 120 | 20.3 | 3.7 | 1.7 |
| 去皮雞胸（肉雞、生重） | 117 | 23.3 | 1.9 | 0.6 |
| 去皮去骨雞腿（肉雞、生重） | 165 | 19.8 | 8.9 | 2.4 |
| 大西洋鮭魚生魚片（生重） | 222 | 19.6 | 15.3 | 4.1 |
| 大西洋鮭魚腹肉（生重） | 349 | 16.4 | 31 | 7.9 |
| 黑鮪魚赤身（天然、生重） | 115 | 26.4 | 1.4 | 0.25 |
| 黑鮪魚脂身（天然、生重、Toro 參考） | 308 | 20.1 | 27.5 | 5.91 |
| 肋眼牛排（煎烤熟重、含脂肪） | 271 | 24.85 | 19.02 | 8.443 |
| 肋眼牛排（煎烤熟重、僅瘦肉） | 206 | 28.11 | 10.37 | 4.2 |

## 計算與使用原則

- 所有數字以 **100 公克可食部分**為基準。熱量為大卡，蛋白質、脂肪、飽和脂肪、碳水、糖及纖維為克；鈉、鉀、鈣、鐵、鋅、維生素 C、B1、B2、B6、EPA、DHA、膽固醇為毫克；**B12 與維生素 D 為微克**。
- 新增鋅、B1、B2、B6、B12、維生素 D、EPA、DHA 共 8 個營養素定義。僅顯示來源實際提供的數字；`dv=null`，不另設定每日參考值。
- TFDA 的「糖質總量」對應總糖；「總碳水化合物」另列，不能互換。選用「熱量」欄位，不自行用 4/9 大卡重新計算，也不混用「修正熱量」。不同資料庫熱量計算法可能不同。
- 原始空白、`-` 或未列的欄位省略，記錄於 `dataNotes.missingNutrients`。MEXT 的 `Tr` 不改成零；括號推定值可用數字計算，但原標記保留在 `dataNotes.qualifiers`。
- 原始顯示零才保留零。USDA 簡表未列 EPA／DHA 時不補算，也不把資料缺失解釋成「不含」。
- 含骨排骨、戰斧、雞翅、雞爪等，請扣除不食用的骨頭。本批 `edibleRatio=1` 只適用於**已去除不可食部分**的圖形。
- `shape` 厚度與 `density=1` 為介面估重暫定值，非實測肉品密度。每片肉大小不固定，常用按鈕統一為可食部分 100 公克，建議優先秤重。
- 生肉／生魚、煎烤熟肉、燉熟肉、冷凍加工原品各自標示狀態；不以固定烹調損耗率虛構熟食數值。煎烤熟肉不宣稱是特定三分熟／五分熟。
- 只計所選肉品。醋飯、海苔、奶油、美乃滋、壽喜燒汁、麻辣湯底、油蔥、醬糖與額外用油，需另計。
- `meatDetails` 保存物種、切割或商品、計重狀態、用途、適用範圍與來源前處理描述；介紹與小撇步也說明重要差異，常見俗名與料理關鍵字可搜尋。

## 生魚片與商品名稱限制

「生」是營養資料的分析狀態，**不是生食安全認證**。可供生食的來源、寄生蟲處理、冷鏈及衛生必須另行確認；資料庫收錄冷凍干貝、魚片或生肉，不等於可直接生食。
食藥署提醒，海鮮充分加熱可降低風險；需供生食的產品須由供應與處理流程管理風險。這些提示依據[食藥署海獸胃線蟲症衛教](https://www.fda.gov.tw/tc/siteContent.aspx?sid=4603)，不是營養值來源。

雪花、霜降、和牛 A5、松阪牛、翼板、厚切、炙燒等名稱，可能涉及不同部位、等級、加工與配方，不靠名稱創造固定營養值。
「戰斧」只有對應部位的參考紀錄；「大腹／中腹」未被來源細分時也不拆成兩個虛構數值。
TFDA 樣品「鮪魚肚」未明確標成脂身切割，本批未把它直接當成 Toro。
緣側／比目魚鰭邊肉、hanger、flap 等沒有取得精確資料的品項，未冒用其他肉品數字。
注脂、重組、醃製品不直接套用原切牛肉；請依[食藥署重組肉及注脂肉說明](https://www.fda.gov.tw/TC/newsContent.aspx?cid=4&id=t600604)辨識產品並依包裝處理。

## 官方來源與版本

1. **台灣食藥署 139 筆**：[政府資料開放平臺 8543](https://data.gov.tw/dataset/8543)、[官方 CSV ZIP](https://data.fda.gov.tw/data/opendata/export/20/csv)。下載日 2026-11-11，ZIP 內為 `20_2.csv`。使用樣品整合編號精確連結營養欄位；若同部位有新取樣，優先選用明確的新樣品，不把所有年代或平均樣品重複堆入。沒有宣稱下載日就是所有樣品的檢驗日期。授權依原資料集之政府資料開放授權條款。
2. **USDA 25 筆**：[SR28 官方說明](https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/methods-and-application-of-food-composition-laboratory/mafcl-site-pages/sr11-sr28/)、[簡表 ZIP](https://www.ars.usda.gov/ARSUserFiles/80400535/DATA/SR/sr28/dnload/sr28abbr.zip)。版本為 2016 年 5 月修訂的歷史版，以 NDB 編號、修脂、等級、生熟與可分離瘦肉／脂肪條件區分。
3. **日本文部科學省 8 筆**：日本食品標準成分表（八訂）增補 2023 年；使用每筆食品編號的官方一般成分表與**可食部 100 g**脂肪酸表（MODE=4），不使用脂質 1 g 或總脂肪酸 100 g 的比例表。各 JSON 直接附兩種官方表格連結。

部位名稱參考：[農業部豬肉介紹](https://fae.moa.gov.tw/map/food_item.php?id=20&type=AS01)、[農業部牛肉教材](https://fae.moa.gov.tw/theme_data.php?id=973&sub_theme=knowledge&theme=topics)、[美國牛肉協會 flat iron 切割說明](https://www.beefitswhatsfordinner.com/cuts/cut/2716/flat-iron-steak)。這些連結用於部位與名稱解釋，沒有拿來覆寫數值。

[source snapshot](sources/meat-cuts-reference.json) 保存所用原始值、單位、樣品原名與前處理，供離線核對；每個檔案的 `sources` 可追溯原始來源。中文解說及小撇步為編輯整理，非逐字引用，也不推導疾病預防效果。

官方原始檔 SHA-256：

- TFDA ZIP：`9aeb0cdbefad3f82be9b4089f044c8d0bc087a6b7453ba96832d126ff6ea3aa1`
- USDA ZIP：`39df5c0516a7d343ffb043bb5542ab8c29f2c9998c93608e7fd3feca82ce1cef`

## 驗證

```sh
node tools/build-index.mjs
node tools/validate-meat-cuts.mjs
node tools/validate-food-expansion.mjs
```

新驗證工具逐筆檢查 172 筆的來源編號、21 種營養欄位、g／mg／微克單位、缺值、MEXT 推定值註記、唯一 id、索引與計重設定。

本次另以實際 App 函式檢查全部 172 筆份量換算與缺值處理，並以本機 Chromium 驗證 545 筆載入、10 個中英文肉類搜尋，以及鮭魚腹肉頁面 EPA／DHA／B12 與單位顯示。

## 完整新增清單

| 細分類 | 筆數 |
| --- | ---: |
| 牛肉部位 | 13 |
| 火鍋牛肉 | 4 |
| 羊肉部位與火鍋 | 8 |
| 豬肉部位與火鍋 | 22 |
| 內臟與滷味原料 | 23 |
| 雞肉部位 | 24 |
| 鴨鵝與其他禽肉 | 20 |
| 生魚片與水產部位 | 14 |
| 加工肉與火鍋料 | 11 |
| 牛排館部位與熟肉 | 25 |
| 生魚片魚種與脂肪部位 | 8 |

| 食物 | 來源 | 原始編號 | 生熟／計重狀態 |
| --- | --- | --- | --- |
| [去骨牛小排（生重）](items/tw-beef-short-rib.json) | TFDA | I0100101 | 生重 |
| [帶骨牛小排（生重、去骨可食肉）](items/tw-beef-bone-in-short-rib.json) | TFDA | I0100102 | 生重 |
| [牛肋條（生重、2021 年取樣）](items/tw-beef-rib-finger.json) | TFDA | I0100202 | 生重 |
| [肋眼／台式沙朗牛排（生重）](items/tw-beef-ribeye.json) | TFDA | I0100301 | 生重 |
| [板腱牛排（生重）](items/tw-beef-top-blade.json) | TFDA | I0102101 | 生重 |
| [牛去骨肩胛小排（生重）](items/tw-beef-chuck-short-rib.json) | TFDA | I0102201 | 生重 |
| [牛前胸肉／牛腩（生重）](items/tw-beef-brisket.json) | TFDA | I0104101 | 生重 |
| [修清牛前胸肉（生重）](items/tw-beef-trimmed-brisket.json) | TFDA | I0104201 | 生重 |
| [紐約客牛排（生重）](items/tw-beef-striploin.json) | TFDA | I0106101 | 生重 |
| [菲力牛排（生重、美牛 2025 年樣品）](items/tw-beef-tenderloin.json) | TFDA | I0106202 | 生重 |
| [牛後腿肉（生重）](items/tw-beef-round.json) | TFDA | I0108101 | 生重 |
| [牛和尚頭（生重）](items/tw-beef-knuckle.json) | TFDA | I0108201 | 生重 |
| [牛腱子心（生重、2022 年取樣）](items/tw-beef-shank.json) | TFDA | I0108302 | 生重 |
| [牛五花火鍋片（生重）](items/tw-hotpot-beef-plate.json) | TFDA | I0110101 | 生重 |
| [紐約客牛火鍋片（生重）](items/tw-hotpot-beef-strip.json) | TFDA | I0110102 | 生重 |
| [牛梅花火鍋片（生重）](items/tw-hotpot-beef-chuck.json) | TFDA | I0110103 | 生重 |
| [嫩肩里肌牛火鍋片（生重）](items/tw-hotpot-beef-shoulder.json) | TFDA | I0110104 | 生重 |
| [山羊帶皮肉塊（生重）](items/tw-goat-skin-on.json) | TFDA | I0200101 | 生重 |
| [山羊前腿肉片（生重）](items/tw-goat-foreleg.json) | TFDA | I0200201 | 生重 |
| [山羊後腿火鍋片（生重）](items/tw-goat-hindleg-hotpot.json) | TFDA | I0200301 | 生重 |
| [綿羊肉切片（生重）](items/tw-lamb-slices.json) | TFDA | I0210101 | 生重 |
| [法式羊排（生重、可食肉）](items/tw-lamb-rack.json) | TFDA | I0210201 | 生重 |
| [綿羊肩頸眼肉（生重、去骨）](items/tw-lamb-shoulder-neck.json) | TFDA | I0210301 | 生重 |
| [小羊腰脊肉（生重、去骨）](items/tw-lamb-loin.json) | TFDA | I0210401 | 生重 |
| [綿羊五花火鍋片（生重）](items/tw-lamb-belly-hotpot.json) | TFDA | I0210501 | 生重 |
| [豬前腿下肩肉（生重、去皮）](items/tw-pork-lower-shoulder.json) | TFDA | I0300102 | 生重 |
| [豬前腿瘦肉（生重）](items/tw-pork-lean-foreleg.json) | TFDA | I0300201 | 生重 |
| [梅花豬／上肩肉（生重、去皮）](items/tw-pork-collar.json) | TFDA | I0300301 | 生重 |
| [豬胛心肉（生重、去皮）](items/tw-pork-shoulder.json) | TFDA | I0300401 | 生重 |
| [豬肩胛排（生重、去骨）](items/tw-pork-shoulder-chop.json) | TFDA | I0300502 | 生重 |
| [豬前腿外腱（生重）](items/tw-pork-fore-shank.json) | TFDA | I0300601 | 生重 |
| [豬後腿外腱（生重）](items/tw-pork-hind-shank.json) | TFDA | I0302101 | 生重 |
| [豬後腿肉（生重、去皮）](items/tw-pork-hindleg.json) | TFDA | I0302202 | 生重 |
| [豬後腿瘦肉（生重）](items/tw-pork-lean-hindleg.json) | TFDA | I0302301 | 生重 |
| [豬大里肌（生重）](items/tw-pork-loin.json) | TFDA | I0304101 | 生重 |
| [豬大排（生重、去骨可食肉）](items/tw-pork-loin-chop.json) | TFDA | I0304201 | 生重 |
| [豬里肌小排（生重、去骨可食肉）](items/tw-pork-back-ribs.json) | TFDA | I0304301 | 生重 |
| [豬僧帽肌（生重）](items/tw-pork-trapezius.json) | TFDA | I0304401 | 生重 |
| [豬小里肌（生重）](items/tw-pork-tenderloin.json) | TFDA | I0306101 | 生重 |
| [培根豬火鍋片／去皮五花（生重、未醃製）](items/tw-pork-belly-skinless.json) | TFDA | I0308101 | 生重 |
| [帶皮五花豬（生重）](items/tw-pork-belly-skin-on.json) | TFDA | I0308201 | 生重 |
| [豬腹脅排（生重、去軟骨）](items/tw-pork-spare-ribs.json) | TFDA | I0308301 | 生重 |
| [豬肝連（生重）](items/tw-pork-diaphragm.json) | TFDA | I0310101 | 生重 |
| [豬頰肉／菊花肉（生重）](items/tw-pork-cheek.json) | TFDA | I0310202 | 生重 |
| [松阪豬／豬頸肉（生重）](items/tw-pork-jowl.json) | TFDA | I0310301 | 生重 |
| [豬絞肉（70% 瘦肉率、生重）](items/tw-ground-pork-70.json) | TFDA | I0310401 | 生重 |
| [豬絞肉（90% 瘦肉率、生重）](items/tw-ground-pork-90.json) | TFDA | I0310402 | 生重 |
| [牛瘤胃（生重）](items/tw-beef-rumen.json) | TFDA | I0120101 | 生重 |
| [牛蜂巢肚（生重）](items/tw-beef-honeycomb-tripe.json) | TFDA | I0120201 | 生重 |
| [牛筋（生重）](items/tw-beef-tendon.json) | TFDA | I0120301 | 生重 |
| [豬心（生重）](items/tw-pork-heart-raw.json) | TFDA | I0320101 | 生重 |
| [豬白管（生重）](items/tw-pork-aorta.json) | TFDA | I0320201 | 生重 |
| [豬皮（生重）](items/tw-pork-skin.json) | TFDA | I0320301 | 生重 |
| [豬耳（生重）](items/tw-pork-ear.json) | TFDA | I0320401 | 生重 |
| [豬舌（生重）](items/tw-pork-tongue-raw.json) | TFDA | I0320501 | 生重 |
| [豬血（來源生樣品）](items/tw-pork-blood.json) | TFDA | I0320601 | 生重 |
| [豬尾（生重、去骨）](items/tw-pork-tail.json) | TFDA | I0320701 | 生重 |
| [豬肝（生重）](items/tw-pork-liver-raw.json) | TFDA | I0320801 | 生重 |
| [豬肚（生重）](items/tw-pork-stomach.json) | TFDA | I0321101 | 生重 |
| [豬肚（水煮熟重）](items/tw-pork-stomach-boiled.json) | TFDA | I0321201 | 熟重 |
| [豬軟骨（生重、帶部分肉）](items/tw-pork-cartilage.json) | TFDA | I0321501 | 生重 |
| [豬腰子（生重）](items/tw-pork-kidney-raw.json) | TFDA | I0321601 | 生重 |
| [豬脾臟（生重）](items/tw-pork-spleen.json) | TFDA | I0321701 | 生重 |
| [豬大腸（生重）](items/tw-pork-large-intestine.json) | TFDA | I0321801 | 生重 |
| [豬小腸（生重）](items/tw-pork-small-intestine.json) | TFDA | I0321901 | 生重 |
| [豬粉腸（生重）](items/tw-pork-jejunum.json) | TFDA | I0322001 | 生重 |
| [豬前腳（生重、去骨）](items/tw-pork-front-foot.json) | TFDA | I0322101 | 生重 |
| [豬後腳（生重、去骨）](items/tw-pork-hind-foot.json) | TFDA | I0322201 | 生重 |
| [豬蹄膀（生重、去骨含皮）](items/tw-pork-hock.json) | TFDA | I0322301 | 生重 |
| [豬腳筋（生重）](items/tw-pork-tendon.json) | TFDA | I0322501 | 生重 |
| [土雞（生重、去骨可食肉）](items/tw-native-chicken.json) | TFDA | I0400101 | 生重 |
| [肉雞（生重、去骨可食肉）](items/tw-broiler-chicken.json) | TFDA | I0400201 | 生重 |
| [烏骨雞（生重、去骨可食肉）](items/tw-silkie.json) | TFDA | I0400301 | 生重 |
| [雞里肌（肉雞、生重）](items/tw-chicken-tenderloin.json) | TFDA | I0402102 | 生重 |
| [帶皮雞胸（肉雞、生重、去骨）](items/tw-chicken-breast-skin-on.json) | TFDA | I0402301 | 生重 |
| [去皮土雞胸（生重）](items/tw-native-chicken-breast.json) | TFDA | I0402401 | 生重 |
| [去皮雞胸（肉雞、生重）](items/tw-broiler-chicken-breast.json) | TFDA | I0402402 | 生重 |
| [土雞骨腿（生重、去骨可食肉）](items/tw-native-chicken-leg.json) | TFDA | I0404101 | 生重 |
| [肉雞骨腿（生重、去骨可食肉）](items/tw-broiler-chicken-leg.json) | TFDA | I0404102 | 生重 |
| [雞棒棒腿（肉雞、生重、去骨）](items/tw-chicken-drumstick.json) | TFDA | I0404302 | 生重 |
| [雞腿排（肉雞、生重、去骨）](items/tw-chicken-thigh-steak.json) | TFDA | I0404403 | 生重 |
| [去皮去骨雞腿（肉雞、生重）](items/tw-skinless-chicken-thigh.json) | TFDA | I0404501 | 生重 |
| [雞二節翅（肉雞、生重、去骨含皮）](items/tw-chicken-wing-two-joint.json) | TFDA | I0406102 | 生重 |
| [雞三節翅（肉雞、生重、去骨含皮）](items/tw-chicken-wing-three-joint.json) | TFDA | I0406203 | 生重 |
| [雞翅腿（生重、去骨含皮）](items/tw-chicken-wing-drumette.json) | TFDA | I0406301 | 生重 |
| [雞絞肉（生重）](items/tw-ground-chicken.json) | TFDA | I0410101 | 生重 |
| [雞心（肉雞、生重）](items/tw-chicken-heart-raw.json) | TFDA | I0420102 | 生重 |
| [雞尾椎（生重、去骨）](items/tw-chicken-tail.json) | TFDA | I0420201 | 生重 |
| [雞肝（肉雞、生重）](items/tw-chicken-liver-raw.json) | TFDA | I0420301 | 生重 |
| [雞胗（肉雞、生重）](items/tw-chicken-gizzard-raw.json) | TFDA | I0420401 | 生重 |
| [雞佛（生重）](items/tw-chicken-testicle.json) | TFDA | I0420701 | 生重 |
| [雞腳（肉雞、生重、去骨）](items/tw-chicken-feet.json) | TFDA | I0420801 | 生重 |
| [雞膝軟骨（生重）](items/tw-chicken-knee-cartilage.json) | TFDA | I0420901 | 生重 |
| [雞皮（肉雞、生重）](items/tw-chicken-skin.json) | TFDA | I0421001 | 生重 |
| [太空鴨（生重、去骨）](items/tw-mule-duck.json) | TFDA | I0500101 | 生重 |
| [番鴨（生重、去骨）](items/tw-muscovy-duck.json) | TFDA | I0500201 | 生重 |
| [土番鴨（生重、去皮去骨）](items/tw-skinless-mule-duck.json) | TFDA | I0500401 | 生重 |
| [櫻桃鴨胸（生重）](items/tw-duck-breast.json) | TFDA | I0502101 | 生重 |
| [鴨腿（生重、去骨）](items/tw-duck-leg.json) | TFDA | I0504101 | 生重 |
| [鴨血（來源生樣品）](items/tw-duck-blood.json) | TFDA | I0520101 | 生重 |
| [鴨胗（生重）](items/tw-duck-gizzard.json) | TFDA | I0520201 | 生重 |
| [鴨掌（生重、去骨）](items/tw-duck-feet.json) | TFDA | I0520301 | 生重 |
| [鴨腸（生重）](items/tw-duck-intestine.json) | TFDA | I0520401 | 生重 |
| [鴨翅（生重、去骨）](items/tw-duck-wing.json) | TFDA | I0520601 | 生重 |
| [鴨舌（生重、去骨）](items/tw-duck-tongue.json) | TFDA | I0520801 | 生重 |
| [鵝肉（生重、去骨含皮）](items/tw-goose-skin-on.json) | TFDA | I0600101 | 生重 |
| [鵝胸（生重、去皮）](items/tw-goose-breast.json) | TFDA | I0602101 | 生重 |
| [鵝腿（生重、去皮去骨）](items/tw-goose-leg.json) | TFDA | I0604101 | 生重 |
| [鵝心（生重）](items/tw-goose-heart.json) | TFDA | I0620101 | 生重 |
| [鵝肝（生重）](items/tw-goose-liver.json) | TFDA | I0620201 | 生重 |
| [鵝胗（生重）](items/tw-goose-gizzard.json) | TFDA | I0620301 | 生重 |
| [鵝腸（生重）](items/tw-goose-intestine.json) | TFDA | I0620401 | 生重 |
| [火雞肉（生重、去骨含皮）](items/tw-turkey-meat.json) | TFDA | I0700101 | 生重 |
| [山豬肉片（生重）](items/tw-wild-boar-slices.json) | TFDA | I1000101 | 生重 |
| [大西洋鮭魚生魚片（生重）](items/tw-salmon-sashimi.json) | TFDA | J0402404 | 生重 |
| [大西洋鮭魚腹肉（生重）](items/tw-salmon-belly.json) | TFDA | J0402405 | 生重 |
| [大西洋鮭魚中段（生重、去皮）](items/tw-salmon-middle.json) | TFDA | J0402402 | 生重 |
| [大西洋鮭魚尾段（生重、去皮）](items/tw-salmon-tail.json) | TFDA | J0402403 | 生重 |
| [鮪魚生魚片（生重、來源未細分魚種）](items/tw-tuna-sashimi.json) | TFDA | J0414601 | 生重 |
| [海鱺魚片（生重、去皮）](items/tw-cobia-fillet.json) | TFDA | J0406602 | 生重 |
| [紅甘／杜氏鰤（生重、含皮）](items/tw-greater-amberjack.json) | TFDA | J0407201 | 生重 |
| [日本竹筴魚（生重、去皮）](items/tw-japanese-horse-mackerel.json) | TFDA | J0406901 | 生重 |
| [真鯛（生重、去皮、1 月樣品）](items/tw-red-seabream.json) | TFDA | J0409901 | 生重 |
| [台灣鯛魚片（生重、2021 年樣品）](items/tw-tilapia-fillet.json) | TFDA | J0412003 | 生重 |
| [鰈魚切片（生重、去皮）](items/tw-flatfish-fillet.json) | TFDA | J0415701 | 生重 |
| [干貝（冷凍原品）](items/tw-frozen-scallop.json) | TFDA | J3200101 | 冷凍原品 |
| [花枝／真烏賊（大型、生重）](items/tw-cuttlefish.json) | TFDA | J3500101 | 生重 |
| [章魚（小型、生重）](items/tw-octopus-raw.json) | TFDA | J3500201 | 生重 |
| [加工培根（未烹調原品）](items/tw-cured-bacon.json) | TFDA | R5100801 | 加工原品 |
| [台式豬肉香腸（生重）](items/tw-taiwanese-sausage.json) | TFDA | R5300201 | 加工原品 |
| [蒜味台式香腸（生重）](items/tw-garlic-sausage.json) | TFDA | R5300202 | 加工原品 |
| [貢丸（冷凍原品）](items/tw-pork-meatballs.json) | TFDA | R5400201 | 加工原品 |
| [虱目魚丸（冷凍原品）](items/tw-milkfish-balls.json) | TFDA | R6100201 | 加工原品 |
| [旗魚丸（冷凍原品）](items/tw-swordfish-balls.json) | TFDA | R6100401 | 加工原品 |
| [魚餃（冷凍原品）](items/tw-fish-dumpling.json) | TFDA | R6600501 | 加工原品 |
| [燕餃（冷凍原品）](items/tw-swallow-dumpling.json) | TFDA | R6600701 | 加工原品 |
| [蟹味棒（冷凍原品）](items/tw-crab-stick.json) | TFDA | R6700101 | 加工原品 |
| [魚板（調理原品）](items/tw-fish-cake.json) | TFDA | R6700301 | 加工原品 |
| [醃漬鮭魚卵（原品）](items/tw-marinated-salmon-roe.json) | TFDA | R7500901 | 加工原品 |
| [肋眼牛排（煎烤熟重、含脂肪）](items/us-beef-ribeye-grilled.json) | USDA | 23227 | 熟重 |
| [帶骨肋眼／戰斧牛排（生重、去骨可食肉）](items/us-beef-bone-in-ribeye-raw.json) | USDA | 23193 | 生重 |
| [紐約客牛排（烤熟重、含脂肪）](items/us-beef-strip-grilled.json) | USDA | 13910 | 熟重 |
| [菲力牛排（烤熟重、含脂肪）](items/us-beef-filet-broiled.json) | USDA | 13918 | 熟重 |
| [丁骨牛排（生重、去骨可食肉）](items/us-beef-tbone-raw.json) | USDA | 23005 | 生重 |
| [丁骨牛排（烤熟重、含脂肪）](items/us-beef-tbone-broiled.json) | USDA | 13473 | 熟重 |
| [紅屋牛排（生重、去骨可食肉）](items/us-beef-porterhouse-raw.json) | USDA | 23001 | 生重 |
| [紅屋牛排（烤熟重、含脂肪）](items/us-beef-porterhouse-grilled.json) | USDA | 23002 | 熟重 |
| [肩胛眼牛排（生重、含脂肪）](items/us-beef-chuck-eye-raw.json) | USDA | 23143 | 生重 |
| [肩胛眼牛排（煎烤熟重、含脂肪）](items/us-beef-chuck-eye-grilled.json) | USDA | 23140 | 熟重 |
| [板腱牛排（煎烤熟重、含脂肪）](items/us-beef-top-blade-grilled.json) | USDA | 13598 | 熟重 |
| [肩胛牛小排（燉熟重、含脂肪）](items/us-beef-chuck-short-rib-braised.json) | USDA | 23125 | 熟重 |
| [上後腰脊牛排（生重、含脂肪）](items/us-beef-top-sirloin-raw.json) | USDA | 13929 | 生重 |
| [上後腰脊牛排（烤熟重、含脂肪）](items/us-beef-top-sirloin-broiled.json) | USDA | 13930 | 熟重 |
| [三角臀肉牛排（生重、含脂肪）](items/us-beef-tritip-raw.json) | USDA | 13954 | 生重 |
| [三角臀肉（烤熟重、含脂肪）](items/us-beef-tritip-roasted.json) | USDA | 13953 | 熟重 |
| [內裙邊牛排（生重、僅瘦肉）](items/us-beef-inside-skirt-raw.json) | USDA | 23163 | 生重 |
| [內裙邊牛排（烤熟重、僅瘦肉）](items/us-beef-inside-skirt-broiled.json) | USDA | 13977 | 熟重 |
| [外裙邊牛排（生重、僅瘦肉）](items/us-beef-outside-skirt-raw.json) | USDA | 23169 | 生重 |
| [外裙邊牛排（烤熟重、僅瘦肉）](items/us-beef-outside-skirt-broiled.json) | USDA | 13979 | 熟重 |
| [腹脅牛排（生重、含脂肪）](items/us-beef-flank-raw.json) | USDA | 13970 | 生重 |
| [腹脅牛排（烤熟重、含脂肪）](items/us-beef-flank-broiled.json) | USDA | 13948 | 熟重 |
| [肋眼牛排（生重、僅瘦肉）](items/us-beef-ribeye-lean-raw.json) | USDA | 23175 | 生重 |
| [肋眼牛排（煎烤熟重、僅瘦肉）](items/us-beef-ribeye-lean-grilled.json) | USDA | 23174 | 熟重 |
| [菲力牛排（烤熟重、僅瘦肉）](items/us-beef-filet-lean-broiled.json) | USDA | 23600 | 熟重 |
| [黑鮪魚赤身（天然、生重）](items/jp-bluefin-akami.json) | MEXT | 10253 | 生重 |
| [黑鮪魚脂身（天然、生重、Toro 參考）](items/jp-bluefin-toro-wild.json) | MEXT | 10254 | 生重 |
| [黑鮪魚脂身（養殖、生重）](items/jp-bluefin-toro-farmed.json) | MEXT | 10459 | 生重 |
| [大目鮪赤身（生重）](items/jp-bigeye-akami.json) | MEXT | 10425 | 生重 |
| [大目鮪脂身（生重）](items/jp-bigeye-fatty.json) | MEXT | 10426 | 生重 |
| [青甘／鰤魚（養殖幼魚、去皮生重）](items/jp-hamachi-sashimi.json) | MEXT | 10411 | 生重 |
| [紅甘／勘八（生重、三片分切魚肉）](items/jp-kanpachi-fillet.json) | MEXT | 10108 | 生重 |
| [紅甘／勘八背側肉（生重）](items/jp-kanpachi-back.json) | MEXT | 10424 | 生重 |
