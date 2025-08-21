import { MainLayout } from '@/components/layout';

const FEATURES = [
  {
    icon: (
      <svg className="w-10 h-10 text-primary-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
    ),
    title: '極速下載',
    desc: '多線程技術，影片秒速到手，支援高畫質。',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-fuchsia-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
    ),
    title: '智慧畫質',
    desc: '自動偵測最高可用畫質，支援多種解析度。',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M3 9h18" /></svg>
    ),
    title: '無廣告干擾',
    desc: '全站無廣告，專注下載體驗，乾淨無打擾。',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-green-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
    ),
    title: '即時進度',
    desc: '清楚顯示檢查、處理、下載各階段狀態。',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-yellow-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5z" /><path d="M12 12V4" /></svg>
    ),
    title: '無障礙設計',
    desc: '符合 WCAG 標準，鍵盤操作、色彩對比佳。',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
    ),
    title: '免費開放',
    desc: '完全免費，無需註冊，立即體驗極致下載。',
  },
];

export default function FeaturesPage() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg mb-12 text-center animate-fade-in">
          功能亮點
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="rounded-2xl bg-gray-900/80 p-8 shadow-xl border border-white/10 flex flex-col items-center gap-4 animate-slide-up hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              style={{ animationDelay: `${i * 0.08}s` }}
              tabIndex={0}
              aria-label={f.title}
            >
              <div className="mb-2 group-hover:animate-bounce-gentle">{f.icon}</div>
              <h2 className="text-xl font-bold text-primary-200 mb-2 group-hover:text-white transition-colors duration-200">{f.title}</h2>
              <p className="text-gray-300 text-center group-hover:text-gray-100 transition-colors duration-200">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
