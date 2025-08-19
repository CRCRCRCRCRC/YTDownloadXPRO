'use client';

import { MainLayout } from '@/components/layout';
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

export default function Home() {
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
    
    setStep('downloading');
    
    try {
      await startDownload(videoData.id, quality.resolution);
      
      // 如果下載成功，切換到完成狀態並顯示成功通知
      if (!downloadError) {
        setStep('completed');
        addToast({
          type: 'success',
          title: '下載準備完成',
          message: '您的影片已準備好下載！',
          duration: 4000,
        });
      }
    } catch (error) {
      // 下載失敗時顯示錯誤通知
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

  const renderContent = () => {
    switch (currentStep) {
      case 'input':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-2xl mx-auto">
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
          <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto animate-fade-in">
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

  const currentError = checkError || downloadError;

  return (
    <ErrorBoundary>
      <MainLayout>
        <div className="text-center space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight" role="banner">
              YouTube 影片下載
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
              簡潔、高效的影片下載服務，支援多種畫質選擇，操作直覺零干擾
            </p>
          </div>
          
          <main role="main" aria-label="主要內容">
            {renderContent()}
          </main>

          {/* 錯誤顯示 */}
          {currentError && currentStep !== 'downloading' && currentStep !== 'completed' && (
            <div className="max-w-2xl mx-auto px-4">
              <ErrorMessage
                message={currentError}
                onRetry={currentStep !== 'input' ? handleReset : undefined}
                variant="error"
              />
            </div>
          )}
        </div>
      </MainLayout>
    </ErrorBoundary>
  );
}