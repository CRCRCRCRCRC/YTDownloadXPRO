import type { ApiResponse, VideoData } from '@/types';

/**
 * API 呼叫配置
 */
const API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production' ? '' : '',
  timeout: 30000, // 30 秒逾時
  retryAttempts: 3,
  retryDelay: 1000, // 1 秒
};

/**
 * API 錯誤類別
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * 延遲函數
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 帶有逾時和重試機制的 fetch
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  attempt = 1
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    // 如果是逾時或網路錯誤，且還有重試次數
    if (attempt < API_CONFIG.retryAttempts) {
      if (
        error instanceof Error &&
        (error.name === 'AbortError' || error.message.includes('fetch'))
      ) {
        console.warn(`API 請求失敗，第 ${attempt} 次重試...`);
        await delay(API_CONFIG.retryDelay * attempt);
        return fetchWithRetry(url, options, attempt + 1);
      }
    }

    throw error;
  }
}

/**
 * 檢查影片資訊
 */
export async function checkVideo(url: string): Promise<VideoData> {
  try {
    const response = await fetchWithRetry('/api/check-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData: ApiResponse<never> = await response.json();
      throw new ApiError(
        errorData.error?.message || '請求失敗',
        errorData.error?.code || 'UNKNOWN_ERROR',
        response.status
      );
    }

    const data: ApiResponse<VideoData> = await response.json();
    
    if (!data.success || !data.data) {
      throw new ApiError(
        data.error?.message || '回應格式錯誤',
        data.error?.code || 'INVALID_RESPONSE'
      );
    }

    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('請求逾時，請檢查網路連線後重試', 'TIMEOUT');
      }
      
      if (error.message.includes('fetch')) {
        throw new ApiError('網路連線異常，請檢查網路後重試', 'NETWORK_ERROR');
      }
    }

    console.error('Unexpected error in checkVideo:', error);
    throw new ApiError('未知錯誤，請稍後再試', 'UNKNOWN_ERROR');
  }
}

/**
 * 下載影片
 */
export async function downloadVideo(
  videoId: string,
  quality: string
): Promise<{ downloadUrl: string; filename: string }> {
  try {
    const response = await fetchWithRetry('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId, quality }),
    });

    if (!response.ok) {
      const errorData: ApiResponse<never> = await response.json();
      throw new ApiError(
        errorData.error?.message || '下載請求失敗',
        errorData.error?.code || 'DOWNLOAD_ERROR',
        response.status
      );
    }

    const data: ApiResponse<{ downloadUrl: string; filename: string }> = await response.json();
    
    if (!data.success || !data.data) {
      throw new ApiError(
        data.error?.message || '下載回應格式錯誤',
        data.error?.code || 'INVALID_RESPONSE'
      );
    }

    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('下載請求逾時，請重試', 'TIMEOUT');
      }
      
      if (error.message.includes('fetch')) {
        throw new ApiError('網路連線異常，無法下載', 'NETWORK_ERROR');
      }
    }

    console.error('Unexpected error in downloadVideo:', error);
    throw new ApiError('下載失敗，請稍後再試', 'UNKNOWN_ERROR');
  }
}

/**
 * 錯誤訊息映射
 */
export const ERROR_MESSAGE_MAP: Record<string, string> = {
  // 驗證錯誤
  INVALID_INPUT: '請提供有效的輸入',
  INVALID_URL: '這看起來不是有效的影片連結，請再試一次',
  
  // 影片錯誤
  VIDEO_NOT_FOUND: '找不到此影片，請檢查網址是否正確',
  VIDEO_UNAVAILABLE: '影片無法存取，可能是私人影片或已被刪除',
  UNSUPPORTED_CONTENT: '目前無法處理此類型影片',
  
  // 網路錯誤
  NETWORK_ERROR: '網路連線異常，請檢查網路後重試',
  TIMEOUT: '請求逾時，請稍後再試',
  
  // 伺服器錯誤
  SERVER_ERROR: '伺服器暫時無法回應，請稍後再試',
  
  // 下載錯誤
  DOWNLOAD_ERROR: '下載失敗，請稍後再試',
  
  // 未知錯誤
  UNKNOWN_ERROR: '發生未知錯誤，請稍後再試',
  INVALID_RESPONSE: '伺服器回應格式錯誤',
};

/**
 * 取得友善的錯誤訊息
 */
export function getFriendlyErrorMessage(error: ApiError | Error): string {
  if (error instanceof ApiError) {
    return ERROR_MESSAGE_MAP[error.code] || error.message;
  }
  
  return ERROR_MESSAGE_MAP.UNKNOWN_ERROR;
}