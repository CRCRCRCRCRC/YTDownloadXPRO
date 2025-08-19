'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 記錄錯誤到錯誤報告服務
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">發生錯誤</h1>
          <p className="text-gray-600">
            很抱歉，應用程式遇到了一個問題。請嘗試重新載入頁面。
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full"
            variant="primary"
          >
            重試
          </Button>
          
          <Button
            onClick={() => window.location.href = '/'}
            className="w-full"
            variant="secondary"
          >
            返回首頁
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              錯誤詳情 (開發模式)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}