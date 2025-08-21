import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: '系統狀態',
	description: '檢查服務可用性與歷史狀態，掌握最新系統健康情況。',
};

async function getSystemStatus() {
	// 模擬健康檢查
	return {
		api: 'operational',
		database: 'operational',
		cdn: 'operational',
		lastUpdated: new Date().toISOString(),
	};
}

export default async function StatusPage() {
	const status = await getSystemStatus();
	
	const getStatusClasses = (s: string) => {
		switch (s) {
			case 'operational':
				return 'text-green-200 bg-green-900/60 ring-1 ring-inset ring-green-700/50';
			case 'degraded':
				return 'text-yellow-200 bg-yellow-900/60 ring-1 ring-inset ring-yellow-700/50';
			case 'down':
				return 'text-red-200 bg-red-900/60 ring-1 ring-inset ring-red-700/50';
			default:
				return 'text-gray-200 bg-gray-900/60 ring-1 ring-inset ring-gray-700/50';
		}
	};

	const getStatusText = (s: string) => {
		switch (s) {
			case 'operational':
				return '正常運行';
			case 'degraded':
				return '性能下降';
			case 'down':
				return '服務中斷';
			default:
				return '未知狀態';
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-primary-950 py-12 px-4">
			<div className="max-w-4xl mx-auto">
				{/* Hero */}
				<div className="text-center mb-10">
					<h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg animate-fade-in mb-2">
						系統狀態
					</h1>
					<p className="text-gray-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
						即時監控服務狀態和可用性
					</p>
				</div>

				{/* 即時狀態 */}
				<div className="bg-gray-900/80 rounded-2xl shadow-2xl p-6 mb-8 border border-white/10 backdrop-blur-xl animate-slide-up">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold text-primary-200">服務狀態</h2>
						<div className="text-sm text-gray-400">最後更新: {new Date(status.lastUpdated).toLocaleString('zh-TW')}</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between p-4 border rounded-xl border-white/10 bg-gray-800/60 animate-fade-in">
							<div>
								<h3 className="font-medium text-primary-200">API 服務</h3>
								<p className="text-sm text-gray-400">影片檢查和下載 API</p>
							</div>
							<span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(status.api)}`}>{getStatusText(status.api)}</span>
						</div>
						<div className="flex items-center justify-between p-4 border rounded-xl border-white/10 bg-gray-800/60 animate-fade-in" style={{ animationDelay: '0.05s' }}>
							<div>
								<h3 className="font-medium text-primary-200">資料庫</h3>
								<p className="text-sm text-gray-400">資料儲存服務</p>
							</div>
							<span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(status.database)}`}>{getStatusText(status.database)}</span>
						</div>
						<div className="flex items-center justify-between p-4 border rounded-xl border-white/10 bg-gray-800/60 animate-fade-in" style={{ animationDelay: '0.1s' }}>
							<div>
								<h3 className="font-medium text-primary-200">CDN</h3>
								<p className="text-sm text-gray-400">內容分發網路</p>
							</div>
							<span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClasses(status.cdn)}`}>{getStatusText(status.cdn)}</span>
						</div>
					</div>
				</div>

				{/* 歷史查詢（預留） */}
				<div className="bg-gray-900/80 rounded-2xl shadow-2xl p-6 border border-white/10 backdrop-blur-xl animate-fade-in">
					<h2 className="text-xl font-semibold text-primary-200 mb-4">歷史狀態</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="p-4 bg-gray-800/60 rounded-xl border border-white/10 min-h-[96px] animate-shimmer" />
						<div className="p-4 bg-gray-800/60 rounded-xl border border-white/10 min-h-[96px] animate-shimmer" />
					</div>
					<div className="text-center mt-6">
						<Link href="/" className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-primary-700 to-fuchsia-700 text-white rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">返回首頁</Link>
					</div>
				</div>
			</div>
		</div>
	);
}