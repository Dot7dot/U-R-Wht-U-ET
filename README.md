# U R Wht U ET｜吃什麼像什麼

放在手機裡的食物營養小工具：**用自己的手掌當尺**，畫出食物的大小，就能知道這樣的份量有多少營養。

## 功能

- ✋ **手掌校正**：第一次使用先輸入手掌長度（手腕橫紋到中指指尖），之後畫布上的手掌就是實際比例。
- 📷 **拍照測量**：沒有尺也沒關係，在掌心放一枚硬幣（1、5、10、50 元皆可）拍照，會自動辨識手掌與硬幣、判斷面額並推算手掌長度（可拖曳微調；照片只在手機上分析，不會上傳）。
- 🔍 **搜尋食物**：可用名稱、別名、分類，甚至症狀關鍵字（例如「便秘」「高血壓」）搜尋。
- ✏️ **畫出大小**：在手掌背景上圈出食物，自動估算重量與營養；片狀或堆起來的食物可調整厚度，也可以直接輸入公克數。
- 📖 **健康小書**：每種食物可能有助預防的疾病、不適合的族群與小撇步。
- 📒 **簡單紀錄**：把吃的東西加入當日紀錄，查看每日營養總和（資料只存在手機瀏覽器裡）。
- 📴 可加到手機主畫面，離線也能使用。

## 放到手機上（GitHub Pages）

1. 到 GitHub 專案的 **Settings → Pages**。
2. **Source** 選 `Deploy from a branch`，Branch 選 `main`、資料夾選 `/ (root)`，按 Save。
3. 約一分鐘後用手機開啟 `https://dot7dot.github.io/U-R-Wht-U-ET/`。
4. 加到主畫面：iPhone Safari「分享 → 加入主畫面」；Android Chrome「選單 → 加到主畫面／安裝應用程式」。

## 新增食物

所有食物資料都在 [`foods/`](foods/) 資料夾，一種食物一個 JSON 檔，不用改程式。
詳細步驟見 [`foods/README.md`](foods/README.md)。

## 專案結構

```
index.html              頁面
css/style.css           樣式
js/app.js               程式（搜尋、畫布估算、紀錄）
js/measure.js           拍照測量手掌（硬幣當比例尺）
vendor/mediapipe/       手部辨識模型（MediaPipe Hand Landmarker）
foods/                  食物與營養素資料 ← 想擴充改這裡
tools/build-index.mjs   重新產生 foods/index.json 並檢查格式
sw.js / manifest        離線與「加到主畫面」支援
```

本機預覽：`python3 -m http.server`，再開 `http://localhost:8000`。

## 聲明

營養數值為近似值，份量為依圖形估算；健康資訊為一般性衛教內容，不能取代醫師或營養師的建議。
