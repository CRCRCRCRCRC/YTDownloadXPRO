'use client';

import { VideoInput } from '@/components/VideoInput';
import { VideoResult } from '@/components/VideoResult';
import { QualitySelector } from '@/components/QualitySelector';
import { DownloadProgress } from '@/components/DownloadProgress';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Card, CardContent } from '@/components/ui/Card';
import { VideoResultSkeleton, QualitySelectorSkeleton } from '@/components/ui/Skeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useVideoCheck } from '@/hooks/useVideoCheck';
import { useDownload } from '@/hooks/useDownload';
import { useToast } from '@/components/ui/Toast';
import type { QualityOption } from '@/types';

export function HomeDownloadSection() {
  const { addToast } = useToast();

  const {
    currentStep,
    videoData,
    loading: checkingLoading,
    error: checkError,
    handleVideoCheck,
    handleQualitySelect,
    reset: resetCheck,
    setStep,
  } = useVideoCheck();

  const {
    isDownloading,
    progress,
    status,
    downloadUrl,
    filename,
    error: downloadError,
    startDownload,
    reset: resetDownload,
  } = useDownload();

  const handleDownload = async (quality: QualityOption) => {
    if (!videoData) return;

    console.log('[Download] Start clicked:', { videoId: videoData.id, quality: quality.resolution });
    setStep('downloading');

    try {
      await startDownload(videoData.id, quality.resolution);

      if (!downloadError) {
        setStep('completed');
        addToast({
          type: 'success',
          title: '下載準備完成',
          message: '您的影片已準備好下載！',
          duration: 4000,
        });
      }
    } catch (err) {
      console.error('[Download] Failed:', err);
      addToast({
        type: 'error',
        title: '下載失敗',
        message: '無法準備下載，請稍後再試',
        duration: 5000,
      });
    }
  };

  const handleReset = () => {
    resetCheck();
    resetDownload();
  };

  const currentError = checkError || downloadError;

  const renderContent = () => {
    switch (currentStep) {
      case 'input':
        return (
          <div className="max-w-2xl mx-auto">
            {/* 超級精美的輸入區域 */}
            <div className="relative group">
              {/* 動態背景光暈 */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* 主要容器 */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-gray-900/90 to-slate-800/90 rounded-2xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl animate-fade-in">
                {/* 裝飾性元素 */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
                <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />

                {/* 輸入組件 */}
                <div className="animate-levitate">
                  <VideoInput onCheck={(url) => handleVideoCheck(url)} loading={checkingLoading} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'checking':
        return (
          <div className="max-w-4xl mx-auto">
            {/* 流暢的載入狀態 */}
            <div className="space-y-6 animate-fade-in">
              {/* 影片資訊骨架 */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-lg animate-glow" />
                <div className="relative bg-gradient-to-br from-slate-900/90 via-gray-900/90 to-slate-800/90 rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-xl animate-liquid">
                  <VideoResultSkeleton />
                </div>
              </div>

              {/* 品質選擇骨架 */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl blur-lg animate-glow" />
                <div className="relative bg-gradient-to-br from-slate-900/90 via-gray-900/90 to-slate-800/90 rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-xl animate-morph">
                  <QualitySelectorSkeleton />
                </div>
              </div>
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8 animate-fade-in">
              {videoData && (
                <>
                  {/* 影片資訊結果 */}
                  <div className="relative group animate-slide-up">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 rounded-3xl blur-xl animate-glow" />
                    <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-800/95 rounded-2xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
                      <VideoResult videoData={videoData} />
                    </div>
                  </div>

                  {/* 品質選擇器 */}
                  <div className="relative group animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-blue-500/15 rounded-3xl blur-xl animate-glow" />
                    <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-800/95 rounded-2xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
                      <QualitySelector
                        availableQualities={videoData.availableQualities}
                        maxQuality={videoData.maxQuality}
                        onQualitySelect={handleQualitySelect}
                        onDownload={handleDownload}
                        loading={isDownloading}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 'downloading':
      case 'completed':
        return (
          <div className="max-w-3xl mx-auto">
            {/* 下載進度容器 */}
            <div className="relative group animate-fade-in">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl animate-glow" />
              <div className={`relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-800/95 rounded-2xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl ${status === 'completed' ? 'animate-levitate' : 'animate-pulse-gentle'}`}>
                <DownloadProgress
                  progress={progress}
                  status={status}
                  filename={filename || undefined}
                  downloadUrl={downloadUrl || undefined}
                  onReset={handleReset}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <div>
        {renderContent()}
        {currentError && (
          <div className="max-w-2xl mx-auto px-4 mt-6">
            <ErrorMessage
              message={currentError}
              onRetry={currentStep !== 'input' ? handleReset : undefined}
              variant="error"
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
