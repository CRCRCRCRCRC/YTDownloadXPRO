# Vercel 環境變數設定指南

為了確保應用在 Vercel 上正常運行，請在 Vercel 專案設定中添加以下環境變數：

## 必要的環境變數

### Supabase 配置
```
SUPABASE_URL=https://jgldsbhputvzummifejp.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnbGRzYmhwdXR2enVtbWlmZWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNDExNTEsImV4cCI6MjA3MDkxNzE1MX0.rw9aXlTY-RvCLZBWxrEnn_8XvTl0BHV9gZ8Rk6-Emzc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnbGRzYmhwdXR2enVtbWlmZWpwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTM0MTE1MSwiZXhwIjoyMDcwOTE3MTUxfQ.70Soqh3oyfvWeUbTbuC6h6AmOm8liwMahqDvbwxjDA8
```

### YouTube 配置
```
YT_ACCEPT_LANGUAGE=zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7
YT_DEBUG=false
```

### 伺服器配置
```
NODE_ENV=production
```

## 可選的環境變數

### YouTube Cookie (如果遇到機器人檢測)
```
YT_COOKIE=你的YouTube Cookie內容
```

## 設定步驟

1. 登入 Vercel Dashboard
2. 選擇您的專案
3. 前往 Settings > Environment Variables
4. 添加上述環境變數
5. 重新部署專案

## 重要提醒

- `YT_DEBUG=false` 是必要的，因為 Vercel 環境是唯讀的
- 不要在 GitHub 儲存庫中提交真實的 API 金鑰
- 使用 Vercel 的環境變數功能來安全地儲存敏感資訊