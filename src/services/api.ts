export interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  videoId: string;
  formats: VideoFormat[];
}

export interface VideoFormat {
  quality: string;
  container: string;
  hasVideo: boolean;
  hasAudio: boolean;
  filesize?: number;
  downloadType?: 'combined' | 'video-only' | 'audio-only';
  originalFormat?: {
    quality: string;
    container: string;
    hasVideo: boolean;
    hasAudio: boolean;
    filesize?: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  private baseUrl = '/api';

  /**
   * 獲取YouTube影片資訊
   */
  async getVideoInfo(url: string): Promise<ApiResponse<VideoInfo>> {
    try {
      const response = await fetch(`${this.baseUrl}/video/info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting video info:', error);
      return {
        success: false,
        error: 'Failed to get video information'
      };
    }
  }

  /**
   * 下載YouTube影片
   */
  async downloadVideo(
    url: string, 
    quality: string, 
    format: string = 'mp4', 
    hasAudio: boolean = true, 
    hasVideo: boolean = true
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/video/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, quality, format, hasAudio, hasVideo }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Download failed');
      }

      // 獲取檔案名稱
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'video.mp4';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/); 
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // 創建下載連結
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading video:', error);
      throw error;
    }
  }

  /**
   * 獲取下載歷史
   */
  async getDownloadHistory(): Promise<ApiResponse<any[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/video/history`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting download history:', error);
      return {
        success: false,
        error: 'Failed to get download history'
      };
    }
  }
}

export const apiService = new ApiService();
export default apiService;