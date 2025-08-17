import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, Play, Star, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Loading } from '../components/ui/Loading';
import { useVideoStore } from '../store/useVideoStore';
import apiService from '../services/api';

const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const { setCurrentVideo, setLoading, setError, isLoading, error } = useVideoStore();

  const validateYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('請輸入YouTube影片網址');
      return;
    }

    if (!validateYouTubeUrl(url)) {
      setError('請輸入有效的YouTube影片網址');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await apiService.getVideoInfo(url);
      
      if (response.success && response.data) {
        setCurrentVideo(response.data);
        navigate('/download');
      } else {
        const errorMsg = response.error || '無法獲取影片資訊';
        if (errorMsg.includes('Invalid')) {
          setError('無效的YouTube網址，請檢查網址格式');
        } else if (errorMsg.includes('private') || errorMsg.includes('unavailable')) {
          setError('此影片為私人影片或已被移除');
        } else if (errorMsg.includes('region')) {
          setError('此影片在您的地區不可用');
        } else {
          setError(errorMsg);
        }
      }
    } catch (error) {
      console.error('API Error:', error);
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          setError('無法連接到服務器，請檢查網路連線');
        } else {
          setError(`錯誤：${error.message}`);
        }
      } else {
        setError('網路錯誤，請稍後再試');
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Download,
      title: '高品質下載',
      description: '支援多種解析度，包括4K、1080p、720p等'
    },
    {
      icon: Play,
      title: '多格式支援',
      description: '支援MP4、MP3等多種格式下載'
    },
    {
      icon: Clock,
      title: '快速處理',
      description: '先進的技術確保快速下載體驗'
    },
    {
      icon: Star,
      title: '免費使用',
      description: '完全免費，無需註冊或付費'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-red-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-2xl shadow-2xl">
                <Download className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-900 to-red-600 bg-clip-text text-transparent">
                YTDownloadXPRO
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              專業的YouTube影片下載工具，支援多種格式和解析度，
              <br className="hidden sm:block" />
              讓您輕鬆下載喜愛的影片內容
            </p>

            {/* URL Input Form */}
            <Card className="max-w-2xl mx-auto mb-16 shadow-2xl border-0">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="url"
                      placeholder="請輸入YouTube影片網址 (例如: https://www.youtube.com/watch?v=...)"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      icon={<Search className="h-5 w-5 text-gray-400" />}
                      error={error || undefined}
                      className="text-lg py-4"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full text-lg py-4"
                    disabled={!url.trim()}
                  >
                    {isLoading ? '分析中...' : '檢查影片'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">1M+</div>
                <div className="text-gray-600">影片已下載</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">500K+</div>
                <div className="text-gray-600">滿意用戶</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">99.9%</div>
                <div className="text-gray-600">成功率</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              為什麼選擇 YTDownloadXPRO？
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我們提供最專業、最可靠的YouTube下載服務
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

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            立即開始下載您的影片
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            簡單、快速、免費 - 只需要一個YouTube網址
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-4"
            onClick={() => document.querySelector('input')?.focus()}
          >
            開始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;