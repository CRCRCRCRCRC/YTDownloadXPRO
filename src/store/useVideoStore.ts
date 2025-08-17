import { create } from 'zustand';
import { VideoInfo } from '../services/api';

interface VideoState {
  // 當前影片資訊
  currentVideo: VideoInfo | null;
  // 載入狀態
  isLoading: boolean;
  // 錯誤訊息
  error: string | null;
  // 下載狀態
  isDownloading: boolean;
  // 下載進度
  downloadProgress: number;
  
  // Actions
  setCurrentVideo: (video: VideoInfo | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setDownloading: (downloading: boolean) => void;
  setDownloadProgress: (progress: number) => void;
  clearState: () => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  currentVideo: null,
  isLoading: false,
  error: null,
  isDownloading: false,
  downloadProgress: 0,
  
  setCurrentVideo: (video) => set({ currentVideo: video }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setDownloading: (downloading) => set({ isDownloading: downloading }),
  setDownloadProgress: (progress) => set({ downloadProgress: progress }),
  clearState: () => set({ 
    currentVideo: null, 
    isLoading: false, 
    error: null, 
    isDownloading: false, 
    downloadProgress: 0 
  }),
}));