'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { DownloadStatus } from '@/types';

interface DownloadProgressProps {
  progress: number;
  status: DownloadStatus;
  filename?: string;
  downloadUrl?: string;
  onReset: () => void;
  className?: string;
}

const DownloadProgress: React.FC<DownloadProgressProps> = ({
  progress,
  status,
  filename,
  downloadUrl,
  onReset,
  className,
}) => {
  const getStatusText = () => {
    switch (status) {
      case 'preparing':
        return '正在準備…';
      case 'processing':
        return `正在處理影片（${Math.round(progress)}%）`;
      case 'packaging':
        return '正在打包…';
      case 'completed':
        return '完成！您的 MP4 已就緒';
      default:
        return '處理中…';
    }
  };

  const getStatusIcon = () => {
    if (status === 'completed') {
      return (
        <div className="relative group">
          {/* 成功圖示背景光暈 */}
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 via-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-glow opacity-60" />

          {/* 主要圖示 */}
          <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl animate-levitate">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      );
    }

    return (
      <div className="relative group">
        {/* 載入中背景光暈 */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-glow opacity-60" />

        {/* 主要圖示 */}
        <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-liquid">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>
    );
  };

  const handleDownload = () => {
    if (downloadUrl && filename) {
      // 創建隱藏的下載連結
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // 觸發下載
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className={className}>
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          {/* 狀態圖示 */}
          <div className="flex justify-center">
            {getStatusIcon()}
          </div>

          {/* 狀態文字 */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-primary-200">
              {getStatusText()}
            </h2>
            {filename && (
              <p className="text-gray-400 text-sm">
                檔案名稱：{filename}
              </p>
            )}
          </div>

          {/* 進度條 */}
          {status !== 'completed' && (
            <div className="max-w-lg mx-auto relative group">
              {/* 進度條背景光暈 */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative bg-gradient-to-br from-slate-800/80 via-gray-800/80 to-slate-800/80 rounded-2xl p-4 border border-white/20 backdrop-blur-sm shadow-xl">
                <ProgressBar
                  value={progress}
                  showPercentage={status === 'processing'}
                  variant="primary"
                  size="lg"
                />
              </div>
            </div>
          )}

          {/* 動作按鈕 */}
          <div className="space-y-3">
            {status === 'completed' && downloadUrl ? (
              <div className="space-y-4">
                {/* 下載按鈕 */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 via-green-400/20 to-emerald-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow" />
                  <Button
                    onClick={handleDownload}
                    size="lg"
                    className="relative w-full sm:w-auto px-12 py-5 text-lg font-semibold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-500 hover:via-green-500 hover:to-emerald-500 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 active:scale-95"
                  >
                    <span className="flex items-center gap-3">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      立即下載
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Button>
                </div>

                {/* 返回按鈕 */}
                <div className="text-center">
                  <Button
                    onClick={onReset}
                    variant="ghost"
                    size="md"
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 px-6 py-3"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      回到首頁
                    </span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-400">
                請稍候，正在處理您的請求...
              </div>
            )}
          </div>

          {/* 提示訊息 */}
          {status === 'completed' && (
            <div className="bg-success-900/30 border border-success-700/70 rounded-lg p-4 text-left">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-success-400 mt-0.5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm text-success-200">
                  <p className="font-medium mb-1">下載準備完成</p>
                  <p>
                    點擊「立即下載」按鈕開始下載您的 MP4 檔案。
                    如果下載沒有自動開始，請檢查瀏覽器的下載設定。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { DownloadProgress };