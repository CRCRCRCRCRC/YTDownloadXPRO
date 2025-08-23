'use client';

import { MainLayout } from '@/components/layout';
import { HomeDownloadSection } from '@/components/HomeDownloadSection';

export default function Home() {
  return (
    <MainLayout>
      {/* 超級現代化主視覺 */}
      <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
        {/* 簡潔的背景裝飾元素 */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 漸變光暈 */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse opacity-60" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '2s' }} />
        </div>

        {/* 主要內容 */}
        <div className="w-full max-w-6xl mx-auto text-center space-y-16 relative z-10">
          {/* 精美品牌標識 */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-8xl md:text-10xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                YTD
              </span>
              <span className="text-white">X</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-gray-300">
              專業的 YouTube 影片下載工具
            </p>
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