import React from 'react';
import { Download, Shield, Zap, Heart, CheckCircle, Star, Users, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Download,
      title: '多格式支援',
      description: '支援MP4、MP3、WEBM等多種格式，滿足不同需求'
    },
    {
      icon: Zap,
      title: '極速下載',
      description: '採用先進技術，確保最快的下載速度和最佳體驗'
    },
    {
      icon: Shield,
      title: '安全可靠',
      description: '無需安裝軟體，直接在瀏覽器中使用，保護您的設備安全'
    },
    {
      icon: Heart,
      title: '完全免費',
      description: '永久免費使用，無隱藏費用，無需註冊或登入'
    }
  ];

  const steps = [
    {
      step: '1',
      title: '複製YouTube網址',
      description: '從YouTube複製您想要下載的影片網址'
    },
    {
      step: '2', 
      title: '貼上網址',
      description: '將網址貼到我們的輸入框中，點擊檢查影片'
    },
    {
      step: '3',
      title: '選擇格式',
      description: '選擇您需要的畫質和格式（MP4、MP3等）'
    },
    {
      step: '4',
      title: '開始下載',
      description: '點擊下載按鈕，影片將自動下載到您的設備'
    }
  ];

  const stats = [
    {
      icon: Users,
      number: '500K+',
      label: '滿意用戶'
    },
    {
      icon: Download,
      number: '1M+',
      label: '影片下載'
    },
    {
      icon: Globe,
      number: '50+',
      label: '支援國家'
    },
    {
      icon: Star,
      number: '4.9',
      label: '用戶評分'
    }
  ];

  const faqs = [
    {
      question: '這個服務是免費的嗎？',
      answer: '是的，YTDownloadXPRO完全免費使用，無需註冊或付費。'
    },
    {
      question: '支援哪些影片格式？',
      answer: '我們支援MP4、MP3、WEBM等多種格式，以及從360p到4K的各種解析度。'
    },
    {
      question: '下載的影片品質如何？',
      answer: '我們提供原始品質的影片下載，包括高清1080p、4K等高品質選項。'
    },
    {
      question: '使用這個服務安全嗎？',
      answer: '絕對安全。我們不會儲存您的個人資訊或下載記錄，所有處理都在您的瀏覽器中完成。'
    },
    {
      question: '有下載數量限制嗎？',
      answer: '沒有限制。您可以下載任意數量的影片，我們不會限制使用次數。'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-2xl">
                <Download className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              關於 YTDownloadXPRO
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              專業、安全、快速的YouTube影片下載解決方案
              <br className="hidden sm:block" />
              讓您輕鬆保存喜愛的影片內容
            </p>

            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-900 hover:bg-gray-100"
              onClick={() => navigate('/')}
            >
              立即開始使用
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-blue-900 to-red-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              為什麼選擇我們？
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我們致力於提供最優質的YouTube下載體驗
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} hover className="text-center h-full">
                  <CardContent className="p-8">
                    <div className="bg-gradient-to-r from-blue-900 to-red-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              如何使用？
            </h2>
            <p className="text-xl text-gray-600">
              簡單四步驟，輕鬆下載YouTube影片
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-900 to-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              常見問題
            </h2>
            <p className="text-xl text-gray-600">
              解答您可能遇到的疑問
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-blue-900 to-red-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            準備好開始了嗎？
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            立即體驗最專業的YouTube下載服務
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-4"
            onClick={() => navigate('/')}
          >
            開始下載影片
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;