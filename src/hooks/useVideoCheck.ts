'use client';

import { useState, useCallback } from 'react';
import { checkVideo, ApiError, getFriendlyErrorMessage } from '@/lib/api';
import type { VideoData, QualityOption, AppStep } from '@/types';

interface UseVideoCheckState {
  currentStep: AppStep;
  videoData: VideoData | null;
  selectedQuality: QualityOption | null;
  loading: boolean;
  error: string | null;
}

interface UseVideoCheckActions {
  handleVideoCheck: (url: string) => Promise<void>;
  handleQualitySelect: (quality: QualityOption) => void;
  clearError: () => void;
  reset: () => void;
  setStep: (step: AppStep) => void;
}

type UseVideoCheckReturn = UseVideoCheckState & UseVideoCheckActions;

const initialState: UseVideoCheckState = {
  currentStep: 'input',
  videoData: null,
  selectedQuality: null,
  loading: false,
  error: null,
};

/**
 * 影片檢查和結果管理 Hook
 */
export function useVideoCheck(): UseVideoCheckReturn {
  const [state, setState] = useState<UseVideoCheckState>(initialState);

  const handleVideoCheck = useCallback(async (url: string) => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      currentStep: 'checking',
    }));

    try {
      const videoData = await checkVideo(url);
      
      setState(prev => ({
        ...prev,
        loading: false,
        videoData,
        currentStep: 'result',
        error: null,
      }));
    } catch (error) {
      console.error('Video check failed:', error);
      
      let errorMessage = '檢查影片時發生錯誤';
      
      if (error instanceof ApiError) {
        errorMessage = getFriendlyErrorMessage(error);
      } else if (error instanceof Error) {
        errorMessage = getFriendlyErrorMessage(error);
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        currentStep: 'input',
        videoData: null,
        selectedQuality: null,
      }));
    }
  }, []);

  const handleQualitySelect = useCallback((quality: QualityOption) => {
    setState(prev => ({
      ...prev,
      selectedQuality: quality,
    }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const setStep = useCallback((step: AppStep) => {
    setState(prev => ({
      ...prev,
      currentStep: step,
    }));
  }, []);

  return {
    ...state,
    handleVideoCheck,
    handleQualitySelect,
    clearError,
    reset,
    setStep,
  };
}