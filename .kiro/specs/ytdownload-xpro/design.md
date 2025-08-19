# 設計文件

## 概述

YTDownloadXPRO 是一個單頁應用程式（SPA），專注於提供簡潔、高效的 YouTube 影片下載服務。設計採用現代化的響應式網頁設計原則，強調使用者體驗的流暢性和視覺的精緻度。

## 架構

### 前端架構
- **單頁應用程式（SPA）**：使用現代前端框架構建
- **組件化設計**：將 UI 拆分為可重用的組件
- **狀態管理**：集中管理應用程式狀態
- **響應式設計**：支援多種裝置尺寸

### 後端架構
- **RESTful API**：提供影片資訊檢查和下載服務
- **無狀態設計**：每個請求都是獨立的
- **錯誤處理**：統一的錯誤回應格式

## 組件與介面

### 1. 應用程式主要組件

#### Header 組件
```
Header
├── Logo (品牌標識)
├── Navigation (導覽連結)
└── MobileMenu (行動版選單)
```

**功能**：
- 顯示品牌 Logo 和名稱
- 提供「常見問題」和「使用說明」連結
- 響應式導覽選單

#### MainContent 組件
```
MainContent
├── VideoInput (影片輸入區)
├── VideoResult (結果顯示區)
└── DownloadProgress (下載進度區)
```

**功能**：
- 管理主要的使用者互動流程
- 控制不同階段的 UI 顯示

#### VideoInput 組件
```
VideoInput
├── InputField (輸入框)
├── CheckButton (檢查按鈕)
└── HelpText (輔助說明)
```

**功能**：
- URL 輸入和驗證
- 觸發影片檢查請求

#### VideoResult 組件
```
VideoResult
├── VideoInfo (影片資訊)
├── QualitySelector (畫質選擇器)
└── DownloadButton (下載按鈕)
```

**功能**：
- 顯示影片詳細資訊
- 提供畫質選擇選項
- 觸發下載流程

#### Footer 組件
```
Footer
└── LegalNotice (法律聲明)
```

**功能**：
- 顯示使用條款和法律聲明

### 2. 狀態管理

#### 應用程式狀態
```typescript
interface AppState {
  currentStep: 'input' | 'checking' | 'result' | 'downloading' | 'completed'
  videoData: VideoData | null
  selectedQuality: QualityOption | null
  downloadProgress: number
  error: string | null
  loading: boolean
}
```

#### 影片資料結構
```typescript
interface VideoData {
  id: string
  title: string
  thumbnail: string
  duration: string
  uploader: string
  availableQualities: QualityOption[]
  maxQuality: string
}

interface QualityOption {
  resolution: string
  fileSize: string
  format: string
}
```

### 3. API 介面設計

#### 影片檢查 API
```
POST /api/check-video
Content-Type: application/json

Request:
{
  "url": "https://www.youtube.com/watch?v=..."
}

Response (成功):
{
  "success": true,
  "data": {
    "id": "video_id",
    "title": "影片標題",
    "thumbnail": "縮圖 URL",
    "duration": "10:30",
    "uploader": "頻道名稱",
    "availableQualities": [
      {
        "resolution": "1080p",
        "fileSize": "150MB",
        "format": "mp4"
      }
    ],
    "maxQuality": "1080p"
  }
}

Response (錯誤):
{
  "success": false,
  "error": {
    "code": "INVALID_URL",
    "message": "這看起來不是有效的影片連結，請再試一次"
  }
}
```

#### 下載 API
```
POST /api/download
Content-Type: application/json

Request:
{
  "videoId": "video_id",
  "quality": "1080p"
}

Response:
{
  "success": true,
  "downloadUrl": "下載連結",
  "filename": "檔案名稱.mp4"
}
```

## 資料模型

### 使用者互動流程資料
```typescript
// 輸入階段
interface InputState {
  url: string
  isValid: boolean
  errorMessage?: string
}

// 檢查階段
interface CheckingState {
  isLoading: boolean
  progress: number
}

// 結果階段
interface ResultState {
  videoData: VideoData
  selectedQuality: QualityOption
}

// 下載階段
interface DownloadState {
  progress: number
  status: 'preparing' | 'processing' | 'packaging' | 'completed'
  downloadUrl?: string
}
```

### 錯誤處理資料模型
```typescript
interface ErrorState {
  type: 'validation' | 'network' | 'server' | 'unsupported'
  message: string
  recoverable: boolean
}
```

## 錯誤處理

### 1. 輸入驗證錯誤
- **空白輸入**：顯示「請先貼上 YouTube 影片網址」
- **格式錯誤**：顯示「這看起來不是有效的影片連結，請再試一次」
- **播放清單**：顯示「目前版本僅支援單一影片，請貼上單支影片的網址」

### 2. 網路錯誤
- **連線失敗**：顯示「網路連線異常，請檢查網路後重試」
- **逾時**：顯示「請求逾時，請稍後再試」

### 3. 伺服器錯誤
- **影片無法存取**：顯示「暫時無法檢查此影片，請稍後再試」
- **不支援內容**：顯示「目前無法處理此類型影片」

### 4. 錯誤恢復機制
- 提供「重試」按鈕
- 自動清除錯誤狀態
- 保留使用者輸入內容

## 測試策略

### 1. 單元測試
- **組件測試**：測試每個 React 組件的渲染和互動
- **工具函數測試**：測試 URL 驗證、格式化等工具函數
- **狀態管理測試**：測試狀態更新邏輯

### 2. 整合測試
- **API 整合**：測試前後端 API 呼叫
- **使用者流程**：測試完整的使用者互動流程
- **錯誤處理**：測試各種錯誤情境

### 3. 端對端測試
- **主要流程**：測試從輸入到下載的完整流程
- **響應式設計**：測試不同裝置尺寸的使用體驗
- **可近用性**：測試鍵盤導覽和螢幕閱讀器相容性

### 4. 效能測試
- **載入速度**：測試頁面載入時間
- **互動回應**：測試使用者操作的回應時間
- **記憶體使用**：監控記憶體洩漏

## 視覺設計規範

### 1. 色彩系統
```css
:root {
  /* 主要色彩 */
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  
  /* 中性色彩 */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  
  /* 狀態色彩 */
  --success-color: #10b981;
  --error-color: #ef4444;
  --warning-color: #f59e0b;
}
```

### 2. 字體系統
```css
:root {
  /* 字體家族 */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* 字體大小 */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  
  /* 行高 */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
}
```

### 3. 間距系統
```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
}
```

### 4. 陰影系統
```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

### 5. 圓角系統
```css
:root {
  --radius-sm: 0.125rem;
  --radius: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;
}
```

## 動畫與過渡效果

### 1. 過渡時間
```css
:root {
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
}
```

### 2. 緩動函數
```css
:root {
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 3. 微互動設計
- **按鈕點擊**：輕微縮放 (scale: 0.98) + 陰影變化
- **載入狀態**：骨架屏 + 脈衝動畫
- **成功回饋**：淡入 + 輕微彈跳效果
- **錯誤提示**：輕微搖晃 + 顏色變化

## 響應式設計

### 1. 斷點系統
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### 2. 佈局策略
- **手機 (< 640px)**：單欄佈局，全寬度組件
- **平板 (640px - 1024px)**：適中寬度，保持舒適邊距
- **桌機 (> 1024px)**：最大寬度限制，置中對齊

### 3. 組件響應式行為
- **輸入框**：在小螢幕上佔滿寬度，大螢幕上限制最大寬度
- **結果卡片**：小螢幕垂直堆疊，大螢幕水平排列
- **按鈕**：保持適當的觸控目標大小 (最小 44px)

## 可近用性設計

### 1. 鍵盤導覽
- 所有互動元素都可透過 Tab 鍵存取
- 清楚的焦點指示器
- 合理的 Tab 順序

### 2. 螢幕閱讀器支援
- 語意化 HTML 標籤
- 適當的 ARIA 標籤
- 替代文字和描述

### 3. 色彩對比
- 文字與背景對比度至少 4.5:1
- 重要資訊不僅依賴顏色傳達
- 支援高對比模式

### 4. 字體與間距
- 最小字體大小 16px
- 充足的行間距 (1.5倍)
- 適當的段落間距