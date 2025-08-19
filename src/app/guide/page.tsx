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
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            使用說明
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            簡單四步驟，輕鬆下載 YouTube 影片
          </p>
        </div>

        {/* 使用步驟 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            操作步驟
          </h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {step.description}
                      </p>
                      <ul className="space-y-1">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-sm text-gray-500 flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 使用技巧 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            使用技巧
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {tip.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 注意事項 */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-2">
                  重要提醒
                </h3>
                <div className="text-amber-700 space-y-2">
                  <p>• 請僅在遵守原平台與當地法規的前提下使用本服務</p>
                  <p>• 請尊重內容創作者的權利，僅作個人、合規的使用</p>
                  <p>• 本服務不支援下載受版權保護或私人的內容</p>
                  <p>• 如遇到技術問題，請稍後再試或檢查網路連線</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            開始使用
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}