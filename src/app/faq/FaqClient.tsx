'use client';

import { MainLayout } from '@/components/layout';
import { useState } from 'react';

const FAQS = [
  { category: '下載', q: '支援哪些影片格式？', a: '目前支援 YouTube 上的所有公開影片，輸出格式為 MP4。' },
  { category: '下載', q: '可以下載播放清單嗎？', a: '目前僅支援單一影片下載，不支援播放清單。' },
  { category: '畫質', q: '支援哪些畫質？', a: '支援從 144p 到 4K 的各種畫質，實際可用畫質取決於原影片。' },
  { category: '帳號', q: '需要註冊帳號嗎？', a: '不需要！完全免費，無需註冊即可使用。' },
  { category: '限制', q: '可以下載私人影片嗎？', a: '無法下載私人影片、年齡限制影片或有地區限制的影片。' },
  { category: '授權', q: '下載的影片可以商用嗎？', a: '請遵守 YouTube 條款與當地法規，建議僅作個人、非商業用途。' },
  { category: '錯誤', q: '遇到錯誤怎麼辦？', a: '請檢查網址是否正確，確認影片為公開狀態。如問題持續，請稍後再試。' },
];

const CATEGORIES = Array.from(new Set(FAQS.map(f => f.category)));

export default function FaqClient() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('全部');

  const filtered = FAQS.filter(f =>
    (category === '全部' || f.category === category) &&
    (f.q.includes(search) || f.a.includes(search))
  );

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg mb-12 text-center animate-fade-in">
          常見問題
        </h1>
        {/* 搜尋與分類區塊 */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 animate-fade-in">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜尋問題關鍵字..."
            className="px-4 py-3 rounded-xl bg-gray-800/80 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-500 shadow-inner w-full sm:w-72"
            aria-label="搜尋常見問題"
          />
          <div className="flex gap-2 flex-wrap">
            <button
              className={`px-4 py-2 rounded-lg font-medium border transition-all duration-200 text-sm ${category === '全部' ? 'bg-gradient-to-r from-primary-700 to-fuchsia-700 text-white border-primary-700 shadow-lg' : 'bg-gray-900/80 text-primary-200 border-white/10 hover:bg-primary-900/40 hover:text-white'}`}
              onClick={() => setCategory('全部')}
              aria-pressed={category === '全部'}
            >全部</button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg font-medium border transition-all duration-200 text-sm ${category === cat ? 'bg-gradient-to-r from-primary-700 to-fuchsia-700 text-white border-primary-700 shadow-lg' : 'bg-gray-900/80 text-primary-200 border-white/10 hover:bg-primary-900/40 hover:text-white'}`}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
              >{cat}</button>
            ))}
          </div>
        </div>
        {/* FAQ 區塊 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {filtered.length === 0 && (
            <div className="col-span-2 text-center text-gray-400">查無相關問題</div>
          )}
          {filtered.map((faq, i) => (
            <div
              key={faq.q}
              className="rounded-2xl bg-gray-900/80 p-8 shadow-xl border border-white/10 animate-fade-in hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              style={{ animationDelay: `${i * 0.06}s` }}
              tabIndex={0}
              aria-label={faq.q}
            >
              <h2 className="text-lg font-bold text-primary-200 mb-2 group-hover:text-white transition-colors duration-200">{faq.q}</h2>
              <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-200">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
