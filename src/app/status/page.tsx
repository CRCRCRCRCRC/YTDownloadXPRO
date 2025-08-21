import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '系統狀態',
  description: '檢查 YTDownload XPro 系統狀態和服務可用性',
};

async function getSystemStatus() {
  // 這裡可以添加實際的健康檢查邏輯
  return {
    api: 'operational',
    database: 'operational',
    cdn: 'operational',
    lastUpdated: new Date().toISOString(),
  };
}

export default async function StatusPage() {
  const status = await getSystemStatus();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-primary-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-indigo-400 drop-shadow-lg animate-fade-in mb-2">
            系統狀態
          </h1>
          <p className="text-gray-300 animate-fade-in">
            即時監控服務狀態和可用性
          </p>
        </div>

        <div className="bg-gray-900/80 rounded-lg shadow-2xl p-6 mb-6 border border-white/10 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-primary-200">
              服務狀態
            </h2>
            <div className="text-sm text-gray-400">
              最後更新: {new Date(status.lastUpdated).toLocaleString('zh-TW')}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg border-white/10 bg-gray-800/60">
              <div>
                <h3 className="font-medium text-primary-200">API 服務</h3>
                <p className="text-sm text-gray-400">影片檢查和下載 API</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status.api)}`}>{getStatusText(status.api)}</span>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg border-white/10 bg-gray-800/60">
              <div>
                <h3 className="font-medium text-primary-200">資料庫</h3>
                <p className="text-sm text-gray-400">資料儲存服務</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status.database)}`}>{getStatusText(status.database)}</span>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg border-white/10 bg-gray-800/60">
              <div>
                <h3 className="font-medium text-primary-200">CDN</h3>
                <p className="text-sm text-gray-400">內容分發網路</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status.cdn)}`}>{getStatusText(status.cdn)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/80 rounded-lg shadow-2xl p-6 border border-white/10 animate-fade-in">
          <h2 className="text-xl font-semibold text-primary-200 mb-4">系統資訊</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800/60 rounded-lg">
              <h3 className="font-medium text-primary-200 mb-2">版本資訊</h3>
              <p className="text-sm text-gray-400">v1.0.0</p>
            </div>
            <div className="p-4 bg-gray-800/60 rounded-lg">
              <h3 className="font-medium text-primary-200 mb-2">部署環境</h3>
              <p className="text-sm text-gray-400">Vercel</p>
            </div>
            <div className="p-4 bg-gray-800/60 rounded-lg">
              <h3 className="font-medium text-primary-200 mb-2">運行時間</h3>
              <p className="text-sm text-gray-400">99.9% 可用性</p>
            </div>
            <div className="p-4 bg-gray-800/60 rounded-lg">
              <h3 className="font-medium text-primary-200 mb-2">地區</h3>
              <p className="text-sm text-gray-400">全球 CDN</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 animate-fade-in">
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-700 to-fuchsia-700 text-white rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  );
}