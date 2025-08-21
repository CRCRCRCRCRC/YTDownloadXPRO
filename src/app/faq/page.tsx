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
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg animate-fade-in">
            常見問題
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            以下是使用者最常詢問的問題，希望能幫助您更好地使用我們的服務
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-2xl transition-shadow duration-300 animate-slide-up">
              <CardContent className="p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-primary-200 mb-3">
                  {faq.question}
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Card className="bg-primary-900/80 border-primary-700">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-primary-200 mb-2">
                還有其他問題？
              </h2>
              <p className="text-gray-300 mb-4">
                如果您的問題沒有在上面找到答案，歡迎查看使用說明或稍後再試。
              </p>
              <a
                href="/guide"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-700 to-fuchsia-700 text-white rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                查看使用說明
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}