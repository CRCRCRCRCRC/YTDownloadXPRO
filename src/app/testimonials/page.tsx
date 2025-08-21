import { MainLayout } from '@/components/layout';

export default function TestimonialsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg mb-8 text-center">
          用戶見證
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 見證卡片區塊（預留） */}
          <div className="rounded-xl bg-gray-900/80 p-6 shadow-lg border border-white/10 min-h-[120px] animate-fade-in" />
          <div className="rounded-xl bg-gray-900/80 p-6 shadow-lg border border-white/10 min-h-[120px] animate-fade-in" />
        </div>
      </div>
    </MainLayout>
  );
}
