# YTDownloadXPRO

一個專注於提供簡潔、高效 YouTube 影片下載服務的現代化網頁應用程式。採用 Next.js 14 構建，追求極致精美、流暢、操作直覺、零干擾的使用體驗。

## ✨ 核心特色

- 🎯 **極簡設計** - 品牌調性簡潔、高級、專注、可信賴
- 📱 **完美響應式** - 支援手機、平板、桌機的最佳體驗
- 🎬 **智慧畫質選擇** - 自動偵測最高可用畫質，支援多種解析度
- ⚡ **即時進度追蹤** - 清楚顯示檢查、處理、下載各階段狀態
- 🛡️ **完善錯誤處理** - 友善的錯誤訊息和恢復機制
- ♿ **無障礙設計** - 符合 WCAG 標準的可近用性
- 🚀 **效能優化** - 使用 Next.js 14 App Router 和現代化工具鏈

## 🛠️ 技術棧

- **框架**: Next.js 14 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **測試**: Jest + React Testing Library
- **部署**: Vercel
- **影片處理**: ytdl-core

## 🚀 快速開始

### 環境需求

- Node.js 18.0 或更高版本
- npm 或 yarn 或 pnpm

### 安裝步驟

1. **克隆專案**
   ```bash
   git clone <your-repo-url>
   cd ytdownload-xpro
   ```

2. **安裝依賴**
   ```bash
   npm install
   # 或
   yarn install
   # 或
   pnpm install
   ```

3. **設定環境變數**
   ```bash
   cp .env.example .env.local
   # 編輯 .env.local 填入必要的環境變數
   ```

4. **啟動開發伺服器**
   ```bash
   npm run dev
   # 或
   yarn dev
   # 或
   pnpm dev
   ```

5. **開啟瀏覽器**
   
   訪問 [http://localhost:3000](http://localhost:3000) 查看應用程式

## 📝 可用指令

```bash
# 開發
npm run dev          # 啟動開發伺服器 (使用 Turbopack)
npm run build        # 建置生產版本
npm run start        # 啟動生產伺服器

# 程式碼品質
npm run lint         # 執行 ESLint 檢查
npm run format       # 格式化程式碼
npm run format:check # 檢查程式碼格式

# 測試
npm run test         # 執行測試
npm run test:watch   # 監視模式執行測試
npm run test:coverage # 執行測試並生成覆蓋率報告
```

## 🏗️ 專案結構

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   ├── check-video/   # 影片資訊檢查
│   │   └── download/      # 影片下載
│   ├── globals.css        # 全域樣式
│   ├── layout.tsx         # 根佈局
│   └── page.tsx          # 首頁
├── components/            # React 元件
│   ├── ui/               # 基礎 UI 元件
│   ├── layout/           # 佈局元件
│   └── ...               # 功能元件
├── hooks/                # 自定義 React Hooks
├── lib/                  # 工具函式和配置
└── types/                # TypeScript 型別定義
```

## 🚀 部署到 Vercel

### 自動部署 (推薦)

1. **連接 GitHub**
   - 前往 [Vercel Dashboard](https://vercel.com/dashboard)
   - 點擊 "New Project"
   - 選擇你的 GitHub 儲存庫

2. **配置專案**
   - Framework Preset: Next.js
   - Root Directory: `./` (預設)
   - Build Command: `npm run build` (預設)
   - Output Directory: `.next` (預設)

3. **設定環境變數**
   - 在 Vercel 專案設定中添加必要的環境變數
   - 參考 `.env.example` 文件

4. **部署**
   - 點擊 "Deploy" 按鈕
   - 等待建置完成

### 手動部署

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入 Vercel
vercel login

# 部署
vercel

# 部署到生產環境
vercel --prod
```

## 🧪 測試

專案包含完整的測試套件：

```bash
# 執行所有測試
npm run test

# 監視模式
npm run test:watch

# 生成覆蓋率報告
npm run test:coverage
```

測試覆蓋範圍：
- 元件單元測試
- Hook 測試
- API 路由測試
- 整合測試

## 🔧 配置說明

### Vercel 配置 (`vercel.json`)

- API 函式超時設定為 30 秒
- CORS 頭部配置
- 路由重寫規則

### Next.js 配置 (`next.config.ts`)

- 圖片優化設定
- 安全頭部配置
- 效能優化選項

## 🤝 貢獻指南

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權

此專案採用 MIT 授權 - 查看 [LICENSE](LICENSE) 文件了解詳情。

## 🐛 問題回報

如果你發現任何問題，請在 [Issues](https://github.com/your-username/ytdownload-xpro/issues) 頁面回報。

## 📞 聯絡資訊

- 專案連結: [https://github.com/your-username/ytdownload-xpro](https://github.com/your-username/ytdownload-xpro)
- 線上展示: [https://your-app.vercel.app](https://your-app.vercel.app)
