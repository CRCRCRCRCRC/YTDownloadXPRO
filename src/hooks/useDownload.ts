'use client';

import { useState, useCallback } from 'react';
import { downloadVideo, ApiError, getFriendlyErrorMessage } from '@/lib/api';
import type { DownloadStatus } from '@/types';

interface UseDownloadState {
  isDownloading: boolean;
  progress: number;
  status: DownloadStatus;
  downloadUrl: string | null;
  filename: string | null;
  error: string | null;
}

interface UseDownloadActions {
  startDownload: (videoId: string, quality: string) => Promise<void>;
  reset: () => void;
  clearError: () => void;
}

type UseDownloadReturn = UseDownloadState & UseDownloadActions;

const initialState: UseDownloadState = {
  isDownloading: false,
  progress: 0,
  status: 'preparing',
  downloadUrl: null,
  filename: null,
  error: null,
};

/**
 * 下載管理 Hook
 */
export function useDownload(): UseDownloadReturn {
  const [state, setState] = useState<UseDownloadState>(initialState);

  const simulateProgress = useCallback((onComplete: () => void) => {
    let currentProgress = 0;
    
    // 準備階段 (0-20%)
    setState(prev => ({ ...prev, status: 'preparing', progress: 0 }));
    
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5; // 每次增加 5-20%
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        
        // 打包階段
        setState(prev => ({ ...prev, status: 'packaging', progress: 100 }));
        
        // 完成
        setTimeout(() => {
          onComplete();
        }, 1000);
      } else {
        // 處理階段
        setState(prev => ({ 
          ...prev, 
          status: 'processing', 
          progress: currentProgress 
        }));
      }
    }, 500); // 每 500ms 更新一次進度
    
    return () => clearInterval(progressInterval);
  }, []);

  const startDownload = useCallback(async (videoId: string, quality: string) => {
    setState(prev => ({
      ...prev,
      isDownloading: true,
      error: null,
      progress: 0,
      status: 'preparing',
      downloadUrl: null,
      filename: null,
    }));

    try {
      // 模擬進度更新
      const cleanup = simulateProgress(() => {
        // 進度完成後，實際呼叫下載 API
        downloadVideo(videoId, quality)
          .then(result => {
            setState(prev => ({
              ...prev,
              isDownloading: false,
              status: 'completed',
              downloadUrl: result.downloadUrl,
              filename: result.filename,
              progress: 100,
            }));
          })
          .catch(error => {
            console.error('Download failed:', error);
            
            let errorMessage = '下載失敗，請稍後再試';
            
            if (error instanceof ApiError) {
              errorMessage = getFriendlyErrorMessage(error);
            } else if (error instanceof Error) {
              errorMessage = getFriendlyErrorMessage(error);
            }

            setState(prev => ({
              ...prev,
              isDownloading: false,
              error: errorMessage,
              status: 'preparing',
              progress: 0,
            }));
          });
      });

      // 如果組件卸載，清理定時器
      return cleanup;
    } catch (error) {
      console.error('Download initialization failed:', error);
      
      let errorMessage = '下載初始化失敗';
      
      if (error instanceof ApiError) {
        errorMessage = getFriendlyErrorMessage(error);
      } else if (error instanceof Error) {
        errorMessage = getFriendlyErrorMessage(error);
      }

      setState(prev => ({
        ...prev,
        isDownloading: false,
        error: errorMessage,
        status: 'preparing',
        progress: 0,
      }));
    }
  }, [simulateProgress]);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    ...state,
    startDownload,
    reset,
    clearError,
  };
}