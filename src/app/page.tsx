'use client';

import { MainLayout } from '@/components/layout';
import { HomeDownloadSection } from '@/components/HomeDownloadSection';

export default function Home() {
  return (
    <MainLayout>
      {/* 超級現代化主視覺 */}
      <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
        {/* 動態背景裝飾元素 */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 浮動光點 */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60" />
          <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-float opacity-80" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-float opacity-70" style={{ animationDelay: '3s' }} />
          
          {/* 漸變光暈 */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse opacity-60" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '2s' }} />
        </div>

        {/* 主要內容 */}
        <div className="w-full max-w-6xl mx-auto text-center space-y-16 relative z-10">
          {/* 超級精美品牌標識 */}
          <div className="space-y-8 animate-fade-in">
            <div className="relative inline-block">
              {/* 發光背景 */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-2xl animate-glow opacity-50" />
              
              {/* 主標題 */}
              <h1 className="relative text-8xl md:text-10xl font-black tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-700">
                  YTD
                </span>
                <span className="text-white animate-pulse">X</span>
              </h1>
              
              {/* 副標題 */}
              <p className="relative text-xl md:text-2xl font-light text-gray-300 mt-6 opacity-90">
                <span className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  超級精美的 YouTube 影片下載工具
                </span>
              </p>
            </div>
          </div>

          {/* 超級現代化下載核心功能 */}
          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <HomeDownloadSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}