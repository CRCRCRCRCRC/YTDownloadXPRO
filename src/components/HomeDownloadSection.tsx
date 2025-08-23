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
          <div className="max-w-5xl mx-auto">
            {/* 超級現代化輸入區域 */}
            <div className="relative group">
              {/* 多層次動態背景光暈 */}
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-60 animate-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 rounded-3xl blur-xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />

              {/* 主要容器 - 超級現代化 */}
              <div className="relative bg-gradient-to-br from-slate-800/98 via-gray-800/98 to-slate-700/98 rounded-3xl p-16 backdrop-blur-2xl border border-white/15 shadow-3xl animate-fade-in transform-gpu">
                {/* 多層次裝飾性元素 */}
                <div className="absolute top-8 right-8 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-float opacity-80" />
                <div className="absolute bottom-8 left-8 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-float opacity-70" style={{ animationDelay: '2s' }} />
                
                {/* 發光邊框效果 */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* 網格背景紋理 */}
                <div className="absolute inset-0 rounded-3xl opacity-5">
                  <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgxMzksIDkyLCAyNDYsIDAuMykiLz4KPC9zdmc+')] bg-repeat" style={{ backgroundSize: '40px 40px' }} />
                </div>

                {/* 輸入組件 */}
                <div className="relative z-10">
                  <VideoInput onCheck={(url) => handleVideoCheck(url)} loading={checkingLoading} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'checking':
        return (
          <div className="max-w-5xl mx-auto">
            {/* 超級流暢的載入狀態 */}
            <div className="space-y-8 animate-fade-in">
              {/* 影片資訊骨架 */}
              <div className="relative group animate-slide-up">
                {/* 多層次發光背景 */}
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60 animate-pulse" />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 rounded-3xl blur-xl opacity-80 animate-pulse" style={{ animationDelay: '1s' }} />
                
                <div className="relative bg-gradient-to-br from-slate-800/95 via-gray-800/95 to-slate-700/95 rounded-3xl p-8 backdrop-blur-2xl border border-white/15 shadow-3xl transform-gpu group-hover:scale-[1.01] group-hover:-translate-y-0.5 transition-all duration-500">
                  {/* 浮動裝飾元素 */}
                  <div className="absolute top-6 right-6 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60 group-hover:opacity-80" />
                  <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float opacity-50 group-hover:opacity-70" style={{ animationDelay: '1s' }} />
                  
                  {/* 背景紋理 */}
                  <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgxMzksIDkyLCAyNDYsIDAuMykiLz4KPC9zdmc+')] bg-repeat" style={{ backgroundSize: '40px 40px' }} />
                  </div>
                  
                  <div className="relative z-10">
                    <VideoResultSkeleton />
                  </div>
                </div>
              </div>

              {/* 品質選擇骨架 */}
              <div className="relative group animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {/* 多層次發光背景 */}
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-60 animate-pulse" />
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/15 via-cyan-500/15 to-blue-500/15 rounded-3xl blur-xl opacity-80 animate-pulse" style={{ animationDelay: '1s' }} />
                
                <div className="relative bg-gradient-to-br from-slate-800/95 via-gray-800/95 to-slate-700/95 rounded-3xl p-8 backdrop-blur-2xl border border-white/15 shadow-3xl transform-gpu group-hover:scale-[1.01] group-hover:-translate-y-0.5 transition-all duration-500">
                  {/* 浮動裝飾元素 */}
                  <div className="absolute top-6 left-6 w-2 h-2 bg-cyan-400 rounded-full animate-float opacity-60 group-hover:opacity-80" />
                  <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-float opacity-50 group-hover:opacity-70" style={{ animationDelay: '1s' }} />
                  
                  {/* 背景紋理 */}
                  <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgxMzksIDkyLCAyNDYsIDAuMykiLz4KPC9zdmc+')] bg-repeat" style={{ backgroundSize: '40px 40px' }} />
                  </div>
                  
                  <div className="relative z-10">
                    <QualitySelectorSkeleton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="max-w-6xl mx-auto">
            <div className="space-y-10 animate-fade-in">
              {videoData && (
                <>
                  {/* 影片資訊結果 */}
                  <div className="relative group animate-slide-up">
                    {/* 超級發光背景 */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-purple-500/25 via-pink-500/25 to-cyan-500/25 rounded-3xl blur-3xl opacity-60 animate-pulse" />
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-80 animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative bg-gradient-to-br from-slate-800/98 via-gray-800/98 to-slate-700/98 rounded-3xl p-10 backdrop-blur-2xl border border-white/15 shadow-3xl transform-gpu group-hover:scale-[1.01] group-hover:-translate-y-0.5 transition-all duration-500">
                      {/* 浮動裝飾元素 */}
                      <div className="absolute top-8 right-8 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-float opacity-70 group-hover:opacity-90" />
                      <div className="absolute bottom-8 left-8 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-float opacity-60 group-hover:opacity-80" style={{ animationDelay: '1s' }} />
                      <div className="absolute top-1/2 left-1/4 w-2.5 h-2.5 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-float opacity-80 group-hover:opacity-100" style={{ animationDelay: '2s' }} />
                      
                      {/* 背景紋理 */}
                      <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
                        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgxMzksIDkyLCAyNDYsIDAuMykiLz4KPC9zdmc+')] bg-repeat" style={{ backgroundSize: '40px 40px' }} />
                      </div>
                      
                      <div className="relative z-10">
                        <VideoResult videoData={videoData} />
                      </div>
                    </div>
                  </div>

                  {/* 品質選擇器 */}
                  <div className="relative group animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {/* 超級發光背景 */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/25 via-blue-500/25 to-purple-500/25 rounded-3xl blur-3xl opacity-60 animate-pulse" />
                    <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-80 animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-cyan-500/15 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative bg-gradient-to-br from-slate-800/98 via-gray-800/98 to-slate-700/98 rounded-3xl p-10 backdrop-blur-2xl border border-white/15 shadow-3xl transform-gpu group-hover:scale-[1.01] group-hover:-translate-y-0.5 transition-all duration-500">
                      {/* 浮動裝飾元素 */}
                      <div className="absolute top-8 left-8 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-float opacity-70 group-hover:opacity-90" />
                      <div className="absolute bottom-8 right-8 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-float opacity-60 group-hover:opacity-80" style={{ animationDelay: '1s' }} />
                      <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-float opacity-80 group-hover:opacity-100" style={{ animationDelay: '2s' }} />
                      
                      {/* 背景紋理 */}
                      <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
                        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgxMzksIDkyLCAyNDYsIDAuMykiLz4KPC9zdmc+')] bg-repeat" style={{ backgroundSize: '40px 40px' }} />
                      </div>
                      
                      <div className="relative z-10">
                        <QualitySelector
                          availableQualities={videoData.availableQualities}
                          maxQuality={videoData.maxQuality}
                          onQualitySelect={handleQualitySelect}
                          onDownload={handleDownload}
                          loading={isDownloading}
                        />
                      </div>
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
          <div className="max-w-4xl mx-auto">
            {/* 超級現代化下載進度容器 */}
            <div className="relative group animate-fade-in">
              {/* 多層次發光背景 */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur-3xl opacity-80 animate-pulse" />
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/25 via-emerald-500/25 to-blue-500/25 rounded-3xl blur-2xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-br from-slate-800/98 via-gray-800/98 to-slate-700/98 rounded-3xl p-12 backdrop-blur-2xl border border-white/15 shadow-3xl transform-gpu group-hover:scale-[1.01] group-hover:-translate-y-0.5 transition-all duration-500">
                {/* 浮動裝飾元素 */}
                <div className="absolute top-10 right-10 w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-float opacity-80 group-hover:opacity-100" />
                <div className="absolute bottom-10 left-10 w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full animate-float opacity-60 group-hover:opacity-80" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/3 w-3.5 h-3.5 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-full animate-float opacity-70 group-hover:opacity-90" style={{ animationDelay: '2s' }} />
                
                {/* 背景紋理 */}
                <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
                  <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgxMzksIDkyLCAyNDYsIDAuMykiLz4KPC9zdmc+')] bg-repeat" style={{ backgroundSize: '40px 40px' }} />
                </div>
                
                {/* 成功狀態發光效果 */}
                {status === 'completed' && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 animate-pulse opacity-80" />
                )}
                
                <div className="relative z-10">
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
