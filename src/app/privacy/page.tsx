import { MainLayout } from '@/components/layout';

export default function PrivacyPage() {
	return (
		<MainLayout>
			<div className="max-w-3xl mx-auto py-12 px-4">
				<h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg mb-8 text-center animate-fade-in">
					隱私政策
				</h1>
				<div className="bg-gray-900/80 rounded-2xl shadow-2xl p-8 border border-white/10 backdrop-blur-xl animate-slide-up space-y-4 text-gray-300">
					<p>我們重視您的隱私。本網站不會蒐集個人識別資訊，伺服器紀錄僅用於服務維護與效能分析。</p>
					<p>如對本政策有任何疑問，請聯繫：<a href="mailto:support@ytdownloadxpro.com" className="underline hover:text-primary-300">support@ytdownloadxpro.com</a></p>
				</div>
			</div>
		</MainLayout>
	);
}
