import { Metadata } from 'next';
import { MainLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: '常見問題',
  description: 'YTDownloadXPRO 常見問題解答，幫助您更好地使用我們的服務',
};

const faqs = [
  {
    question: '支援哪些影片格式？',
    answer: '目前支援 YouTube 上的所有公開影片，輸出格式為 MP4。'
  },
  {
    question: '可以下載播放清單嗎？',
    answer: '目前版本僅支援單一影片下載，不支援播放清單。請貼上單支影片的網址。'
  },
  {
    question: '支援哪些畫質？',
    answer: '支援從 144p 到 4K 的各種畫質，具體可用畫質取決於原影片的上傳品質。'
  },
  {
    question: '下載速度如何？',
    answer: '下載速度取決於影片大小和您的網路連線速度。我們會盡力提供最佳的下載體驗。'
  },
  {
    question: '是否需要註冊帳號？',
    answer: '不需要！我們提供完全免費的服務，無需註冊即可使用。'
  },
  {
    question: '可以下載私人影片嗎？',
    answer: '無法下載私人影片、年齡限制影片或有地區限制的影片。'
  },
  {
    question: '下載的影片可以商用嗎？',
    answer: '請遵守 YouTube 的服務條款和當地法規。建議僅作個人、非商業用途使用。'
  },
  {
    question: '遇到錯誤怎麼辦？',
    answer: '請檢查影片網址是否正確，確認影片為公開狀態。如果問題持續，請稍後再試。'
  }
];

export default function FAQPage() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg mb-8 text-center">
          常見問題
        </h1>
        {/* 搜尋與分類區塊（預留） */}
        <div className="bg-gray-900/80 rounded-xl shadow-lg border border-white/10 p-6 mb-8 animate-fade-in min-h-[80px]" />
        {/* FAQ 區塊（預留） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl bg-gray-900/80 p-6 shadow-lg border border-white/10 min-h-[120px] animate-fade-in" />
          <div className="rounded-xl bg-gray-900/80 p-6 shadow-lg border border-white/10 min-h-[120px] animate-fade-in" />
        </div>
      </div>
    </MainLayout>
  );
}