# MediaPipe Hand Landmarker

拍照測量手掌時用來辨識手部位置，全部在手機上執行，照片不會上傳。

- `vision_bundle.mjs`、`wasm/`：來自 npm 套件 `@mediapipe/tasks-vision@0.10.14`（Apache-2.0）
- `hand_landmarker.task`：Google 提供的手部關鍵點模型（float16, v1，Apache-2.0）
  <https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task>
