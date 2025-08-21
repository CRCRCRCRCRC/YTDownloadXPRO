import { Metadata } from 'next';
import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: '使用說明',
  description: 'YTDownloadXPRO 詳細使用說明，學習如何快速下載 YouTube 影片',
};

const steps = [
  {
    step: 1,
    title: '複製影片網址',
    description: '前往 YouTube，找到您想要下載的影片，複製影片網址。',
    details: [
      '支援標準 YouTube 網址 (youtube.com/watch?v=...)',
      '支援短網址 (youtu.be/...)',
      '不支援播放清單網址'
    ]
  },
  {
    step: 2,
    title: '貼上網址並檢查',
    description: '將複製的網址貼到輸入框中，點擊「檢查」按鈕。',
    details: [
      '系統會自動驗證網址格式',
      '檢查影片是否可以下載',
      '顯示影片基本資訊'
    ]
  },
  {
    step: 3,
    title: '選擇畫質',
    description: '查看影片資訊，選擇您需要的畫質選項。',
    details: [
      '系統會預設選擇最高可用畫質',
      '顯示每個畫質的檔案大小',
      '可根據需求選擇不同解析度'
    ]
  },
  {
    step: 4,
    title: '開始下載',
    description: '點擊「下載 MP4」按鈕，等待處理完成。',
    details: [
      '系統會顯示處理進度',
      '包含準備、處理、打包等階段',
      '完成後提供下載連結'
    ]
  }
];

const tips = [
  {
    title: '選擇合適的畫質',
    content: '高畫質檔案較大，下載時間較長。建議根據用途選擇：觀看選 720p/1080p，分享選 480p。'
  },
  {
    title: '檢查網路連線',
    content: '穩定的網路連線能確保下載順利進行。如遇到問題，請檢查網路後重試。'
  },
  {
    title: '遵守使用規範',
    content: '請僅下載您有權使用的內容，遵守 YouTube 服務條款和當地法規。'
  },
  {
    title: '處理錯誤訊息',
    content: '如遇到「影片無法存取」等錯誤，請確認影片為公開狀態且未被刪除。'
  }
];

export default function GuidePage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg mb-8 text-center">
          使用教學
        </h1>
        {/* 圖文教學區塊（預留） */}
        <div className="bg-gray-900/80 rounded-xl shadow-lg border border-white/10 p-8 mb-8 animate-fade-in min-h-[180px]" />
        <div className="bg-gray-900/80 rounded-xl shadow-lg border border-white/10 p-8 animate-fade-in min-h-[120px]" />
      </div>
    </MainLayout>
  );
}