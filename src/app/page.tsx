'use client';

import { MainLayout } from '@/components/layout';
import { HomeDownloadSection } from '@/components/HomeDownloadSection';

export default function Home() {
  return (
    <MainLayout>
      {/* 簡潔主視覺 */}
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto text-center space-y-12">
          {/* 品牌標識 */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-7xl md:text-9xl font-black tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                YTD
              </span>
              <span className="text-white">X</span>
            </h1>
          </div>

          {/* 下載核心功能 - 加大框框 */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <HomeDownloadSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}