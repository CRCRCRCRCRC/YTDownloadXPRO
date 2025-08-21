import { Metadata } from 'next';
import { MainLayout } from '@/components/layout';

export const metadata: Metadata = {
  title: '用戶見證',
  description: '使用者真實回饋：極美介面、絲滑體驗、快速下載。',
};

const TESTIMONIALS = [
	{ name: 'Alex', role: '設計師', quote: '介面超美、超順，下載流程一氣呵成。', color: 'from-primary-700 to-fuchsia-700' },
	{ name: 'Mia', role: '創作者', quote: '畫質選擇很直覺，下載速度也非常快。', color: 'from-indigo-700 to-purple-700' },
	{ name: 'Ken', role: '學生', quote: '完全無廣告，體驗超好，值得推薦！', color: 'from-emerald-700 to-teal-700' },
];

export default function TestimonialsPage() {
	return (
		<MainLayout>
			<div className="max-w-4xl mx-auto py-12 px-4">
				<h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg mb-12 text-center animate-fade-in">
					用戶見證
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{TESTIMONIALS.map((t, i) => (
						<div key={t.name} className="rounded-2xl bg-gray-900/80 p-8 shadow-xl border border-white/10 animate-fade-in hover:scale-105 transition-transform duration-300">
							<div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} mb-4 shadow-lg`} />
							<p className="text-gray-200 leading-relaxed mb-4">“{t.quote}”</p>
							<div className="text-sm text-gray-400">{t.name} ・ {t.role}</div>
						</div>
					))}
				</div>
			</div>
		</MainLayout>
	);
}
