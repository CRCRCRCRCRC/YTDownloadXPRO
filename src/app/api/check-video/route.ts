import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import { validateYouTubeUrl, normalizeYouTubeUrl } from '@/lib/validation';
import type { ApiResponse, VideoData, QualityOption } from '@/types';

// 設定 API 路由的運行時配置
export const runtime = 'nodejs';
export const maxDuration = 30; // Vercel Pro 計劃最大 30 秒

export async function POST(request: NextRequest) {
  // 設定 CORS 標頭
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await request.json();
    const { url } = body;

    // 驗證輸入
    if (!url || typeof url !== 'string') {
      return NextResponse.json<ApiResponse<never>>({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: '請提供有效的 URL',
        },
      }, { status: 400, headers: corsHeaders });
    }

    // 驗證 YouTube URL 格式
    const validation = validateYouTubeUrl(url);
    if (!validation.isValid) {
      return NextResponse.json<ApiResponse<never>>({
        success: false,
        error: {
          code: 'INVALID_URL',
          message: validation.error || '無效的 YouTube URL',
        },
      }, { status: 400, headers: corsHeaders });
    }

    const videoId = validation.videoId!;
    const canonicalUrl = normalizeYouTubeUrl(url) || `https://www.youtube.com/watch?v=${videoId}`;

    try {
      // requestOptions（加強 UA 與語系，提升成功率）
      const requestOptions = {
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
          'accept-language': 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7',
        },
      } as const;

      // 先以 BasicInfo 取資料，較快且容錯；失敗再用 getInfo
      let info: ytdl.videoInfo | null = null;
      try {
        const basic = await ytdl.getBasicInfo(canonicalUrl, { requestOptions });
        // 轉為 videoInfo 兼容後續使用
        info = basic as unknown as ytdl.videoInfo;
      } catch (err) {
        console.warn('[check-video] getBasicInfo failed, fallback to getInfo', err instanceof Error ? err.message : err);
      }

      if (!info || !info.videoDetails) {
        try {
          info = await ytdl.getInfo(canonicalUrl, { requestOptions });
        } catch {
          // 再以 ID 嘗試
          if (ytdl.validateID(videoId)) {
            info = await ytdl.getInfo(videoId, { requestOptions });
          }
        }
      }

      if (!info || !info.videoDetails) {
        // 嘗試 oEmbed 作為後備，避免 500
        try {
          const oembedRes = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(canonicalUrl)}&format=json`, {
            headers: {
              'user-agent': 'Mozilla/5.0',
            },
          });
          if (oembedRes.ok) {
            const oembed = await oembedRes.json() as { title?: string; author_name?: string; thumbnail_url?: string; };
            const videoData: VideoData = {
              id: videoId,
              title: oembed.title || 'YouTube 影片',
              thumbnail: oembed.thumbnail_url || '',
              duration: '—',
              uploader: oembed.author_name || 'YouTube',
              availableQualities: [
                { resolution: '1080p', fileSize: '—', format: 'mp4' },
                { resolution: '720p', fileSize: '—', format: 'mp4' },
                { resolution: '480p', fileSize: '—', format: 'mp4' },
              ],
              maxQuality: '1080p',
            };
            return NextResponse.json<ApiResponse<VideoData>>({ success: true, data: videoData }, { status: 200, headers: corsHeaders });
          }
        } catch (e) {
          console.warn('[check-video] oEmbed fallback failed', e);
        }

        return NextResponse.json<ApiResponse<never>>({
          success: false,
          error: {
            code: 'VIDEO_NOT_FOUND',
            message: '找不到此影片或影片無法存取',
          },
        }, { status: 404, headers: corsHeaders });
      }

      const videoDetails = info.videoDetails;

      // 檢查影片是否為直播
      if (videoDetails.isLiveContent) {
        return NextResponse.json<ApiResponse<never>>({
          success: false,
          error: {
            code: 'UNSUPPORTED_CONTENT',
            message: '目前無法處理直播內容',
          },
        }, { status: 400, headers: corsHeaders });
      }

      // 提取可用的畫質選項
      const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
      const availableQualities: QualityOption[] = [];
      const qualityMap = new Map<string, QualityOption>();

      formats.forEach(format => {
        if (format.qualityLabel && format.contentLength) {
          const resolution = format.qualityLabel;
          const fileSize = formatFileSize(parseInt(format.contentLength));

          if (!qualityMap.has(resolution)) {
            qualityMap.set(resolution, {
              resolution,
              fileSize,
              format: 'mp4',
            });
          }
        }
      });

      availableQualities.push(...Array.from(qualityMap.values()));
      availableQualities.sort((a, b) => {
        const aHeight = parseInt(a.resolution.replace('p', ''));
        const bHeight = parseInt(b.resolution.replace('p', ''));
        return bHeight - aHeight; // 由高到低排序
      });

      const maxQuality = availableQualities.length > 0 
        ? availableQualities[0].resolution 
        : '720p';

      const duration = formatDuration(parseInt(videoDetails.lengthSeconds));

      const videoData: VideoData = {
        id: videoId,
        title: videoDetails.title,
        thumbnail: videoDetails.thumbnails[videoDetails.thumbnails.length - 1]?.url || '',
        duration,
        uploader: videoDetails.author.name,
        availableQualities,
        maxQuality,
      };

      return NextResponse.json<ApiResponse<VideoData>>({
        success: true,
        data: videoData,
      }, { 
        status: 200,
        headers: corsHeaders 
      });

    } catch (error) {
      // 更細緻錯誤分類
      const message = error instanceof Error ? error.message : String(error);
      console.error('[check-video] YouTube API Error:', message);

      if (/Video unavailable/i.test(message)) {
        return NextResponse.json<ApiResponse<never>>({
          success: false,
          error: {
            code: 'VIDEO_UNAVAILABLE',
            message: '影片無法存取，可能是私人影片或已被刪除',
          },
        }, { status: 404, headers: corsHeaders });
      }

      if (/age-restricted|confirm your age/i.test(message)) {
        return NextResponse.json<ApiResponse<never>>({
          success: false,
          error: {
            code: 'UNSUPPORTED_CONTENT',
            message: '目前無法處理年齡限制的影片',
          },
        }, { status: 400, headers: corsHeaders });
      }

      if (/ENOTFOUND|ECONNRESET|ETIMEDOUT|EAI_AGAIN/i.test(message)) {
        return NextResponse.json<ApiResponse<never>>({
          success: false,
          error: {
            code: 'NETWORK_ERROR',
            message: '網路連線異常，請稍後再試',
          },
        }, { status: 503, headers: corsHeaders });
      }

      return NextResponse.json<ApiResponse<never>>({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: '暫時無法檢查此影片，請稍後再試',
        },
      }, { status: 500, headers: corsHeaders });
    }

  } catch (error) {
    console.error('[check-video] API Error:', error);
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: '伺服器錯誤，請稍後再試',
      },
    }, { status: 500, headers: corsHeaders });
  }
}

/**
 * 格式化檔案大小
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * 格式化影片時長
 */
function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}

// 處理 OPTIONS 請求 (CORS preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}