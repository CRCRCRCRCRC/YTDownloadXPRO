'use client';

import { useState, useCallback } from 'react';
import { validateYouTubeUrl } from '@/lib/validation';
import type { ValidationResult } from '@/lib/validation';

interface UseVideoInputState {
  url: string;
  isValid: boolean;
  error: string | null;
  isLoading: boolean;
}

interface UseVideoInputActions {
  setUrl: (url: string) => void;
  clearError: () => void;
  validateUrl: () => ValidationResult;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

type UseVideoInputReturn = UseVideoInputState & UseVideoInputActions;

const initialState: UseVideoInputState = {
  url: '',
  isValid: false,
  error: null,
  isLoading: false,
};

/**
 * 影片輸入狀態管理 Hook
 */
export function useVideoInput(): UseVideoInputReturn {
  const [state, setState] = useState<UseVideoInputState>(initialState);

  const setUrl = useCallback((url: string) => {
    setState(prev => ({
      ...prev,
      url,
      error: null, // 清除之前的錯誤
      isValid: false, // 重置驗證狀態
    }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  const validateUrl = useCallback((): ValidationResult => {
    const validation = validateYouTubeUrl(state.url);
    
    setState(prev => ({
      ...prev,
      isValid: validation.isValid,
      error: validation.error || null,
    }));

    return validation;
  }, [state.url]);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading,
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    setUrl,
    clearError,
    validateUrl,
    setLoading,
    reset,
  };
}