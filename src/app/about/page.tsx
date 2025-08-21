import { MainLayout } from '@/components/layout';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg mb-8 text-center">
          關於我們
        </h1>
        <div className="bg-gray-900/80 rounded-xl shadow-lg border border-white/10 p-8 mb-8 animate-fade-in min-h-[180px]">
          {/* 品牌故事區塊（預留） */}
        </div>
        <div className="bg-gray-900/80 rounded-xl shadow-lg border border-white/10 p-8 animate-fade-in min-h-[120px]">
          {/* 聯絡資訊區塊（預留） */}
        </div>
      </div>
    </MainLayout>
  );
}
