import { Metadata } from 'next';
import { MainLayout } from '@/components/layout';

export const metadata: Metadata = {
  title: '關於我們',
  description: '我們追求極致體驗：極簡、優雅、絲滑的影片下載服務。',
};

export default function AboutPage() {
	return (
		<MainLayout>
			<div className="max-w-4xl mx-auto py-12 px-4">
				<h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg mb-12 text-center animate-fade-in">
					關於我們
				</h1>
				<div className="grid grid-cols-1 gap-8">
					<section className="bg-gray-900/80 rounded-2xl shadow-2xl p-8 border border-white/10 backdrop-blur-xl animate-slide-up">
						<h2 className="text-xl font-semibold text-primary-200 mb-3">品牌故事</h2>
						<p className="text-gray-300 leading-relaxed">YTDownloadXPRO 致力於以極簡、優雅及絲滑的體驗，提供使用者最直覺的影片下載服務。我們相信科技應該讓人感到愉悅，因此在每個細節上追求精緻與順暢。</p>
					</section>
					<section className="bg-gray-900/80 rounded-2xl shadow-2xl p-8 border border-white/10 backdrop-blur-xl animate-fade-in">
						<h2 className="text-xl font-semibold text-primary-200 mb-3">價值觀</h2>
						<ul className="list-disc list-inside text-gray-300 space-y-2">
							<li>專注體驗：以使用者需求為核心，設計每一個互動。</li>
							<li>極致效能：從速度到穩定性，皆達到一流水準。</li>
							<li>尊重規範：遵循平台條款與法規，倡導合規使用。</li>
						</ul>
					</section>
					<section className="bg-gray-900/80 rounded-2xl shadow-2xl p-8 border border-white/10 backdrop-blur-xl animate-fade-in">
						<h2 className="text-xl font-semibold text-primary-200 mb-3">聯絡我們</h2>
						<p className="text-gray-300">有任何建議或合作意向，歡迎來信：<a href="mailto:support@ytdownloadxpro.com" className="underline hover:text-primary-300">support@ytdownloadxpro.com</a></p>
					</section>
					<div className="text-center animate-fade-in">
						<a href="/" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-700 to-fuchsia-700 text-white rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">開始使用</a>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
