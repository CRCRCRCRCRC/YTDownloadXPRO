# YTDownloadXPRO

一個專業的 YouTube 影片下載工具，支援多種格式和解析度。

## 🚀 功能特色

- 支援多種解析度下載（144p 到 4K）
- 自動音視頻合併
- 智能格式選擇
- 下載歷史記錄
- 響應式設計

## 🛠️ 技術棧

**前端:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand

**後端:**
- Node.js + Express
- ytdl-core
- FFmpeg
- Supabase

## 📦 安裝與運行

```bash
# 安裝依賴
npm install

# 開發模式（同時啟動前後端）
npm run dev

# 僅前端開發
npm run client:dev

# 僅後端開發
npm run server:dev

# 建置
npm run build
```

## ⚙️ 環境配置

複製 `.env` 文件並配置必要的環境變數：

```env
# Supabase 配置
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 伺服器配置
PORT=3002
NODE_ENV=development

# YouTube 配置
YT_ACCEPT_LANGUAGE=zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7
```

## 🔧 常見問題

### YouTube 機器人檢測

如果遇到「登入帳戶以確認你不是機器人」錯誤：

1. **等待重試**: 系統會自動重試，請等待幾分鐘
2. **嘗試其他影片**: 某些影片可能有特殊限制
3. **設定 Cookie** (進階): 如果問題持續，可以設定 YouTube Cookie

#### 設定 YouTube Cookie (可選)

1. 在瀏覽器中打開 YouTube
2. 開啟開發者工具 (F12)
3. 前往 Network 標籤
4. 重新載入頁面
5. 找到任一請求，複製 Cookie 標頭
6. 在 `.env` 文件中設定：

```env
YT_COOKIE=你複製的Cookie內容
```

### 測試 YouTube 服務

```bash
node test-youtube.js
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  extends: [
    // other configs...
    // Enable lint rules for React
    reactX.configs['recommended-typescript'],
    // Enable lint rules for React DOM
    reactDom.configs.recommended,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
