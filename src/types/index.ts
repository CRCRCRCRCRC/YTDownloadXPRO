// 應用程式狀態類型
export type AppStep = 'input' | 'checking' | 'result' | 'downloading' | 'completed';

// 影片資料類型
export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  uploader: string;
  availableQualities: QualityOption[];
  maxQuality: string;
}

// 畫質選項類型
export interface QualityOption {
  resolution: string;
  fileSize: string;
  format: string;
}

// 應用程式狀態類型
export interface AppState {
  currentStep: AppStep;
  videoData: VideoData | null;
  selectedQuality: QualityOption | null;
  downloadProgress: number;
  error: string | null;
  loading: boolean;
}

// 輸入狀態類型
export interface InputState {
  url: string;
  isValid: boolean;
  errorMessage?: string;
}

// 檢查狀態類型
export interface CheckingState {
  isLoading: boolean;
  progress: number;
}

// 結果狀態類型
export interface ResultState {
  videoData: VideoData;
  selectedQuality: QualityOption;
}

// 下載狀態類型
export type DownloadStatus = 'preparing' | 'processing' | 'packaging' | 'completed';

export interface DownloadState {
  progress: number;
  status: DownloadStatus;
  downloadUrl?: string;
}

// 錯誤狀態類型
export type ErrorType = 'validation' | 'network' | 'server' | 'unsupported';

export interface ErrorState {
  type: ErrorType;
  message: string;
  recoverable: boolean;
}

// API 回應類型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

// API 錯誤類型
export interface ApiError {
  code: string;
  message: string;
}

// API 請求類型
export interface CheckVideoRequest {
  url: string;
}

export interface DownloadVideoRequest {
  videoId: string;
  quality: string;
}

// API 回應資料類型
export interface CheckVideoResponse {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  uploader: string;
  availableQualities: QualityOption[];
  maxQuality: string;
}

export interface DownloadVideoResponse {
  downloadUrl: string;
  filename: string;
}

// API 錯誤代碼
export enum ApiErrorCode {
  // 輸入驗證錯誤
  INVALID_INPUT = 'INVALID_INPUT',
  INVALID_URL = 'INVALID_URL',
  PLAYLIST_NOT_SUPPORTED = 'PLAYLIST_NOT_SUPPORTED',
  
  // 影片相關錯誤
  VIDEO_NOT_FOUND = 'VIDEO_NOT_FOUND',
  VIDEO_UNAVAILABLE = 'VIDEO_UNAVAILABLE',
  UNSUPPORTED_CONTENT = 'UNSUPPORTED_CONTENT',
  
  // 網路相關錯誤
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
  
  // 伺服器錯誤
  SERVER_ERROR = 'SERVER_ERROR',
  
  // 下載相關錯誤
  DOWNLOAD_ERROR = 'DOWNLOAD_ERROR',
  
  // 其他錯誤
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  INVALID_RESPONSE = 'INVALID_RESPONSE',
}

// HTTP 狀態碼類型
export type HttpStatusCode = 200 | 400 | 404 | 500;

// API 端點類型
export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
}

// API 端點定義
export const API_ENDPOINTS = {
  CHECK_VIDEO: { method: 'POST', path: '/api/check-video' } as ApiEndpoint,
  DOWNLOAD_VIDEO: { method: 'POST', path: '/api/download' } as ApiEndpoint,
} as const;

// 驗證結果類型 (從 validation.ts 匯入)
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  videoId?: string;
}