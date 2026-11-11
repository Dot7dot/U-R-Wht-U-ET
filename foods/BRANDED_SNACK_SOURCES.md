# 品牌零食：來源與整理說明

本批新增 414 筆**含品牌名稱**的市售包裝零食（洋芋片、玉米點心、餅乾、糖果、巧克力、堅果、肉乾海苔、點心麵等），
分類為「品牌零食」，檔名以 `bs-` 開頭，共 120 個品牌。

## 資料來源

數值是通路商品頁以文字刊載的**包裝營養標示**，於 2026-11-11 擷取：

| 通路 | 筆數 |
| --- | ---: |
| PChome 24h購物 | 319 |
| 萬家福線上購物（原家樂福線上購物） | 95 |

每筆 JSON 的 `sources` 記錄商品頁網址、通路商品編號與原始商品名稱。
[sources/branded-snacks-2026.jsonl](sources/branded-snacks-2026.jsonl) 保存每筆擷取到的每份與每 100 公克標示值。
可執行 `node tools/validate-branded-snacks.mjs` 離線核對。

## 重要限制

- **這不是完整的超商零食清單。** 只有商品頁「以文字刊載營養標示」的商品才收得進來；多數廠商只放標示圖片，這些無法自動讀取。
  因此部分常見品牌只有少數品項或完全沒有。
- 數值來自通路商品頁，不是直接向廠商取得；配方或包裝改版後可能與手上的包裝不同，**請以實際包裝為準**。
- 同一商品的不同包裝規格（箱購、量販包）只保留一筆；綜合包、禮盒、多口味組合不收錄。

## 整理原則

1. 每 100 公克。欄位：熱量、蛋白質、脂肪、飽和脂肪、碳水化合物、糖、膳食纖維（有標才有）、鈉。標示沒有的欄位省略，不以零代填。
2. 包裝只標「每份」的 117 筆，每 100 公克是依每份重量換算並四捨五入，`dataNotes.derivedFromServing` 為 `true`。
3. 反式脂肪不在 App 的營養素清單內，放在 `labelExtras.transFat`；大於 0 時會出現在亮點與注意事項。
4. 自動檢查：熱量須與「4×蛋白質＋9×脂肪＋4×碳水化合物」相差 15%（或 20 大卡）以內、飽和脂肪不大於脂肪、糖不大於碳水化合物；不通過的不收錄
   （含糖醇的口香糖因此多數未收錄）。
5. `highlights` 與 `cautions` 只依標示數值與標示過敏原產生，門檻為每 100 公克：鈉 ≥600 毫克（高鈉）、糖 ≥22.5 公克（高糖）、
   飽和脂肪 ≥5 公克（高飽和脂肪）、脂肪 ≥17.5 公克（高脂）、蛋白質 ≥12 公克、膳食纖維 ≥6 公克。
   高鈉、高糖、高脂、高飽和脂肪採英國食品標準局紅燈門檻，屬一般性提醒，不是醫療建議；`benefits` 保留空陣列。
6. `ingredients`、`allergens` 為商品頁刊載的成分與過敏原文字（有刊載才有）。
7. `serving` 採包裝標示的每份重量；`shape`、`density` 為依零食型態編輯估計的介面估重設定，非實測值。

## 細分類

| 細分類 | 筆數 |
| --- | ---: |
| 餅乾 | 86 |
| 糖果口香糖 | 73 |
| 堅果瓜子 | 48 |
| 肉乾海苔豆乾 | 46 |
| 洋芋片 | 38 |
| 巧克力 | 37 |
| 玉米與穀物點心 | 27 |
| 米果 | 21 |
| 點心麵 | 15 |
| 果乾蜜餞 | 12 |
| 蛋糕甜點 | 11 |

## 品牌與筆數

湖池屋（25）、義美（21）、惠香（21）、新東陽（20）、Loacker（19）、巧益（16）、每日優果（14）、樂天（12）、Tohato（12）、旺旺（11）、盛香珍（10）、中祥（7）、統一（6）、順便幸福（6）、珍珍（6）、雷比特（6）、Calbee（6）、Befco（6）、自然優（5）、嘉義福義軒（5）、OYATSU（5）、龜田（5）、老楊（4）、華元（4）、健康日誌（4）、垂坤（4）、北田（4）、樺達（4）、丸川（4）、韓味不二（4）、卡迪那（3）、乖乖（3）、上好佳（3）、利口樂（3）、AJIDOU（3）、海龍王（3）、安堡（3）、同正（3）、不二家（3）、麥維他（3）、UHA（3）、森永（3）、Nobel（3）、義美生機（2）、可口（2）、維力（2）、味王（2）、OREO（2）、良澔（2）、健達（2）、TOBLERONE 瑞士三角（2）、樂事（2）、孔雀（2）、卡滋（2）、麗紳和春堂（2）、北海（2）、九福（2）、77乳加（2）、Cachet（2）、曼陀珠（2）、YBC（2）、宮田（2）、Ribon（2）、Bourbon（2）、Nestle（2）、卡賀（1）、聯華食品（1）、浪味仙（1）、小林煎餅（1）、冠昇（1）、ㄋㄟㄋㄟ補給站（1）、Pocky百奇（1）、Nutella 能多益（1）、麗滋（1）、TATAWA（1）、麗巧克（1）、麗芝士Nabati（1）、元本山（1）、橘平屋（1）、立夢（1）、BF（1）、skittles（1）、蜜意坊（1）、M&M's（1）、士力架（1）、洽洽（1）、萬歲牌（1）、多力多滋（1）、青龍牌（1）、恰好（1）、Ruffles（1）、茶鼎天（1）、SanYeh（1）、美可（1）、日日旺（1）、福伯（1）、御之味（1）、Yupi（1）、老中醫（1）、奇多（1）、易而安（1）、黑師傅（1）、喜笑花生（1）、前田（1）、Dupont（1）、可康（1）、秋山製菓（1）、Himalaya（1）、SOYJOY（1）、CROWN（1）、道南（1）、加藤產業（1）、Enaak（1）、Kanro（1）、ORIHIRO（1）、船岡（1）、Vilson（1）、張君雅（1）、有田製果（1）、吳啟魯（1）

## 完整清單

| 檔案 | 名稱 | 細分類 | 通路 | 每份換算 |
| --- | --- | --- | --- | --- |
| [items/bs-pc-dbacd6-a900hidj4.json](items/bs-pc-dbacd6-a900hidj4.json) | 77乳加 77巧菲斯 | 巧克力 | PChome | 是 |
| [items/bs-pc-dbacd6-a900hidj5.json](items/bs-pc-dbacd6-a900hidj5.json) | 77乳加 77迷你新貴派 | 巧克力 | PChome | 是 |
| [items/bs-pc-dbacgb-a900ainhl.json](items/bs-pc-dbacgb-a900ainhl.json) | AJIDOU 味道 天-昆布 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac1q-a38444517.json](items/bs-pc-dbac1q-a38444517.json) | AJIDOU 味道 玉米棒 | 洋芋片 | PChome | 是 |
| [items/bs-pc-dbae63-a54464122.json](items/bs-pc-dbae63-a54464122.json) | AJIDOU 味道 玉米棒-香辣 | 玉米與穀物點心 | PChome | 是 |
| [items/bs-cf-1422014000101.json](items/bs-cf-1422014000101.json) | BF海鹽檸檬糖 | 糖果口香糖 | 萬家福 |  |
| [items/bs-pc-dbaek6-a900khmca.json](items/bs-pc-dbaek6-a900khmca.json) | Befco 栗山 寶貝怪獸星星米果 | 米果 | PChome |  |
| [items/bs-pc-dbaek6-a900kne80.json](items/bs-pc-dbaek6-a900kne80.json) | Befco 栗山 月亮米果-月見漢堡排風味 | 米果 | PChome |  |
| [items/bs-pc-dbaek6-a900kne49.json](items/bs-pc-dbaek6-a900kne49.json) | Befco 栗山 月亮米果-番薯風味 | 米果 | PChome |  |
| [items/bs-pc-dbaek6-a900jhled.json](items/bs-pc-dbaek6-a900jhled.json) | Befco 栗山 瀨戶汐揚仙貝-柚子鹽風味 | 米果 | PChome |  |
| [items/bs-pc-dbaek6-a900khmd6.json](items/bs-pc-dbaek6-a900khmd6.json) | Befco 栗山 群星瀨戶汐揚米果蝦風味 | 米果 | PChome |  |
| [items/bs-pc-dbaek6-a900hojfz.json](items/bs-pc-dbaek6-a900hojfz.json) | Befco 栗山 麵包超人米果 | 米果 | PChome |  |
| [items/bs-pc-dbaek6-a900k9e6r.json](items/bs-pc-dbaek6-a900k9e6r.json) | Bourbon 北日本 辛辣風味洋芋片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900k2s7a.json](items/bs-pc-dbaek6-a900k2s7a.json) | Bourbon 北日本 雞汁風味洋芋片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaef4-a900g1phs.json](items/bs-pc-dbaef4-a900g1phs.json) | CROWN 皇冠 原味蘇打餅乾 | 餅乾 | PChome |  |
| [items/bs-pc-dbaecz-a900bty94.json](items/bs-pc-dbaecz-a900bty94.json) | Cachet 凱薩90%巧克力 | 巧克力 | PChome | 是 |
| [items/bs-pc-dbaecz-a900i2kli.json](items/bs-pc-dbaecz-a900i2kli.json) | Cachet 凱薩鹽烤玉米夾心牛奶巧克力 | 巧克力 | PChome | 是 |
| [items/bs-pc-dbaek6-a900kkh1q.json](items/bs-pc-dbaek6-a900kkh1q.json) | Calbee miino黑胡椒風味蠶豆 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbaek6-a900knkhi.json](items/bs-pc-dbaek6-a900knkhi.json) | Calbee 卡樂先生4連黑胡椒風味堅脆洋芋片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900jghgn.json](items/bs-pc-dbaek6-a900jghgn.json) | Calbee 卡樂先生濃厚起司風味洋芋片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900j5n00.json](items/bs-pc-dbaek6-a900j5n00.json) | Calbee 卡樂先生雞汁風味洋芋片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900k9e5c.json](items/bs-pc-dbaek6-a900k9e5c.json) | Calbee 堅脆洋芋片-蔥鹽味 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaeed-a900heqfx.json](items/bs-pc-dbaeed-a900heqfx.json) | Calbee 堅脆洋芋片-黑胡椒風味 | 洋芋片 | PChome |  |
| [items/bs-pc-dbae7b-a90087fe5.json](items/bs-pc-dbae7b-a90087fe5.json) | Dupont 法國多朋果汁軟糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900jl8du.json](items/bs-pc-dbaek6-a900jl8du.json) | Enaak 小雞麵 SEAHWA 燒烤微辣點心麵 | 點心麵 | PChome |  |
| [items/bs-pc-dbaeeo-a900j598l.json](items/bs-pc-dbaeeo-a900j598l.json) | Himalaya 喜馬拉雅 BF薄荷岩鹽檸檬糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900kbppa.json](items/bs-pc-dbaek6-a900kbppa.json) | Kanro 甘樂 葡萄蘇打風味棉花糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbae65-a9009so87.json](items/bs-pc-dbae65-a9009so87.json) | Loacker 方角哈斯餅(抹茶味) | 餅乾 | PChome |  |
| [items/bs-pc-dbaea0-a900jbryf.json](items/bs-pc-dbaea0-a900jbryf.json) | Loacker 義大利萊佳單片雙倍可可哈斯餅 | 巧克力 | PChome |  |
| [items/bs-pc-dbae7b-a46761172.json](items/bs-pc-dbae7b-a46761172.json) | Loacker 萊佳單片可可哈斯餅 | 巧克力 | PChome |  |
| [items/bs-pc-dbae7b-a46761978.json](items/bs-pc-dbae7b-a46761978.json) | Loacker 萊佳單片榛果哈斯餅 | 餅乾 | PChome |  |
| [items/bs-pc-dbae7b-a46761118.json](items/bs-pc-dbae7b-a46761118.json) | Loacker 萊佳單片牛奶哈斯餅 | 餅乾 | PChome |  |
| [items/bs-pc-dbae65-a900k4nn7.json](items/bs-pc-dbae65-a900k4nn7.json) | Loacker 萊佳單片草莓哈斯餅 | 餅乾 | PChome |  |
| [items/bs-pc-dbae7b-a46762010.json](items/bs-pc-dbae7b-a46762010.json) | Loacker 萊佳單片香草哈斯餅 | 餅乾 | PChome |  |
| [items/bs-pc-dbae7b-a47120257.json](items/bs-pc-dbae7b-a47120257.json) | Loacker 萊佳單片黑巧克力哈斯餅 | 巧克力 | PChome |  |
| [items/bs-pc-dbaea0-a900i8znt.json](items/bs-pc-dbaea0-a900i8znt.json) | Loacker 萊佳方角哈斯餅 | 餅乾 | PChome |  |
| [items/bs-pc-dbae60-a46454263.json](items/bs-pc-dbae60-a46454263.json) | Loacker 萊佳方角哈斯餅(巧克力味) | 巧克力 | PChome |  |
| [items/bs-pc-dbae60-a47291096.json](items/bs-pc-dbae60-a47291096.json) | Loacker 萊佳方角哈斯餅(提拉米蘇味) | 餅乾 | PChome |  |
| [items/bs-pc-dbaea0-a900and8d.json](items/bs-pc-dbaea0-a900and8d.json) | Loacker 萊佳方角哈斯餅(椰子味) | 餅乾 | PChome |  |
| [items/bs-pc-dbac1n-a36284656.json](items/bs-pc-dbac1n-a36284656.json) | Loacker 萊佳方角哈斯餅(檸檬味) | 餅乾 | PChome |  |
| [items/bs-pc-dbae60-a56645235.json](items/bs-pc-dbae60-a56645235.json) | Loacker 萊佳方角哈斯餅(義式濃縮咖啡味) | 餅乾 | PChome |  |
| [items/bs-pc-dbae65-a900fd2s9.json](items/bs-pc-dbae65-a900fd2s9.json) | Loacker 萊佳方角哈斯餅(花生醬) | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbae65-a900k4ou7.json](items/bs-pc-dbae65-a900k4ou7.json) | Loacker 萊佳方角哈斯餅(草莓味) | 餅乾 | PChome |  |
| [items/bs-pc-dbae7b-a9008v0z8.json](items/bs-pc-dbae7b-a9008v0z8.json) | Loacker 萊佳方角哈斯餅(藍莓優格味) | 餅乾 | PChome |  |
| [items/bs-pc-dbac1n-a36282843.json](items/bs-pc-dbac1n-a36282843.json) | Loacker 萊佳方角哈斯餅(香草味) | 餅乾 | PChome |  |
| [items/bs-pc-dbac1n-a36281057.json](items/bs-pc-dbac1n-a36281057.json) | Loacker 萊佳方角哈斯餅(黑巧克力味) | 巧克力 | PChome |  |
| [items/bs-cf-1423018500101.json](items/bs-cf-1423018500101.json) | M&M's牛奶巧克力樂享包 | 巧克力 | 萬家福 | 是 |
| [items/bs-pc-dbaek6-a900knkgp.json](items/bs-pc-dbaek6-a900knkgp.json) | Nestle 雀巢 KitKat可可風味餅乾 | 巧克力 | PChome |  |
| [items/bs-pc-dbaek6-a900knkge.json](items/bs-pc-dbaek6-a900knkge.json) | Nestle 雀巢 KitKat橘子可可風味餅乾 | 巧克力 | PChome |  |
| [items/bs-pc-dbaek6-a900knkip.json](items/bs-pc-dbaek6-a900knkip.json) | Nobel 爽口白桃風味軟糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900knkhm.json](items/bs-pc-dbaek6-a900knkhm.json) | Nobel 男梅軟糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900knkis.json](items/bs-pc-dbaek6-a900knkis.json) | Nobel 葡萄風味軟糖 | 糖果口香糖 | PChome |  |
| [items/bs-cf-1412006800101.json](items/bs-cf-1412006800101.json) | Nutella 能多益 能多益餅乾 | 餅乾 | 萬家福 | 是 |
| [items/bs-pc-dbaehm-a900k2is5.json](items/bs-pc-dbaehm-a900k2is5.json) | OREO 奧利奧三明治餅乾_BTS聯名_原味香草口味 | 餅乾 | PChome |  |
| [items/bs-cf-1412107400101.json](items/bs-cf-1412107400101.json) | OREO 奧利奧夾心餅乾-原味 | 餅乾 | 萬家福 |  |
| [items/bs-pc-dbaek6-a900kep1t.json](items/bs-pc-dbaek6-a900kep1t.json) | ORIHIRO 蒟蒻果凍-白桃&葡萄 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbacd6-a900felhj.json](items/bs-pc-dbacd6-a900felhj.json) | OYATSU 優雅食 星太郎點心麵-大雞汁口味 | 點心麵 | PChome | 是 |
| [items/bs-pc-dbaek6-a900kkno3.json](items/bs-pc-dbaek6-a900kkno3.json) | OYATSU 優雅食 極辣寬點心麵 | 點心麵 | PChome |  |
| [items/bs-pc-dbaeec-a900h2skd.json](items/bs-pc-dbaeec-a900h2skd.json) | OYATSU 優雅食 花生點心麵-辣味雞汁 | 點心麵 | PChome |  |
| [items/bs-pc-dbaeec-a900h2s95.json](items/bs-pc-dbaeec-a900h2s95.json) | OYATSU 優雅食 花生點心麵-雞汁 | 點心麵 | PChome |  |
| [items/bs-pc-dbaeec-a900hgqw1.json](items/bs-pc-dbaeec-a900hgqw1.json) | OYATSU 優雅食 超大點心麵-雞汁風味 | 點心麵 | PChome |  |
| [items/bs-cf-1410593300101.json](items/bs-cf-1410593300101.json) | Pocky百奇巧克力棒 | 巧克力 | 萬家福 |  |
| [items/bs-pc-dbaek6-a900k72dr.json](items/bs-pc-dbaek6-a900k72dr.json) | Ribon 早乙女檸檬風味糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900jrj9a.json](items/bs-pc-dbaek6-a900jrj9a.json) | Ribon 濃厚牛奶糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbac1q-a38437988.json](items/bs-pc-dbac1q-a38437988.json) | Ruffles 波樂 厚切洋芋片-起士口味 | 洋芋片 | PChome | 是 |
| [items/bs-pc-dbaeez-a900gpbaj.json](items/bs-pc-dbaeez-a900gpbaj.json) | SOYJOY 大豆營養棒-白巧克力夏威夷豆口味 | 巧克力 | PChome | 是 |
| [items/bs-pc-dbaccr-a75931708.json](items/bs-pc-dbaccr-a75931708.json) | SanYeh 三葉 超大葡萄乾 | 果乾蜜餞 | PChome | 是 |
| [items/bs-cf-1412128900101.json](items/bs-cf-1412128900101.json) | TATAWA草莓風味夾心軟餅 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1423102500101.json](items/bs-cf-1423102500101.json) | TOBLERONE 瑞士三角 瑞士三角牛奶巧克力(含蜂蜜及奶油杏仁) | 巧克力 | 萬家福 |  |
| [items/bs-cf-1423101500101.json](items/bs-cf-1423101500101.json) | TOBLERONE 瑞士三角 瑞士三角黑巧克力(含蜂蜜及奶油杏仁) | 巧克力 | 萬家福 |  |
| [items/bs-pc-dbaeec-a900gnu0v.json](items/bs-pc-dbaeec-a900gnu0v.json) | Tohato 東鳩 4連焦糖玉米脆果 | 玉米與穀物點心 | PChome |  |
| [items/bs-pc-dbaek6-a900kkpaw.json](items/bs-pc-dbaek6-a900kkpaw.json) | Tohato 東鳩 SALTY餅乾 | 餅乾 | PChome |  |
| [items/bs-pc-dbaek6-a900kdpwp.json](items/bs-pc-dbaek6-a900kdpwp.json) | Tohato 東鳩 SALTY鳳梨風味餅乾 | 餅乾 | PChome |  |
| [items/bs-pc-dbaeec-a900gnuef.json](items/bs-pc-dbaeec-a900gnuef.json) | Tohato 東鳩 奶油風味酥餅 | 餅乾 | PChome |  |
| [items/bs-pc-dbaek6-a900khpkf.json](items/bs-pc-dbaek6-a900khpkf.json) | Tohato 東鳩 寶貝怪獸可可風味餅乾 | 巧克力 | PChome |  |
| [items/bs-pc-dbaek6-a900kktc3.json](items/bs-pc-dbaek6-a900kktc3.json) | Tohato 東鳩 手指圈圈餅 | 餅乾 | PChome |  |
| [items/bs-pc-dbaek6-a900hkkrr.json](items/bs-pc-dbaek6-a900hkkrr.json) | Tohato 東鳩 手指圈圈餅 -雞汁風味 | 餅乾 | PChome |  |
| [items/bs-pc-dbaeec-a900gltny.json](items/bs-pc-dbaeec-a900gltny.json) | Tohato 東鳩 棒棒薯條-鹽味 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900kkuw2.json](items/bs-pc-dbaek6-a900kkuw2.json) | Tohato 東鳩 比諾豌豆脆條 | 玉米與穀物點心 | PChome |  |
| [items/bs-pc-dbaek6-a900kkh09.json](items/bs-pc-dbaek6-a900kkh09.json) | Tohato 東鳩 焦糖玉米脆果 | 玉米與穀物點心 | PChome |  |
| [items/bs-pc-dbaek6-a900kdppt.json](items/bs-pc-dbaek6-a900kdppt.json) | Tohato 東鳩 美味捲捲餅 | 餅乾 | PChome |  |
| [items/bs-pc-dbaek6-a900k5rq0.json](items/bs-pc-dbaek6-a900k5rq0.json) | Tohato 東鳩 迷你葡萄派餅乾 | 餅乾 | PChome |  |
| [items/bs-pc-dbaek6-a900kgpbp.json](items/bs-pc-dbaek6-a900kgpbp.json) | UHA 味覺糖 噗啾汽水風味條糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900k7al7.json](items/bs-pc-dbaek6-a900k7al7.json) | UHA 味覺糖 焦糖拿鐵風味糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900kdq1q.json](items/bs-pc-dbaek6-a900kdq1q.json) | UHA 味覺糖 葡萄風味軟糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaf0l-a9009h4a5.json](items/bs-pc-dbaf0l-a9009h4a5.json) | Vilson 米森 有機核桃(未烘培) | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbaek6-a900iujjk.json](items/bs-pc-dbaek6-a900iujjk.json) | YBC CHIP STAR洋芋片-酸奶油洋蔥風味 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900kmxxw.json](items/bs-pc-dbaek6-a900kmxxw.json) | YBC CHIP STAR洋芋片-鹽味 | 洋芋片 | PChome |  |
| [items/bs-pc-dbacd6-a900gd9bn.json](items/bs-pc-dbacd6-a900gd9bn.json) | Yupi YUPI 呦皮漢堡QQ軟糖 | 糖果口香糖 | PChome | 是 |
| [items/bs-cf-1422301800101.json](items/bs-cf-1422301800101.json) | skittles Skittles彩虹糖混合水果 | 糖果口香糖 | 萬家福 | 是 |
| [items/bs-cf-1410446500101.json](items/bs-cf-1410446500101.json) | ㄋㄟㄋㄟ補給站-牛奶餅乾 | 餅乾 | 萬家福 | 是 |
| [items/bs-pc-dbacd6-a90088c8y.json](items/bs-pc-dbacd6-a90088c8y.json) | 上好佳 原味鮮蝦條 | 玉米與穀物點心 | PChome | 是 |
| [items/bs-pc-dbacd6-a90088by6.json](items/bs-pc-dbacd6-a90088by6.json) | 上好佳 洋蔥圈 | 玉米與穀物點心 | PChome | 是 |
| [items/bs-cf-1401401800101.json](items/bs-cf-1401401800101.json) | 上好佳歡樂小點心洋蔥圈 | 玉米與穀物點心 | 萬家福 |  |
| [items/bs-pc-dbaeec-a900g8z6a.json](items/bs-pc-dbaeec-a900g8z6a.json) | 不二家 千層派 | 蛋糕甜點 | PChome |  |
| [items/bs-pc-dbae7b-a68531227.json](items/bs-pc-dbae7b-a68531227.json) | 不二家 牛乳糖 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbaek6-a900kjn70.json](items/bs-pc-dbaek6-a900kjn70.json) | 不二家 麵包超人4連小餅乾 | 餅乾 | PChome |  |
| [items/bs-cf-1410432000101.json](items/bs-cf-1410432000101.json) | 中祥Oday雪花餅(蔓越莓) | 果乾蜜餞 | 萬家福 |  |
| [items/bs-cf-1412119300101.json](items/bs-cf-1412119300101.json) | 中祥夾心蘇打(檸檬) | 餅乾 | 萬家福 |  |
| [items/bs-cf-1412119200101.json](items/bs-cf-1412119200101.json) | 中祥夾心蘇打(草莓) | 餅乾 | 萬家福 |  |
| [items/bs-cf-1412113300101.json](items/bs-cf-1412113300101.json) | 中祥巧心蘇打牛軋餅乾 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1400100900101.json](items/bs-cf-1400100900101.json) | 中祥自然之顏紫菜蘇打 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1400101800101.json](items/bs-cf-1400101800101.json) | 中祥自然之顏蔬菜蘇打 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1400101100101.json](items/bs-cf-1400101100101.json) | 中祥自然之顏鮮蔥蘇打餅 | 餅乾 | 萬家福 |  |
| [items/bs-pc-dbae7m-a900k92ek.json](items/bs-pc-dbae7m-a900k92ek.json) | 丸川 彈珠口香糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbae7m-a900expsy.json](items/bs-pc-dbae7m-a900expsy.json) | 丸川 彩球泡泡糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900kdm0g.json](items/bs-pc-dbaek6-a900kdm0g.json) | 丸川 製果 葡萄風味口香糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900kjn7s.json](items/bs-pc-dbaek6-a900kjn7s.json) | 丸川 製果 酸檸檬風味口香糖 | 糖果口香糖 | PChome |  |
| [items/bs-cf-1401125300101.json](items/bs-cf-1401125300101.json) | 乖乖玉米脆條-奶油椰子 | 玉米與穀物點心 | 萬家福 |  |
| [items/bs-cf-1401026300101.json](items/bs-cf-1401026300101.json) | 乖乖玉米脆條-蝦乖乖原味 | 玉米與穀物點心 | 萬家福 |  |
| [items/bs-cf-1401027800101.json](items/bs-cf-1401027800101.json) | 乖乖玉米脆條-蝦乖乖辣味 | 玉米與穀物點心 | 萬家福 |  |
| [items/bs-pc-dbacd5-a9008z60l.json](items/bs-pc-dbacd5-a9008z60l.json) | 九福 - 葡萄沙琪瑪 | 蛋糕甜點 | PChome | 是 |
| [items/bs-pc-dbacd5-a9008z61g.json](items/bs-pc-dbacd5-a9008z61g.json) | 九福 黑糖沙琪瑪 | 蛋糕甜點 | PChome | 是 |
| [items/bs-pc-dbacfn-a900iauib.json](items/bs-pc-dbacfn-a900iauib.json) | 健康日誌 夾心蘇打餅-檸檬味 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbacfn-a900iaujm.json](items/bs-pc-dbacfn-a900iaujm.json) | 健康日誌 夾心蘇打餅-起士味 | 餅乾 | PChome | 是 |
| [items/bs-cf-1410469800112.json](items/bs-cf-1410469800112.json) | 健康日誌 比利時風味餅乾(焦糖味) | 餅乾 | 萬家福 |  |
| [items/bs-pc-dbacd6-a90080moq.json](items/bs-pc-dbacd6-a90080moq.json) | 健康日誌 法式蒜味脆餅 | 餅乾 | PChome | 是 |
| [items/bs-cf-1423103700101.json](items/bs-cf-1423103700101.json) | 健達繽紛樂 | 巧克力 | 萬家福 | 是 |
| [items/bs-cf-1423018300101.json](items/bs-cf-1423018300101.json) | 健達繽紛樂(白) | 巧克力 | 萬家福 | 是 |
| [items/bs-cf-1420408900101.json](items/bs-cf-1420408900101.json) | 元本山朝鮮海苔經典鹽味量販袋 | 肉乾海苔豆乾 | 萬家福 |  |
| [items/bs-cf-1410418200101.json](items/bs-cf-1410418200101.json) | 冠昇-檸檬薄片 | 餅乾 | 萬家福 | 是 |
| [items/bs-pc-dbae7w-a80454717.json](items/bs-pc-dbae7w-a80454717.json) | 利口樂 檸檬草本喉糖 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbae6y-a900f9mu7.json](items/bs-pc-dbae6y-a900f9mu7.json) | 利口樂 草本潤喉糖-原味 | 糖果口香糖 | PChome | 是 |
| [items/bs-cf-1422501000101.json](items/bs-cf-1422501000101.json) | 利口樂草本喉糖原味 | 糖果口香糖 | 萬家福 | 是 |
| [items/bs-pc-dbae7b-a45679838.json](items/bs-pc-dbae7b-a45679838.json) | 前田 乳球小粒燒菓子蛋酥 | 餅乾 | PChome |  |
| [items/bs-pc-dbaek6-a900ho1r9.json](items/bs-pc-dbaek6-a900ho1r9.json) | 加藤產業 加藤製果 檸檬鹽風味糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbac9j-a71212173.json](items/bs-pc-dbac9j-a71212173.json) | 北海 有豐食品 鱈魚香絲 | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbachs-a900gasty.json](items/bs-pc-dbachs-a900gasty.json) | 北海 鱈魚香絲(寬條) | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbacd6-a9007p5q8.json](items/bs-pc-dbacd6-a9007p5q8.json) | 北田 蒟蒻糙米捲-巧克力 | 巧克力 | PChome | 是 |
| [items/bs-pc-dbacd6-a9007p5x6.json](items/bs-pc-dbacd6-a9007p5x6.json) | 北田 蒟蒻糙米捲-海苔 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbacd6-a9007p5uv.json](items/bs-pc-dbacd6-a9007p5uv.json) | 北田 蒟蒻糙米捲-牛奶 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbacd6-a9007p5s0.json](items/bs-pc-dbacd6-a9007p5s0.json) | 北田 蒟蒻糙米捲-蛋黃 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbac17-a900jaoei.json](items/bs-pc-dbac17-a900jaoei.json) | 卡滋 小王子麵爆米花-獨享包 | 點心麵 | PChome | 是 |
| [items/bs-pc-dbac17-a900ik7hi.json](items/bs-pc-dbac17-a900ik7hi.json) | 卡滋 爆米花 | 玉米與穀物點心 | PChome | 是 |
| [items/bs-cf-1400011300101.json](items/bs-cf-1400011300101.json) | 卡賀米の菓子(海苔) | 肉乾海苔豆乾 | 萬家福 |  |
| [items/bs-cf-1401012100104.json](items/bs-cf-1401012100104.json) | 卡迪那小德薯湖鹽海苔口味 | 洋芋片 | 萬家福 |  |
| [items/bs-cf-1401011600104.json](items/bs-cf-1401011600104.json) | 卡迪那小德薯濃厚茄汁口味 | 洋芋片 | 萬家福 |  |
| [items/bs-cf-1401015400101.json](items/bs-cf-1401015400101.json) | 卡迪那德州薯條茄汁口味 | 洋芋片 | 萬家福 |  |
| [items/bs-cf-1400313400101.json](items/bs-cf-1400313400101.json) | 可口美酥酸奶洋蔥口味量販 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1400301500101.json](items/bs-cf-1400301500101.json) | 可口美酥鹹甜原味量販 | 餅乾 | 萬家福 |  |
| [items/bs-pc-dbaeac-a68551018.json](items/bs-pc-dbaeac-a68551018.json) | 可康 海鹽檸檬糖 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbacdx-a9005svmd.json](items/bs-pc-dbacdx-a9005svmd.json) | 同正 紅土花生王 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbacdx-a9005svol.json](items/bs-pc-dbacdx-a9005svol.json) | 同正 素食蠶豆 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbacdx-a9005svnh.json](items/bs-pc-dbacdx-a9005svnh.json) | 同正 蒜味蠶豆 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbda16-a900fzeu6.json](items/bs-pc-dbda16-a900fzeu6.json) | 吳啟魯 黑金剛花生 | 堅果瓜子 | PChome |  |
| [items/bs-cf-1401009400101.json](items/bs-cf-1401009400101.json) | 味王 小王子麵-普羅旺斯羅勒香椿 | 點心麵 | 萬家福 |  |
| [items/bs-pc-dbacc4-a900ey8xi.json](items/bs-pc-dbacc4-a900ey8xi.json) | 味王 王子麵 羅勒香椿 (全素) | 點心麵 | PChome | 是 |
| [items/bs-pc-dbaczk-a900jt6hw.json](items/bs-pc-dbaczk-a900jt6hw.json) | 喜笑花生 黑金剛花生雪Q餅 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbacdb-a9005yjpl.json](items/bs-pc-dbacdb-a9005yjpl.json) | 嘉義福義軒 嘉義 嬌麻餅 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbar4e-1900a2m30.json](items/bs-pc-dbar4e-1900a2m30.json) | 嘉義福義軒 手工機能蛋素蛋捲 | 米果 | PChome | 是 |
| [items/bs-pc-dbar4e-a90061jd2.json](items/bs-pc-dbar4e-a90061jd2.json) | 嘉義福義軒 手工芝麻蛋捲 包裝 | 米果 | PChome | 是 |
| [items/bs-pc-dbacd6-a900eoubo.json](items/bs-pc-dbacd6-a900eoubo.json) | 嘉義福義軒 湘辣蘇打餅 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbar4e-a90061jcx.json](items/bs-pc-dbar4e-a90061jcx.json) | 嘉義福義軒 福椒蘇打餅 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbac14-a900kh6bb.json](items/bs-pc-dbac14-a900kh6bb.json) | 垂坤 沙茶豆干 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac14-a900jk795.json](items/bs-pc-dbac14-a900jk795.json) | 垂坤 沙茶辣豆干-純素 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac14-a900k8rxz.json](items/bs-pc-dbac14-a900k8rxz.json) | 垂坤 蒜片豆干 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbarcm-a900grnrq.json](items/bs-pc-dbarcm-a900grnrq.json) | 垂坤 蝦餅 | 玉米與穀物點心 | PChome |  |
| [items/bs-cf-1423204100101.json](items/bs-cf-1423204100101.json) | 士力架花生巧克力 | 巧克力 | 萬家福 | 是 |
| [items/bs-pc-dbac04-a900k97ez.json](items/bs-pc-dbac04-a900k97ez.json) | 多力多滋 迷你脆皮蛋口味玉米片 | 洋芋片 | PChome | 是 |
| [items/bs-pc-dbaco1-a900k5jcs.json](items/bs-pc-dbaco1-a900k5jcs.json) | 奇多 家常起司口味 | 玉米與穀物點心 | PChome | 是 |
| [items/bs-pc-dbac0h-a900hpez6.json](items/bs-pc-dbac0h-a900hpez6.json) | 孔雀 小餅乾-廟宇版 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbac0h-a900a23i3.json](items/bs-pc-dbac0h-a900a23i3.json) | 孔雀 餅乾 原味 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbacfn-a90099es6.json](items/bs-pc-dbacfn-a90099es6.json) | 安堡 原味蘇打夾心 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbacd6-a900aac0d.json](items/bs-pc-dbacd6-a900aac0d.json) | 安堡 圓蔥蘇打夾心餅 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbacd6-a900hhomn.json](items/bs-pc-dbacd6-a900hhomn.json) | 安堡 帕瑪森起司餅-椒麻海苔口味 | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbaek6-a900k92fc.json](items/bs-pc-dbaek6-a900k92fc.json) | 宮田 咖啡風味牛奶糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900jkbu1.json](items/bs-pc-dbaek6-a900jkbu1.json) | 宮田 小布施牛奶糖 | 糖果口香糖 | PChome |  |
| [items/bs-cf-1410309100101.json](items/bs-cf-1410309100101.json) | 小林煎餅 小林鮮奶薄餅 | 餅乾 | 萬家福 |  |
| [items/bs-pc-dbacd6-a9007p5l2.json](items/bs-pc-dbacd6-a9007p5l2.json) | 巧益 三星蔥蘇打餅 | 餅乾 | PChome |  |
| [items/bs-pc-dbacd6-a900a9gu4.json](items/bs-pc-dbacd6-a900a9gu4.json) | 巧益 五穀堅果沙其馬 | 堅果瓜子 | PChome | 是 |
| [items/bs-pc-dbacd6-a900hld2p.json](items/bs-pc-dbacd6-a900hld2p.json) | 巧益 冬筍胡椒餅 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbacd6-a9009rj3f.json](items/bs-pc-dbacd6-a9009rj3f.json) | 巧益 原味夾心蘇打餅 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbacd6-a900eyd2d.json](items/bs-pc-dbacd6-a900eyd2d.json) | 巧益 川蜀椒麻烤海苔 | 玉米與穀物點心 | PChome | 是 |
| [items/bs-pc-dbacd6-a9007slt7.json](items/bs-pc-dbacd6-a9007slt7.json) | 巧益 手工堅果沙琪瑪 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbacd6-a900ezuoz.json](items/bs-pc-dbacd6-a900ezuoz.json) | 巧益 日式玉米濃湯棒 | 玉米與穀物點心 | PChome |  |
| [items/bs-pc-dbacd6-a90099dd1.json](items/bs-pc-dbacd6-a90099dd1.json) | 巧益 沙茶豆干 | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbacd6-a900eyjzp.json](items/bs-pc-dbacd6-a900eyjzp.json) | 巧益 無籽葡萄乾 | 果乾蜜餞 | PChome |  |
| [items/bs-pc-dbacd6-a900gcd6d.json](items/bs-pc-dbacd6-a900gcd6d.json) | 巧益 玫瑰椒鹽烤海苔 | 玉米與穀物點心 | PChome | 是 |
| [items/bs-pc-dbacd6-a900fwhmi.json](items/bs-pc-dbacd6-a900fwhmi.json) | 巧益 甜筒軟糖 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbacd6-a900fwn2r.json](items/bs-pc-dbacd6-a900fwn2r.json) | 巧益 瘋爆 梅子烤海苔 | 玉米與穀物點心 | PChome | 是 |
| [items/bs-pc-dbacd6-a900a42fe.json](items/bs-pc-dbacd6-a900a42fe.json) | 巧益 益生菌軟糖-葡萄風味 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbacd6-a9009axfd.json](items/bs-pc-dbacd6-a9009axfd.json) | 巧益 臭豆腐豆干 | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbacd6-a900b6qg5.json](items/bs-pc-dbacd6-a900b6qg5.json) | 巧益 蒜條子豆干 | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbacd6-a9009rj57.json](items/bs-pc-dbacd6-a9009rj57.json) | 巧益 香蔥夾心蘇打餅 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbay10-a90086tq1.json](items/bs-pc-dbay10-a90086tq1.json) | 張君雅 日式串燒休閒丸子 | 點心麵 | PChome |  |
| [items/bs-pc-dbacd6-a900gd4bw.json](items/bs-pc-dbacd6-a900gd4bw.json) | 御之味 迷你包鹹葡萄乾 | 果乾蜜餞 | PChome | 是 |
| [items/bs-pc-dbac18-a900976od.json](items/bs-pc-dbac18-a900976od.json) | 恰好 香香豆 | 堅果瓜子 | PChome | 是 |
| [items/bs-pc-dbac14-a900iilmf.json](items/bs-pc-dbac14-a900iilmf.json) | 惠香 一口小豆丁 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac14-a900c7prh.json](items/bs-pc-dbac14-a900c7prh.json) | 惠香 一口方塊乾 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbacel-a900idh6x.json](items/bs-pc-dbacel-a900idh6x.json) | 惠香 五香花生米 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbachn-a900kivx8.json](items/bs-pc-dbachn-a900kivx8.json) | 惠香 化核應子 (無籽去核黑李子 糖葫蘆蜜餞) | 果乾蜜餞 | PChome |  |
| [items/bs-pc-dbac14-a900iexy7.json](items/bs-pc-dbac14-a900iexy7.json) | 惠香 原味素蹄筋(微辣) | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac1e-a900a72kb.json](items/bs-pc-dbac1e-a900a72kb.json) | 惠香 台灣造型日月潭紅茶土鳳梨酥四顆 | 蛋糕甜點 | PChome |  |
| [items/bs-pc-dbac1e-a9009n9pt.json](items/bs-pc-dbac1e-a9009n9pt.json) | 惠香 台灣造型關廟土鳳梨酥四顆 | 蛋糕甜點 | PChome |  |
| [items/bs-pc-dbac14-a900c7tx1.json](items/bs-pc-dbac14-a900c7tx1.json) | 惠香 川味麻辣干 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac2x-a900hj7iw.json](items/bs-pc-dbac2x-a900hj7iw.json) | 惠香 智利特大葡萄乾(無籽) | 果乾蜜餞 | PChome |  |
| [items/bs-pc-dbac14-a900c7ujw.json](items/bs-pc-dbac14-a900c7ujw.json) | 惠香 木材豆干 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac1c-a900gnzrx.json](items/bs-pc-dbac1c-a900gnzrx.json) | 惠香 梨膏糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbacel-a900idh6m.json](items/bs-pc-dbacel-a900idh6m.json) | 惠香 椒麻花生米 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbacel-a900idh9m.json](items/bs-pc-dbacel-a900idh9m.json) | 惠香 油炸花生米 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbacel-a900idh59.json](items/bs-pc-dbacel-a900idh59.json) | 惠香 甜酥花生米 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbacel-a900kivxw.json](items/bs-pc-dbacel-a900kivxw.json) | 惠香 紅殼花生 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbac14-a900c7ul9.json](items/bs-pc-dbac14-a900c7ul9.json) | 惠香 素沙茶豆干 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac2l-a900a35iy.json](items/bs-pc-dbac2l-a900a35iy.json) | 惠香 葡萄風味益生菌軟糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbac0t-a9008euh6.json](items/bs-pc-dbac0t-a9008euh6.json) | 惠香 蒜味香豆子(蠶豆片) | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbacxb-a900jesu7.json](items/bs-pc-dbacxb-a900jesu7.json) | 惠香 蜂梨潤喉糖 羅漢果味 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbacxb-a900jeso6.json](items/bs-pc-dbacxb-a900jeso6.json) | 惠香 蜂梨潤喉糖 高山梨子味 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbac14-a900iilmp.json](items/bs-pc-dbac14-a900iilmp.json) | 惠香 香Q豆絲 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac4m-1900hndap.json](items/bs-pc-dbac4m-1900hndap.json) | 新東陽 原味沙琪瑪 | 蛋糕甜點 | PChome |  |
| [items/bs-pc-dbac4m-a900ho2fj.json](items/bs-pc-dbac4m-a900ho2fj.json) | 新東陽 原味魷魚絲 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac4m-a900gkvd6.json](items/bs-pc-dbac4m-a900gkvd6.json) | 新東陽 古早味炭烤豬肉乾 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac4m-a900b2b4s.json](items/bs-pc-dbac4m-a900b2b4s.json) | 新東陽 台灣果品梅子果凍 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbac4m-a900b29i7.json](items/bs-pc-dbac4m-a900b29i7.json) | 新東陽 台灣果品芒果果凍 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbac4m-a900b135w.json](items/bs-pc-dbac4m-a900b135w.json) | 新東陽 台灣果品茶梅果凍 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbac4m-a900b29h0.json](items/bs-pc-dbac4m-a900b29h0.json) | 新東陽 台灣果品荔枝果凍 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbac4m-a900ant64.json](items/bs-pc-dbac4m-a900ant64.json) | 新東陽 水果乾-紅心芭樂(芭樂乾) | 果乾蜜餞 | PChome |  |
| [items/bs-pc-dbac4m-a900fxbwv.json](items/bs-pc-dbac4m-a900fxbwv.json) | 新東陽 炙燒小香腸-原味 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac4m-a900ho1nd.json](items/bs-pc-dbac4m-a900ho1nd.json) | 新東陽 碳烤魷魚片 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac4m-a900ho2fn.json](items/bs-pc-dbac4m-a900ho2fn.json) | 新東陽 碳烤魷魚絲 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac1e-a9007nfs0.json](items/bs-pc-dbac1e-a9007nfs0.json) | 新東陽 老太陽堂太陽餅 | 餅乾 | PChome |  |
| [items/bs-pc-dbac2v-a900klmd8.json](items/bs-pc-dbac2v-a900klmd8.json) | 新東陽 芒果雪花餅故宮 | 餅乾 | PChome |  |
| [items/bs-pc-dbac4m-a900hpxq0.json](items/bs-pc-dbac4m-a900hpxq0.json) | 新東陽 薄脆片肉乾 | 玉米與穀物點心 | PChome |  |
| [items/bs-pc-dbac4m-a900a34py.json](items/bs-pc-dbac4m-a900a34py.json) | 新東陽 蜜汁豬肉乾 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac4m-a900aflrx.json](items/bs-pc-dbac4m-a900aflrx.json) | 新東陽 起司三明治豬肉乾 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac4m-a900gqyc3.json](items/bs-pc-dbac4m-a900gqyc3.json) | 新東陽 辣味牛肉乾 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac4m-a900a8zfe.json](items/bs-pc-dbac4m-a900a8zfe.json) | 新東陽 頂級和牛牛肉乾 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac4m-a900ho1pi.json](items/bs-pc-dbac4m-a900ho1pi.json) | 新東陽 香烤魷魚條 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac4m-1900hnd9a.json](items/bs-pc-dbac4m-1900hnd9a.json) | 新東陽 黑糖沙琪瑪 | 蛋糕甜點 | PChome |  |
| [items/bs-pc-dbacd6-a900aoeai.json](items/bs-pc-dbacd6-a900aoeai.json) | 日日旺 起士蘇打餅乾 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbacfn-a900b8rw9.json](items/bs-pc-dbacfn-a900b8rw9.json) | 旺旺 厚燒 海苔 (米果) | 米果 | PChome |  |
| [items/bs-pc-dbacfn-a900bf4nt.json](items/bs-pc-dbacfn-a900bf4nt.json) | 旺旺 夾心捲(香草口味蛋捲) | 米果 | PChome |  |
| [items/bs-cf-1400001000101.json](items/bs-cf-1400001000101.json) | 旺旺 波貝仙 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1400000800101.json](items/bs-cf-1400000800101.json) | 旺旺 瑞花經濟包-輕辣 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1400014500101.json](items/bs-cf-1400014500101.json) | 旺旺 米小餅-紫薯口味 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1400030500101.json](items/bs-cf-1400030500101.json) | 旺旺 米小餅-金薯口味(米果) | 米果 | 萬家福 |  |
| [items/bs-cf-1400030300101.json](items/bs-cf-1400030300101.json) | 旺旺 米小餅-青蔥口味(米果) | 米果 | 萬家福 |  |
| [items/bs-cf-1422204500106.json](items/bs-cf-1422204500106.json) | 旺旺吸C凍可吸果凍-草莓果汁 | 糖果口香糖 | 萬家福 |  |
| [items/bs-cf-1422204800106.json](items/bs-cf-1422204800106.json) | 旺旺吸C凍可吸果凍-葡萄果汁 | 糖果口香糖 | 萬家福 |  |
| [items/bs-cf-1400003100101.json](items/bs-cf-1400003100101.json) | 旺旺燒米屋 | 餅乾 | 萬家福 | 是 |
| [items/bs-cf-1400001100101.json](items/bs-cf-1400001100101.json) | 旺旺金澎派 | 蛋糕甜點 | 萬家福 |  |
| [items/bs-pc-dbacxb-a900keobp.json](items/bs-pc-dbacxb-a900keobp.json) | 易而安 甘拿喉潤喉丸 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbaeeo-a900kgc9s.json](items/bs-pc-dbaeeo-a900kgc9s.json) | 曼陀珠 熱帶水果口味糖果 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbaeeo-a900kgc9r.json](items/bs-pc-dbaeeo-a900kgc9r.json) | 曼陀珠 葡萄口味糖果 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbbj03-a900hbjgj.json](items/bs-pc-dbbj03-a900hbjgj.json) | 有田製果 乳幼米果 | 米果 | PChome | 是 |
| [items/bs-pc-dbaek6-a900khrnl.json](items/bs-pc-dbaek6-a900khrnl.json) | 森永 嗨啾水果風味條糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900khrn3.json](items/bs-pc-dbaek6-a900khrn3.json) | 森永 煉乳風味牛奶糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900kihqq.json](items/bs-pc-dbaek6-a900kihqq.json) | 森永 製果 鹽味牛奶糖(袋裝) | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbac04-a900jspgg.json](items/bs-pc-dbac04-a900jspgg.json) | 樂事 洋芋片-九州岩燒海苔 | 洋芋片 | PChome | 是 |
| [items/bs-pc-dbac02-a900ags9a.json](items/bs-pc-dbac02-a900ags9a.json) | 樂事 洋芋片-經典原味 | 洋芋片 | PChome | 是 |
| [items/bs-pc-dbaek6-a900kmy03.json](items/bs-pc-dbaek6-a900kmy03.json) | 樂天 寶貝怪獸造型軟糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900kdqig.json](items/bs-pc-dbaek6-a900kdqig.json) | 樂天 小梅口香糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaeew-a900gclc9.json](items/bs-pc-dbaeew-a900gclc9.json) | 樂天 小熊餅-巧克力 | 巧克力 | PChome | 是 |
| [items/bs-pc-dbae6j-a90069dnn.json](items/bs-pc-dbae6j-a90069dnn.json) | 樂天 小熊餅-牛奶 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbae5d-a77917182.json](items/bs-pc-dbae5d-a77917182.json) | 樂天 小熊餅-牛奶口味 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbaeew-1900gzgkq.json](items/bs-pc-dbaeew-1900gzgkq.json) | 樂天 小熊餅-草莓 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbao0b-a69702585.json](items/bs-pc-dbao0b-a69702585.json) | 樂天 巧克力派 | 巧克力 | PChome | 是 |
| [items/bs-pc-dbaeeo-a900hbv6u.json](items/bs-pc-dbaeeo-a900hbv6u.json) | 樂天 梅子風味糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaek6-a900kmkzi.json](items/bs-pc-dbaek6-a900kmkzi.json) | 樂天 繽紛口香糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbaef8-a900gclal.json](items/bs-pc-dbaef8-a900gclal.json) | 樂天 蛋黃派 | 蛋糕甜點 | PChome | 是 |
| [items/bs-pc-dbbm1k-a9009j38d.json](items/bs-pc-dbbm1k-a9009j38d.json) | 樂天 青葡萄果汁糖 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbao0b-a9006ovwz.json](items/bs-pc-dbao0b-a9006ovwz.json) | 樂天 黑巧克力派 | 巧克力 | PChome |  |
| [items/bs-pc-dbae6y-a900bn2g2.json](items/bs-pc-dbae6y-a900bn2g2.json) | 樺達 喉糖-檸檬薄荷 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbae6y-a900bn1zk.json](items/bs-pc-dbae6y-a900bn1zk.json) | 樺達 硬喉糖-檸檬薄荷 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbae6y-a900bn1zq.json](items/bs-pc-dbae6y-a900bn1zq.json) | 樺達 硬喉糖-甘草金桔薄荷 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbae6y-a900bn1qt.json](items/bs-pc-dbae6y-a900bn1qt.json) | 樺達 硬喉糖-超涼薄荷 | 糖果口香糖 | PChome | 是 |
| [items/bs-cf-1420414100101.json](items/bs-cf-1420414100101.json) | 橘平屋韓味海苔 | 肉乾海苔豆乾 | 萬家福 |  |
| [items/bs-pc-dbara2-a900a061l.json](items/bs-pc-dbara2-a900a061l.json) | 每日優果 川辣椒麻花生 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbara2-a900a05u9.json](items/bs-pc-dbara2-a900a05u9.json) | 每日優果 帶殼夏威夷豆 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbara2-a900eq4yp.json](items/bs-pc-dbara2-a900eq4yp.json) | 每日優果 日式梅片口袋蜜餞 | 果乾蜜餞 | PChome |  |
| [items/bs-pc-dbara2-a900bx9yj.json](items/bs-pc-dbara2-a900bx9yj.json) | 每日優果 烘焙原味腰果 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbara2-a900an22t.json](items/bs-pc-dbara2-a900an22t.json) | 每日優果 烘焙原味開心果仁 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbara2-a900bx9xf.json](items/bs-pc-dbara2-a900bx9xf.json) | 每日優果 烘焙黑糖核桃 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbara2-a900a073c.json](items/bs-pc-dbara2-a900a073c.json) | 每日優果 無籽黑葡萄乾 | 果乾蜜餞 | PChome |  |
| [items/bs-pc-dbara2-a900es1pa.json](items/bs-pc-dbara2-a900es1pa.json) | 每日優果 生杏仁果 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbara2-a900gg40v.json](items/bs-pc-dbara2-a900gg40v.json) | 每日優果 罐裝帶皮鹽焗腰果 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbara2-a900gg3wb.json](items/bs-pc-dbara2-a900gg3wb.json) | 每日優果 罐裝烘焙原味杏仁果 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbara2-a900c1ig7.json](items/bs-pc-dbara2-a900c1ig7.json) | 每日優果 美國自然開殼開心果 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbara2-a900a06m1.json](items/bs-pc-dbara2-a900a06m1.json) | 每日優果 高纖辣味蒟蒻薄片 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbara2-a900figw3.json](items/bs-pc-dbara2-a900figw3.json) | 每日優果 高纖黑木耳蒟蒻乾 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbara2-a900a071p.json](items/bs-pc-dbara2-a900a071p.json) | 每日優果 黃金葡萄乾 | 果乾蜜餞 | PChome |  |
| [items/bs-cf-1424203700101.json](items/bs-cf-1424203700101.json) | 洽洽香瓜子 | 堅果瓜子 | 萬家福 |  |
| [items/bs-cf-1401205800101.json](items/bs-cf-1401205800101.json) | 浪味仙-田園蔬菜口味(洋芋捲) | 米果 | 萬家福 |  |
| [items/bs-pc-dbacd6-a9008w2mz.json](items/bs-pc-dbacd6-a9008w2mz.json) | 海龍王 九層塔花生(純素) | 堅果瓜子 | PChome | 是 |
| [items/bs-pc-dbacd6-a9008w2jl.json](items/bs-pc-dbacd6-a9008w2jl.json) | 海龍王 竹炭花生(純素) | 堅果瓜子 | PChome | 是 |
| [items/bs-pc-dbacd6-a9008w2hf.json](items/bs-pc-dbacd6-a9008w2hf.json) | 海龍王 芥末花生(純素) | 堅果瓜子 | PChome | 是 |
| [items/bs-pc-dbaek6-a900klt7v.json](items/bs-pc-dbaek6-a900klt7v.json) | 湖池屋 4連PURE POTATO鹽味薯片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900kgp5d.json](items/bs-pc-dbaek6-a900kgp5d.json) | 湖池屋 PRIDE POTATO海苔鹽味薯片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900khma9.json](items/bs-pc-dbaek6-a900khma9.json) | 湖池屋 PRIDE POTATO雞汁風味薯片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900kgp2w.json](items/bs-pc-dbaek6-a900kgp2w.json) | 湖池屋 PRIDE POTATO鹽味薯片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900keakk.json](items/bs-pc-dbaek6-a900keakk.json) | 湖池屋 PRIDE POTATO黑胡椒風味薯片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900kmkz2.json](items/bs-pc-dbaek6-a900kmkz2.json) | 湖池屋 PURE POTATO濃厚海苔鹽風味薯片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900kfg74.json](items/bs-pc-dbaek6-a900kfg74.json) | 湖池屋 PURE POTATO濃雞汁風味薯片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900klt8z.json](items/bs-pc-dbaek6-a900klt8z.json) | 湖池屋 PURE POTATO辣味薯片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900k586s.json](items/bs-pc-dbaek6-a900k586s.json) | 湖池屋 和風海鮮風味洋芋片-金色包裝 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaeec-a900frqjp.json](items/bs-pc-dbaeec-a900frqjp.json) | 湖池屋 明太子風味玉米餅 | 玉米與穀物點心 | PChome |  |
| [items/bs-pc-dbaek6-a900jhx1p.json](items/bs-pc-dbaek6-a900jhx1p.json) | 湖池屋 松露起司風味派 | 蛋糕甜點 | PChome |  |
| [items/bs-pc-dbaegg-a900kd234.json](items/bs-pc-dbaegg-a900kd234.json) | 湖池屋 洋芋片-海苔醬油風味 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900kdlz9.json](items/bs-pc-dbaek6-a900kdlz9.json) | 湖池屋 洋芋片-海苔鹽風味 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900kd23w.json](items/bs-pc-dbaek6-a900kd23w.json) | 湖池屋 洋芋片-海鮮風味 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900k8s4w.json](items/bs-pc-dbaek6-a900k8s4w.json) | 湖池屋 海苔鹽味薯片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900kmkz1.json](items/bs-pc-dbaek6-a900kmkz1.json) | 湖池屋 玉米棒-濃厚起司風味 | 玉米與穀物點心 | PChome |  |
| [items/bs-pc-dbaek6-a900kgp4j.json](items/bs-pc-dbaek6-a900kgp4j.json) | 湖池屋 玉米棒-起司風味/BBQ風味 | 玉米與穀物點心 | PChome |  |
| [items/bs-pc-dbaek6-a900kgp4d.json](items/bs-pc-dbaek6-a900kgp4d.json) | 湖池屋 玉米脆棒 BBQ口味 | 玉米與穀物點心 | PChome |  |
| [items/bs-pc-dbaek6-a900khktk.json](items/bs-pc-dbaek6-a900khktk.json) | 湖池屋 絕品醬烤玉米餅 | 玉米與穀物點心 | PChome |  |
| [items/bs-pc-dbaek6-a900khrlh.json](items/bs-pc-dbaek6-a900khrlh.json) | 湖池屋 蒜味洋芋片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900k9jdj.json](items/bs-pc-dbaek6-a900k9jdj.json) | 湖池屋 蝦鹽風味玉米餅 | 玉米與穀物點心 | PChome |  |
| [items/bs-pc-dbaek6-a900kjn81.json](items/bs-pc-dbaek6-a900kjn81.json) | 湖池屋 超辛辣洋芋片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900kepda.json](items/bs-pc-dbaek6-a900kepda.json) | 湖池屋 辛辣炸雞風味洋芋片 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaeec-a900gnox1.json](items/bs-pc-dbaeec-a900gnox1.json) | 湖池屋 辣味脆薯條-隨身包 | 洋芋片 | PChome |  |
| [items/bs-pc-dbaek6-a900jn6p8.json](items/bs-pc-dbaek6-a900jn6p8.json) | 湖池屋 辣芥末風味洋芋條 | 餅乾 | PChome |  |
| [items/bs-pc-dbacgb-a900ikx1k.json](items/bs-pc-dbacgb-a900ikx1k.json) | 珍珍 昆布 | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbacgb-a900f7xkl.json](items/bs-pc-dbacgb-a900f7xkl.json) | 珍珍 香烤魷魚條 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbacgb-a900f85jr.json](items/bs-pc-dbacgb-a900f85jr.json) | 珍珍 魷魚片 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbac9j-a900f7xty.json](items/bs-pc-dbac9j-a900f7xty.json) | 珍珍 魷魚絲 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-pc-dbacgb-a900ikwl5.json](items/bs-pc-dbacgb-a900ikwl5.json) | 珍珍 鮭魚風味手燒卷 | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbacgb-a900f7vy5.json](items/bs-pc-dbacgb-a900f7vy5.json) | 珍珍 鱈魚香絲 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-cf-1422206800101.json](items/bs-cf-1422206800101.json) | 盛香珍 Dr.Q葡萄蒟蒻 | 糖果口香糖 | 萬家福 |  |
| [items/bs-pc-dbac77-a50790764.json](items/bs-pc-dbac77-a50790764.json) | 盛香珍 小魚干花生 | 肉乾海苔豆乾 | PChome |  |
| [items/bs-cf-1400111100101.json](items/bs-cf-1400111100101.json) | 盛香珍 酵母覺醒-紫菜青蔥蘇打餅 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1411004300101.json](items/bs-cf-1411004300101.json) | 盛香珍斯娜普蛋酥 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1424307000101.json](items/bs-cf-1424307000101.json) | 盛香珍無調味夏威夷豆 | 堅果瓜子 | 萬家福 |  |
| [items/bs-cf-1424306700101.json](items/bs-cf-1424306700101.json) | 盛香珍無調味腰果 | 堅果瓜子 | 萬家福 |  |
| [items/bs-cf-1413127400101.json](items/bs-cf-1413127400101.json) | 盛香珍皇家威化捲(清香檸檬口味) | 餅乾 | 萬家福 |  |
| [items/bs-cf-1424226700101.json](items/bs-cf-1424226700101.json) | 盛香珍蒜香青豆 | 堅果瓜子 | 萬家福 |  |
| [items/bs-cf-1411022100101.json](items/bs-cf-1411022100101.json) | 盛香珍蜂蜜千層酥 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1413232600101.json](items/bs-cf-1413232600101.json) | 盛香珍醇厚72%純黑巧克力捲 | 巧克力 | 萬家福 |  |
| [items/bs-pc-dbacd6-a900f9m9j.json](items/bs-pc-dbacd6-a900f9m9j.json) | 福伯 無糖薄荷糖-草莓味 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbaeeo-a900b7dsv.json](items/bs-pc-dbaeeo-a900b7dsv.json) | 秋山製菓 抹茶牛奶風味糖 | 糖果口香糖 | PChome |  |
| [items/bs-cf-1422012700101.json](items/bs-cf-1422012700101.json) | 立夢生巨峰葡萄糖 | 糖果口香糖 | 萬家福 |  |
| [items/bs-pc-dbacc4-a900anxue.json](items/bs-pc-dbacc4-a900anxue.json) | 統一 科學麵 | 點心麵 | PChome |  |
| [items/bs-pc-dbaa00-a90055nig.json](items/bs-pc-dbaa00-a90055nig.json) | 統一 科學麵-香蔥雞汁風味 | 點心麵 | PChome |  |
| [items/bs-pc-dbaa00-a90055niu.json](items/bs-pc-dbaa00-a90055niu.json) | 統一 科學麵Mini包 | 點心麵 | PChome |  |
| [items/bs-pc-dbacc4-a900bm0bp.json](items/bs-pc-dbacc4-a900bm0bp.json) | 統一 脆麵 | 點心麵 | PChome |  |
| [items/bs-cf-1424308400101.json](items/bs-cf-1424308400101.json) | 統一生機有機甘栗 | 堅果瓜子 | 萬家福 |  |
| [items/bs-cf-1402336100101.json](items/bs-cf-1402336100101.json) | 統一生機海鹽洋芋片-原味 | 洋芋片 | 萬家福 |  |
| [items/bs-cf-1401008800101.json](items/bs-cf-1401008800101.json) | 維力 張君雅小妹妹五連包BBQ點心麵 | 點心麵 | 萬家福 |  |
| [items/bs-cf-1401002700124.json](items/bs-cf-1401002700124.json) | 維力什麼丸意兒袋裝雞汁口味 | 餅乾 | 萬家福 |  |
| [items/bs-pc-dbacd6-a9007y1to.json](items/bs-pc-dbacd6-a9007y1to.json) | 美可 日本蛋捲(奶蛋素) | 米果 | PChome | 是 |
| [items/bs-pc-dbaccr-a900c0yko.json](items/bs-pc-dbaccr-a900c0yko.json) | 義美 杏仁南瓜子煎餅 | 堅果瓜子 | PChome | 是 |
| [items/bs-pc-dbaccr-a900bthn2.json](items/bs-pc-dbaccr-a900bthn2.json) | 義美 超大葡萄乾巧克力 | 巧克力 | PChome | 是 |
| [items/bs-pc-dbaccr-a900bthlq.json](items/bs-pc-dbaccr-a900bthlq.json) | 義美 超大葡萄乾巧克力球三角包 | 巧克力 | PChome | 是 |
| [items/bs-cf-1411025900101.json](items/bs-cf-1411025900101.json) | 義美奶霜可可千層派 | 巧克力 | 萬家福 | 是 |
| [items/bs-cf-1424108100101.json](items/bs-cf-1424108100101.json) | 義美好食瓶-油爆花生 | 堅果瓜子 | 萬家福 |  |
| [items/bs-cf-1413112200101.json](items/bs-cf-1413112200101.json) | 義美威化捲(巧克力) | 巧克力 | 萬家福 |  |
| [items/bs-cf-1413112400101.json](items/bs-cf-1413112400101.json) | 義美威化捲(香草牛奶) | 餅乾 | 萬家福 |  |
| [items/bs-cf-1413233600101.json](items/bs-cf-1413233600101.json) | 義美威化捲輕巧桶巧克力 | 巧克力 | 萬家福 |  |
| [items/bs-cf-1413233800101.json](items/bs-cf-1413233800101.json) | 義美威化捲輕巧桶香甜草莓 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1412001900101.json](items/bs-cf-1412001900101.json) | 義美巧克力法蘭酥 | 巧克力 | 萬家福 |  |
| [items/bs-cf-1423217800101.json](items/bs-cf-1423217800101.json) | 義美杏仁巧克球 | 巧克力 | 萬家福 |  |
| [items/bs-cf-1423201500101.json](items/bs-cf-1423201500101.json) | 義美杏仁巧克球(黑可可) | 巧克力 | 萬家福 |  |
| [items/bs-cf-1410225800101.json](items/bs-cf-1410225800101.json) | 義美榛果巧克力酥片(黑可可) | 巧克力 | 萬家福 |  |
| [items/bs-cf-1422333400101.json](items/bs-cf-1422333400101.json) | 義美知心Q軟糖 (草莓風味) | 糖果口香糖 | 萬家福 |  |
| [items/bs-cf-1412105700101.json](items/bs-cf-1412105700101.json) | 義美美味薄餅夾心-檸檬 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1412114300101.json](items/bs-cf-1412114300101.json) | 義美美味薄餅夾心-草莓 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1400103100101.json](items/bs-cf-1400103100101.json) | 義美美味蘇打餅乾-原味 | 餅乾 | 萬家福 | 是 |
| [items/bs-cf-1400103600101.json](items/bs-cf-1400103600101.json) | 義美美味蘇打餅乾-鮮蔥 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1423052700101.json](items/bs-cf-1423052700101.json) | 義美草莓煉乳QQ糖巧克球 | 巧克力 | 萬家福 |  |
| [items/bs-cf-1423022700101.json](items/bs-cf-1423022700101.json) | 義美葡萄QQ糖巧克球 | 巧克力 | 萬家福 |  |
| [items/bs-cf-1410008800101.json](items/bs-cf-1410008800101.json) | 義美雙果仁煎餅(花生杏仁) | 堅果瓜子 | 萬家福 |  |
| [items/bs-cf-1400115800101.json](items/bs-cf-1400115800101.json) | 義美生機 亞麻仁蘇打餅 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1400115700101.json](items/bs-cf-1400115700101.json) | 義美生機 台灣紅藜蘇打餅 | 餅乾 | 萬家福 |  |
| [items/bs-pc-dbacd6-a900gohwh.json](items/bs-pc-dbacd6-a900gohwh.json) | 老中醫 豆干-中丁 | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbacft-a900a0wjq.json](items/bs-pc-dbacft-a900a0wjq.json) | 老楊 奶油拌香蒜方塊酥(植物五辛素) | 餅乾 | PChome |  |
| [items/bs-pc-dbacft-a900alo0m.json](items/bs-pc-dbacft-a900alo0m.json) | 老楊 紅豆麻糬 | 蛋糕甜點 | PChome |  |
| [items/bs-pc-dbacft-a900a0wlf.json](items/bs-pc-dbacft-a900a0wlf.json) | 老楊 超濃起司 方塊酥(植物五辛素) | 餅乾 | PChome |  |
| [items/bs-cf-1400211400101.json](items/bs-cf-1400211400101.json) | 老楊原味方塊酥(平平安安) | 餅乾 | 萬家福 |  |
| [items/bs-cf-1401016000101.json](items/bs-cf-1401016000101.json) | 聯華食品 可樂果古早味 | 玉米與穀物點心 | 萬家福 |  |
| [items/bs-pc-dbac18-a900kgpdd.json](items/bs-pc-dbac18-a900kgpdd.json) | 自然優 南瓜籽 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dback7-a9008i1pl.json](items/bs-pc-dback7-a9008i1pl.json) | 自然優 原味核桃仁 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dback7-a9008i1x9.json](items/bs-pc-dback7-a9008i1x9.json) | 自然優 整顆夏威夷豆 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbae61-a9007t4j0.json](items/bs-pc-dbae61-a9007t4j0.json) | 自然優 無加糖愛文芒果乾 | 果乾蜜餞 | PChome |  |
| [items/bs-pc-dback7-a9008i1uv.json](items/bs-pc-dback7-a9008i1uv.json) | 自然優 超大腰果仁 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbaek6-a900kepdg.json](items/bs-pc-dbaek6-a900kepdg.json) | 船岡 牛奶仙貝-煎餅 | 米果 | PChome |  |
| [items/bs-cf-1420006900101.json](items/bs-cf-1420006900101.json) | 良澔大溪名產豆丁 | 肉乾海苔豆乾 | 萬家福 |  |
| [items/bs-cf-1420011900101.json](items/bs-cf-1420011900101.json) | 良澔大溪名產豆丁(辣味) | 肉乾海苔豆乾 | 萬家福 |  |
| [items/bs-pc-dbac2x-a900av6t4.json](items/bs-pc-dbac2x-a900av6t4.json) | 茶鼎天 天然無糖愛文芒果乾 | 果乾蜜餞 | PChome | 是 |
| [items/bs-cf-1402224600101.json](items/bs-cf-1402224600101.json) | 華元 波的多洋芋片(濃厚蚵仔煎口味) | 洋芋片 | 萬家福 |  |
| [items/bs-cf-1402224500101.json](items/bs-cf-1402224500101.json) | 華元 波的多洋芋片(濃厚蚵仔煎香辣口味) | 洋芋片 | 萬家福 |  |
| [items/bs-cf-1401209800101.json](items/bs-cf-1401209800101.json) | 華元Mini-洋蔥圈經典原味 | 玉米與穀物點心 | 萬家福 |  |
| [items/bs-cf-1401003400101.json](items/bs-cf-1401003400101.json) | 華元神氣包-三色野菜園 | 餅乾 | 萬家福 |  |
| [items/bs-cf-1424489800105.json](items/bs-cf-1424489800105.json) | 萬歲牌 萬歲海苔杏仁小魚盒裝 | 堅果瓜子 | 萬家福 |  |
| [items/bs-cf-1422304600101.json](items/bs-cf-1422304600101.json) | 蜜意坊 麥克斯香烤特白棉花糖 | 糖果口香糖 | 萬家福 |  |
| [items/bs-pc-dbaek6-a900hnvp1.json](items/bs-pc-dbaek6-a900hnvp1.json) | 道南 北海道 十勝紅豆風味牛奶糖 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbacd6-a900h30hw.json](items/bs-pc-dbacd6-a900h30hw.json) | 雷比特 三角包豆干 | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbacd6-a900g8o22.json](items/bs-pc-dbacd6-a900g8o22.json) | 雷比特 優格糖 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbacd6-a900h5h3x.json](items/bs-pc-dbacd6-a900h5h3x.json) | 雷比特 原味蠶豆酥 | 堅果瓜子 | PChome | 是 |
| [items/bs-pc-dbacd6-a900hn68a.json](items/bs-pc-dbacd6-a900hn68a.json) | 雷比特 素蝦餅 | 玉米與穀物點心 | PChome | 是 |
| [items/bs-pc-dbacd6-a900gzztn.json](items/bs-pc-dbacd6-a900gzztn.json) | 雷比特 蒜味蠶豆 | 堅果瓜子 | PChome | 是 |
| [items/bs-pc-dbacd6-a900hdsyc.json](items/bs-pc-dbacd6-a900hdsyc.json) | 雷比特 鱈魚香絲 | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbac18-a90054un9.json](items/bs-pc-dbac18-a90054un9.json) | 青龍牌 彰化老字號芳香藥膳田豆酥(蠶豆酥) | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbaef6-a900ax8a8.json](items/bs-pc-dbaef6-a900ax8a8.json) | 韓味不二 原味海苔酥 | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbaef2-a900kep69.json](items/bs-pc-dbaef2-a900kep69.json) | 韓味不二 韓國史瑞克海苔(山葵口味) | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbaef2-a900keovq.json](items/bs-pc-dbaef2-a900keovq.json) | 韓味不二 韓國小小兵海苔(照燒口味) | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbaef2-a900keoxc.json](items/bs-pc-dbaef2-a900keoxc.json) | 韓味不二 韓國小小兵海苔(起司口味) | 肉乾海苔豆乾 | PChome | 是 |
| [items/bs-pc-dbac2v-a900jj8yz.json](items/bs-pc-dbac2v-a900jj8yz.json) | 順便幸福 咖啡核桃司康脆脆 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbac2v-a900j54ku.json](items/bs-pc-dbac2v-a900j54ku.json) | 順便幸福 夏威夷豆雪Q餅 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbacvn-a900jj8zp.json](items/bs-pc-dbacvn-a900jj8zp.json) | 順便幸福 泰式奶茶泡芙脆脆 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbacvn-a900jj8zv.json](items/bs-pc-dbacvn-a900jj8zv.json) | 順便幸福 烏龍奶茶泡芙脆脆 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbacvn-a900jj8zg.json](items/bs-pc-dbacvn-a900jj8zg.json) | 順便幸福 經典原味泡芙脆脆 | 糖果口香糖 | PChome |  |
| [items/bs-pc-dbacvn-a900jj90j.json](items/bs-pc-dbacvn-a900jj90j.json) | 順便幸福 黑糖奶茶泡芙脆脆 | 糖果口香糖 | PChome |  |
| [items/bs-cf-1413106500101.json](items/bs-cf-1413106500101.json) | 麗巧克Nabati 巧克力威化餅 | 巧克力 | 萬家福 | 是 |
| [items/bs-cf-1412110400101.json](items/bs-cf-1412110400101.json) | 麗滋起士夾心餅乾 | 餅乾 | 萬家福 |  |
| [items/bs-pc-dbac2n-a900k0b5l.json](items/bs-pc-dbac2n-a900k0b5l.json) | 麗紳和春堂 小方塊仙楂軟糖 | 糖果口香糖 | PChome | 是 |
| [items/bs-pc-dbacds-a900ke5vy.json](items/bs-pc-dbacds-a900ke5vy.json) | 麗紳和春堂 紅翻天-紅棗核桃 | 堅果瓜子 | PChome | 是 |
| [items/bs-cf-1413107100101.json](items/bs-cf-1413107100101.json) | 麗芝士Nabati 起司威化餅 | 餅乾 | 萬家福 | 是 |
| [items/bs-pc-dbaea0-a900b7wbp.json](items/bs-pc-dbaea0-a900b7wbp.json) | 麥維他 消化餅 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbaefq-a900gmenw.json](items/bs-pc-dbaefq-a900gmenw.json) | 麥維他 燕麥消化餅 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbaea0-a900b7w8j.json](items/bs-pc-dbaea0-a900b7w8j.json) | 麥維他 輕怡消化餅 | 餅乾 | PChome | 是 |
| [items/bs-pc-dbaczf-a900k53r0.json](items/bs-pc-dbaczf-a900k53r0.json) | 黑師傅 捲心酥-開心果口味 | 堅果瓜子 | PChome |  |
| [items/bs-pc-dbaeeg-a900gczb3.json](items/bs-pc-dbaeeg-a900gczb3.json) | 龜田 揚一番醬油米果 | 米果 | PChome |  |
| [items/bs-pc-dbaeeg-a900gr9pe.json](items/bs-pc-dbaeeg-a900gr9pe.json) | 龜田 柿種米果 | 米果 | PChome |  |
| [items/bs-pc-dbaeec-a900gr3x7.json](items/bs-pc-dbaeec-a900gr3x7.json) | 龜田 柿種米果-紫蘇梅風味 | 米果 | PChome |  |
| [items/bs-pc-dbaeec-a900gfck2.json](items/bs-pc-dbaeec-a900gfck2.json) | 龜田 柿種米果-芥末風味 | 米果 | PChome |  |
| [items/bs-pc-dbaek6-a900klt7n.json](items/bs-pc-dbaek6-a900klt7n.json) | 龜田 柿種米果-鹽味 | 米果 | PChome |  |
