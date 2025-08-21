import { MainLayout } from '@/components/layout';

export default function TermsPage() {
	return (
		<MainLayout>
			<div className="max-w-3xl mx-auto py-12 px-4">
				<h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg mb-8 text-center animate-fade-in">
					服務條款
				</h1>
				<div className="bg-gray-900/80 rounded-2xl shadow-2xl p-8 border border-white/10 backdrop-blur-xl animate-slide-up space-y-4 text-gray-300">
					<p>使用本服務即表示您同意遵守適用法律與平台條款。本服務僅供個人、非商業用途，請勿用於侵害他人權利之行為。</p>
					<p>我們保留隨時調整或中止服務之權利。如有變更將於本頁通知。</p>
				</div>
			</div>
		</MainLayout>
	);
}
