'use client';

import { MainLayout } from '@/components/layout';
import { HomeDownloadSection } from '@/components/HomeDownloadSection';

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* 品牌主視覺區 */}
        <section className="relative text-center mb-20">
          <div className="absolute inset-0 -z-10 animate-pulse bg-gradient-to-br from-primary-900/60 via-fuchsia-900/40 to-indigo-900/60 blur-2xl rounded-3xl" />
          <div className="relative inline-block px-8 py-12 rounded-3xl shadow-2xl bg-gray-900/80 border border-white/10 backdrop-blur-xl animate-fade-in">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-2xl mb-4 animate-shimmer" aria-label="YTDownloadXPRO">
              YTDownloadXPRO
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-200 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              最精美、最絲滑的 YouTube 影片下載服務
            </p>
          </div>
        </section>
        {/* 下載區 */}
        <section className="mb-20 animate-slide-up">
          <HomeDownloadSection />
        </section>
        {/* 功能亮點區 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-primary-200 mb-10 text-center animate-fade-in">功能亮點</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1,2,3,4].map((i) => (
              <div key={i} className="rounded-2xl bg-gray-900/80 p-8 shadow-xl border border-white/10 flex flex-col items-center gap-4 animate-slide-in-left hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-700 to-fuchsia-700 flex items-center justify-center mb-2 shadow-lg animate-pulse" />
                <div className="h-5 w-32 bg-gray-800/60 rounded mb-2 animate-shimmer" />
                <div className="h-4 w-48 bg-gray-800/40 rounded animate-shimmer" />
              </div>
            ))}
          </div>
        </section>
        {/* 操作流程區 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-primary-200 mb-10 text-center animate-fade-in">操作流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1,2,3,4].map((i) => (
              <div key={i} className="rounded-2xl bg-gray-900/80 p-6 shadow-lg border border-white/10 flex flex-col items-center gap-3 animate-slide-up hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-700 to-fuchsia-700 flex items-center justify-center text-white font-bold text-lg shadow-md animate-bounce-gentle">{i}</div>
                <div className="h-4 w-24 bg-gray-800/60 rounded animate-shimmer" />
                <div className="h-3 w-32 bg-gray-800/40 rounded animate-shimmer" />
              </div>
            ))}
          </div>
        </section>
        {/* 用戶見證區 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-primary-200 mb-10 text-center animate-fade-in">用戶見證</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1,2].map((i) => (
              <div key={i} className="rounded-2xl bg-gray-900/80 p-8 shadow-xl border border-white/10 animate-fade-in hover:scale-105 transition-transform duration-300">
                <div className="h-5 w-32 bg-gray-800/60 rounded mb-2 animate-shimmer" />
                <div className="h-4 w-48 bg-gray-800/40 rounded animate-shimmer" />
              </div>
            ))}
          </div>
        </section>
        {/* FAQ 精選區 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-primary-200 mb-10 text-center animate-fade-in">常見問題精選</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1,2].map((i) => (
              <div key={i} className="rounded-2xl bg-gray-900/80 p-6 shadow-lg border border-white/10 animate-fade-in hover:scale-105 transition-transform duration-300">
                <div className="h-4 w-32 bg-gray-800/60 rounded mb-2 animate-shimmer" />
                <div className="h-3 w-48 bg-gray-800/40 rounded animate-shimmer" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}