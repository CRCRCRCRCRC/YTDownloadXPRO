// 確保 Vercel 補丁在 ytdl-core 載入之前執行
import '../vercel-patch.js';
import ytdl from '@distube/ytdl-core';
import ytdlWrapper from '../utils/ytdl-wrapper.js';
import { supabase } from '../config/supabase.js';

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
  requiresAudioMerge?: boolean;
  originalFormat?: any; // Store original ytdl format for download
}

export class YouTubeService {
  /**
   * 從YouTube URL提取影片ID
   */
  static extractVideoId(url: string): string | null {
    try {
      return ytdl.getVideoID(url);
    } catch (error) {
      return null;
    }
  }

  /**
   * 使用不同的選項重新嘗試獲取影片資訊
   */
  private static async getInfoWithAlternativeMethod(url: string): Promise<any> {
    console.log(`[YouTubeService] 嘗試備用方法獲取影片資訊...`);
    
    // 使用最簡單的選項
    const basicOptions = {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }
      }
    };
    
    try {
      return await ytdlWrapper.getInfo(url, basicOptions);
    } catch (error) {
      console.log(`[YouTubeService] 備用方法也失敗，嘗試最基本的請求...`);
      
      // 最後嘗試：使用最基本的選項
      return await ytdlWrapper.getInfo(url);
    }
  }

  /**
   * 驗證YouTube URL是否有效
   */
  static isValidUrl(url: string): boolean {
    return ytdl.validateURL(url);
  }

  /**
   * 獲取影片資訊
   */
  static async getVideoInfo(url: string): Promise<VideoInfo> {
    console.log(`[YouTubeService] 開始獲取影片資訊: ${url}`);
    
    const maxRetries = 3;
    const retryDelay = 2000; // 2 seconds
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // 檢查URL是否有效
        console.log(`[YouTubeService] 驗證URL有效性...`);
        if (!this.isValidUrl(url)) {
          console.error(`[YouTubeService] 無效的YouTube URL: ${url}`);
          throw new Error('Invalid YouTube URL');
        }

        const videoId = this.extractVideoId(url);
        if (!videoId) {
          console.error(`[YouTubeService] 無法提取影片ID: ${url}`);
          throw new Error('Could not extract video ID');
        }
        console.log(`[YouTubeService] 影片ID: ${videoId}`);

        // 檢查快取（命中即直接回傳）
        if (attempt === 1) {
          console.log(`[YouTubeService] 檢查快取...`);
          const cachedVideo = await this.getCachedVideo(videoId);
          if (cachedVideo) {
            console.log(`[YouTubeService] 使用快取的影片資訊`);
            return cachedVideo;
          }
        }

        // 獲取影片資訊
        console.log(`[YouTubeService] 從YouTube獲取影片資訊... (Attempt ${attempt}/${maxRetries})`);
        
        // 更完整的請求標頭來模擬真實瀏覽器
        const headers: Record<string, string> = {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'Cache-Control': 'max-age=0'
        };

        // 如果有設定 cookie，使用新格式
        if (process.env.YT_COOKIE) {
          headers.cookie = process.env.YT_COOKIE;
        }

        // 使用更寬鬆的選項來避免檢測
        const ytdlOptions = {
          requestOptions: { 
            headers,
            // 增加超時時間
            timeout: 30000,
            // 使用 IPv4 來避免某些網路問題
            family: 4
          },
          // 嘗試禁用可能的調試功能
          lang: 'zh-TW'
        };

        let info;
        try {
          info = await ytdlWrapper.getInfo(url, ytdlOptions);
        } catch (primaryError: any) {
          console.log(`[YouTubeService] 主要方法失敗: ${primaryError.message}`);
          
          // 如果是機器人檢測錯誤或文件系統錯誤，嘗試備用方法
          if (primaryError.message.includes('登入帳戶以確認你不是機器人') || 
              primaryError.message.includes('Sign in to confirm you\'re not a bot') ||
              primaryError.message.includes('EROFS')) {
            console.log(`[YouTubeService] 檢測到錯誤，嘗試備用方法...`);
            info = await this.getInfoWithAlternativeMethod(url);
          } else {
            throw primaryError;
          }
        }
        
        console.log(`[YouTubeService] 成功獲取影片資訊`);
        const videoDetails = info.videoDetails;

        // 處理格式資訊
        console.log(`[YouTubeService] 處理影片格式...`);
        const formats = this.processFormats(info.formats, process.env.VERCEL ? { allowVideoOnly: false } : { allowVideoOnly: true });
        console.log(`[YouTubeService] 找到 ${formats.length} 個可用格式`);

        const videoInfo: VideoInfo = {
          title: videoDetails.title,
          thumbnail: videoDetails.thumbnails[videoDetails.thumbnails.length - 1]?.url || '',
          duration: this.formatDuration(parseInt(videoDetails.lengthSeconds)),
          channel: videoDetails.author.name,
          videoId,
          formats
        };

        // 快取影片資訊 (only on successful fetch)
        if (attempt === 1) {
          console.log(`[YouTubeService] 快取影片資訊...`);
          await this.cacheVideo(videoInfo);
        }

        console.log(`[YouTubeService] 成功完成影片資訊獲取`);
        return videoInfo;
      } catch (error) {
        console.error(`[YouTubeService] 獲取影片資訊時發生錯誤 (attempt ${attempt}):`, {
          url,
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        });
        
        // Check if this is a retryable error（含 429 限流和機器人檢測）
        const isRetryableError = error instanceof Error && (
          error.message.includes('Status code: 429') ||
          error.message.includes('Could not extract functions') ||
          error.message.includes('Video unavailable') ||
          error.message.includes('ECONNRESET') ||
          error.message.includes('ETIMEDOUT') ||
          error.message.includes('socket hang up') ||
          error.message.includes('登入帳戶以確認你不是機器人') ||
          error.message.includes('Sign in to confirm you\'re not a bot') ||
          error.message.includes('This helps protect our community')
        );
        
        // If this is the last attempt or not a retryable error, throw
        if (attempt === maxRetries || !isRetryableError) {
          // 提供更具體的錯誤訊息
          if (error instanceof Error) {
            if (error.message.includes('登入帳戶以確認你不是機器人') || error.message.includes('Sign in to confirm you\'re not a bot')) {
              throw new Error('YouTube 暫時限制存取，請稍後再試。這可能是由於請求過於頻繁導致的');
            } else if (error.message.includes('Could not extract functions')) {
              throw new Error('YouTube 服務暫時不可用，請稍後再試');
            } else if (error.message.includes('Video unavailable')) {
              throw new Error('影片暫時無法存取，請稍後再試');
            } else if (error.message.includes('Private video')) {
              throw new Error('這是私人影片，無法存取');
            } else if (error.message.includes('Age-restricted')) {
              throw new Error('年齡限制影片，無法存取');
            } else if (error.message.includes('network')) {
              throw new Error('網路連線問題，請稍後再試');
            }
          }
          
          throw new Error(`無法獲取影片資訊: ${error instanceof Error ? error.message : '未知錯誤'}`);
        }
        
        // Exponential backoff before retrying，對機器人檢測使用更長等待時間
        let waitMs = retryDelay * Math.pow(2, attempt - 1);
        
        // 如果是機器人檢測錯誤，使用更長的等待時間
        if (error instanceof Error && (
          error.message.includes('登入帳戶以確認你不是機器人') ||
          error.message.includes('Sign in to confirm you\'re not a bot')
        )) {
          waitMs = Math.max(waitMs, 5000 + (attempt * 3000)); // 至少等待 5-14 秒
        }
        
        console.log(`[Retry] Waiting ${waitMs}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitMs));
      }
    }
    
    throw new Error('Failed to get video information after multiple attempts');
  }

  /**
   * 處理影片格式 - 優先提供「含音訊」的合併格式；可選擇是否包含「僅影片」格式（VERCEL 環境預設關閉）
   */
  private static processFormats(formats: ytdl.videoFormat[], opts: { allowVideoOnly: boolean } = { allowVideoOnly: true }): VideoFormat[] {
    const qualityMap = new Map<string, VideoFormat>();

    console.log(`[YouTubeService] 處理 ${formats.length} 個原始格式`);

    const combinedFormats = formats.filter(f => f.hasVideo && f.hasAudio && !!f.qualityLabel);
    const videoOnlyFormats = opts.allowVideoOnly ? formats.filter(f => f.hasVideo && !f.hasAudio && !!f.qualityLabel) : [];

    console.log(`[YouTubeService] 找到 ${combinedFormats.length} 個合併格式, ${videoOnlyFormats.length} 個僅影片格式`);

    // 計算檔案大小（缺值時用位元率與長度估算）
    const estimateSize = (f: any): number | undefined => {
      if (f?.contentLength) return parseInt(f.contentLength, 10);
      const br = typeof f?.bitrate === 'number' ? f.bitrate : undefined; // bits/sec
      const durMs = typeof f?.approxDurationMs === 'string' ? parseInt(f.approxDurationMs, 10) : undefined;
      if (br && durMs) {
        return Math.floor((br / 8) * (durMs / 1000)); // bytes
      }
      return undefined;
    };

    // 先放入合併格式（同畫質時優先）
    combinedFormats.forEach(format => {
      if (!format.qualityLabel) return;
      const quality = format.qualityLabel;
      const current: VideoFormat = {
        quality,
        container: 'mp4',
        hasVideo: true,
        hasAudio: true,
        filesize: estimateSize(format),
        downloadType: 'combined',
        originalFormat: format
      };
      const existing = qualityMap.get(quality);
      if (!existing || YouTubeService.isBetterFormat(current, existing)) {
        qualityMap.set(quality, current);
        console.log(`[YouTubeService] 添加合併格式: ${quality} (顯示為 MP4, 原:${format.container})`);
      }
    });

    // 可選：用僅影片格式補齊沒有合併格式的高畫質選項（在 Vercel 預設關閉）
    videoOnlyFormats.forEach(format => {
      if (!format.qualityLabel) return;
      const quality = format.qualityLabel;
      if (qualityMap.has(quality)) return; // 該畫質已有合併格式
      const current: VideoFormat = {
        quality,
        container: 'mp4',
        hasVideo: true,
        hasAudio: false,
        filesize: estimateSize(format),
        downloadType: 'video-only',
        requiresAudioMerge: true,
        originalFormat: format
      };
      qualityMap.set(quality, current);
      console.log(`[YouTubeService] 添加僅影片格式(將合併/轉檔為 MP4): ${quality} (原:${format.container})`);
    });

    // 依畫質排序（高到低）
    const sorted = Array.from(qualityMap.values()).sort((a, b) => {
      const qNum = (q?: string) => {
        if (typeof q !== 'string') return 0;
        const m = q.match(/(\d+)p/);
        return m ? parseInt(m[1], 10) : 0;
      };
      const qb = qNum(b.quality);
      const qa = qNum(a.quality);
      return qb - qa;
    });

    console.log(`[YouTubeService] 最終得到 ${sorted.length} 個格式選項`);
    sorted.forEach((format, index) => {
      const sizeInfo = format.filesize ? `${Math.round(format.filesize / 1024 / 1024)}MB` : '未知大小';
      console.log(`[YouTubeService] 格式 ${index + 1}: ${format.quality} (${format.container}, ${format.downloadType || 'combined'}, ${sizeInfo})`);
    });

    if (sorted.length === 0) {
      console.warn(`[YouTubeService] 警告：沒有找到任何可用格式！`);
    }

    return sorted;
  }

  /**
   * 判斷格式A是否比格式B更好
   */
  private static isBetterFormat(formatA: VideoFormat, formatB: VideoFormat): boolean {
    // 優先選擇有音頻的格式
    if (formatA.hasAudio && !formatB.hasAudio) return true;
    if (!formatA.hasAudio && formatB.hasAudio) return false;
    
    // 如果音頻狀態相同，優先選擇有檔案大小的格式
    if (formatA.filesize && !formatB.filesize) return true;
    if (!formatA.filesize && formatB.filesize) return false;
    
    // 如果都有檔案大小，選擇較大的（通常品質較好）
    if (formatA.filesize && formatB.filesize) {
      return formatA.filesize > formatB.filesize;
    }
    
    // 其他情況保持現有格式
    return false;
  }

  /**
   * 格式化時長
   */
  private static formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * 獲取快取的影片資訊
   */
  private static async getCachedVideo(videoId: string): Promise<VideoInfo | null> {
    try {
      const { data, error } = await supabase
        .from('video_cache')
        .select('*')
        .eq('video_id', videoId)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        return null;
      }

      return {
        title: data.title,
        thumbnail: data.thumbnail,
        duration: data.duration,
        channel: data.channel,
        videoId: data.video_id,
        formats: data.formats || []
      };
    } catch (error) {
      console.error('Error getting cached video:', error);
      return null;
    }
  }

  /**
   * 快取影片資訊
   */
  private static async cacheVideo(videoInfo: VideoInfo): Promise<void> {
    try {
      const { error } = await supabase
        .from('video_cache')
        .upsert({
          video_id: videoInfo.videoId,
          title: videoInfo.title,
          thumbnail: videoInfo.thumbnail,
          duration: videoInfo.duration,
          channel: videoInfo.channel,
          formats: videoInfo.formats,
          cached_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24小時後過期
        });

      if (error) {
        console.error('Error caching video:', error);
      }
    } catch (error) {
      console.error('Error caching video:', error);
    }
  }
}