import { Metadata } from 'next';
import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: '使用教學',
  description: '四步驟輕鬆下載：貼上網址、檢查影片、選擇畫質、一鍵下載。',
};

const STEPS = [
  {
    icon: (
      <svg className="w-10 h-10 text-primary-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12h16M12 4v16" /></svg>
    ),
    title: '貼上網址',
    desc: '複製 YouTube 影片網址，貼到首頁輸入框。',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-fuchsia-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
    ),
    title: '檢查影片',
    desc: '系統自動解析影片資訊，顯示可用畫質。',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M3 9h18" /></svg>
    ),
    title: '選擇畫質',
    desc: '挑選你想要的解析度，支援最高 4K。',
  },
  {
    icon: (
      <svg className="w-10 h-10 text-green-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
    ),
    title: '一鍵下載',
    desc: '點擊下載，享受極速、無廣告的體驗。',
  },
];

export default function GuidePage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg mb-12 text-center animate-fade-in">
          使用教學
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-16">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl bg-gray-900/80 p-8 shadow-xl border border-white/10 flex flex-col items-center gap-4 animate-slide-up hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              style={{ animationDelay: `${i * 0.08}s` }}
              tabIndex={0}
              aria-label={step.title}
            >
              <div className="mb-2 group-hover:animate-bounce-gentle">{step.icon}</div>
              <h2 className="text-xl font-bold text-primary-200 mb-2 group-hover:text-white transition-colors duration-200">{step.title}</h2>
              <p className="text-gray-300 text-center group-hover:text-gray-100 transition-colors duration-200">{step.desc}</p>
            </div>
          ))}
        </div>
        {/* 補充教學/小技巧區塊 */}
        <div className="bg-gradient-to-br from-primary-900/60 via-fuchsia-900/40 to-indigo-900/60 rounded-2xl shadow-2xl p-10 border border-white/10 backdrop-blur-xl animate-fade-in">
          <h2 className="text-lg font-bold text-primary-200 mb-4">小技巧</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>高畫質檔案較大，建議 Wi-Fi 環境下載。</li>
            <li>遇到解析失敗，請確認網址正確且影片為公開狀態。</li>
            <li>本服務僅供個人學習、非商業用途，請尊重原創。</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}