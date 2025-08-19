import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import { validateYouTubeUrl } from '@/lib/validation';
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
      }, { status: 400 });
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
      }, { status: 400 });
    }

    const videoId = validation.videoId!;

    try {
      // 檢查影片是否存在且可存取
      const isValid = ytdl.validateURL(url);
      if (!isValid) {
        return NextResponse.json<ApiResponse<never>>({
          success: false,
          error: {
            code: 'VIDEO_NOT_FOUND',
            message: '找不到此影片或影片無法存取',
          },
        }, { status: 404 });
      }

      // 獲取影片資訊
      const info = await ytdl.getInfo(videoId);
      const videoDetails = info.videoDetails;

      // 檢查影片是否為直播
      if (videoDetails.isLiveContent) {
        return NextResponse.json<ApiResponse<never>>({
          success: false,
          error: {
            code: 'UNSUPPORTED_CONTENT',
            message: '目前無法處理直播內容',
          },
        }, { status: 400 });
      }

      // 提取可用的畫質選項
      const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
      const availableQualities: QualityOption[] = [];
      const qualityMap = new Map<string, QualityOption>();

      formats.forEach(format => {
        if (format.qualityLabel && format.contentLength) {
          const resolution = format.qualityLabel;
          const fileSize = formatFileSize(parseInt(format.contentLength));
          
          // 避免重複的畫質選項
          if (!qualityMap.has(resolution)) {
            qualityMap.set(resolution, {
              resolution,
              fileSize,
              format: 'mp4',
            });
          }
        }
      });

      // 轉換為陣列並按畫質排序
      availableQualities.push(...Array.from(qualityMap.values()));
      availableQualities.sort((a, b) => {
        const aHeight = parseInt(a.resolution.replace('p', ''));
        const bHeight = parseInt(b.resolution.replace('p', ''));
        return bHeight - aHeight; // 由高到低排序
      });

      // 找出最高畫質
      const maxQuality = availableQualities.length > 0 
        ? availableQualities[0].resolution 
        : '720p';

      // 格式化影片時長
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
      console.error('YouTube API Error:', error);
      
      // 處理特定的 ytdl-core 錯誤
      if (error instanceof Error) {
        if (error.message.includes('Video unavailable')) {
          return NextResponse.json<ApiResponse<never>>({
            success: false,
            error: {
              code: 'VIDEO_UNAVAILABLE',
              message: '影片無法存取，可能是私人影片或已被刪除',
            },
          }, { status: 404 });
        }
        
        if (error.message.includes('age-restricted')) {
          return NextResponse.json<ApiResponse<never>>({
            success: false,
            error: {
              code: 'UNSUPPORTED_CONTENT',
              message: '目前無法處理年齡限制的影片',
            },
          }, { status: 400 });
        }
      }

      return NextResponse.json<ApiResponse<never>>({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: '暫時無法檢查此影片，請稍後再試',
        },
      }, { status: 500 });
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: '伺服器錯誤，請稍後再試',
      },
    }, { status: 500 });
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
// 
處理 OPTIONS 請求 (CORS preflight)
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