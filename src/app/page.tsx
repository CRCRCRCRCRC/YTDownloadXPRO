'use client';

import { MainLayout } from '@/components/layout';
import { HomeDownloadSection } from '@/components/HomeDownloadSection';

export default function Home() {
  return (
    <MainLayout>
      {/* 極簡主視覺 - 純淨無雜質 */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          {/* 品牌標識 - 超級簡潔 */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
                YTD
              </span>
              <span className="text-white/90">X</span>
            </h1>
            <p className="text-xl text-gray-300/80 font-light tracking-wide">
              極致純淨 · 無與倫比
            </p>
          </div>

          {/* 下載核心功能 - 超級精美 */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <HomeDownloadSection />
          </div>

          {/* 微妙的底部裝飾 */}
          <div className="pt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex justify-center items-center space-x-8 text-gray-500/30">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
              <span className="text-sm font-light tracking-widest">SIMPLICITY IS THE ULTIMATE SOPHISTICATION</span>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}