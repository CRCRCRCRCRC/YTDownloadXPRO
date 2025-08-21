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
          <div className="bg-gray-900/80 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-2xl mx-auto backdrop-blur-md border border-white/10 animate-fade-in">
            <VideoInput onCheck={(url) => handleVideoCheck(url)} loading={checkingLoading} />
          </div>
        );

      case 'checking':
        return (
          <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <VideoResultSkeleton />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <QualitySelectorSkeleton />
              </CardContent>
            </Card>
          </div>
        );

      case 'result':
        return (
          <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
            {videoData && (
              <>
                <div className="animate-slide-up">
                  <VideoResult videoData={videoData} />
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <QualitySelector
                    availableQualities={videoData.availableQualities}
                    maxQuality={videoData.maxQuality}
                    onQualitySelect={handleQualitySelect}
                    onDownload={handleDownload}
                    loading={isDownloading}
                  />
                </div>
              </>
            )}
          </div>
        );

      case 'downloading':
      case 'completed':
        return (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className={status === 'completed' ? 'animate-bounce-gentle' : ''}>
              <DownloadProgress
                progress={progress}
                status={status}
                filename={filename || undefined}
                downloadUrl={downloadUrl || undefined}
                onReset={handleReset}
              />
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
