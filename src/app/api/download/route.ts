import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import type { ApiResponse } from '@/types';

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
    const { videoId, quality } = body;

    // 驗證輸入
    if (!videoId || !quality) {
      return NextResponse.json<ApiResponse<never>>({
        success: false,
        error: {
          code: 'INVALID_INPUT',
          message: '請提供影片 ID 和畫質選項',
        },
      }, { status: 400, headers: corsHeaders });
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    try {
      // 驗證影片 URL
      const isValid = ytdl.validateURL(videoUrl);
      if (!isValid) {
        return NextResponse.json<ApiResponse<never>>({
          success: false,
          error: {
            code: 'VIDEO_NOT_FOUND',
            message: '找不到此影片',
          },
        }, { status: 404, headers: corsHeaders });
      }

      // 統一請求標頭
      const requestOptions = {
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
          'accept-language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        },
      } as const;

      // 獲取影片資訊（先以 URL，失敗再以 ID）
      let info: ytdl.videoInfo | null = null;
      try {
        info = await ytdl.getInfo(videoUrl, { requestOptions });
      } catch {
        // ignore and try with ID
      }
      if ((!info || !info.videoDetails) && ytdl.validateID(videoId)) {
        info = await ytdl.getInfo(videoId, { requestOptions });
      }
      const videoDetails = info?.videoDetails;

      // 檢查影片是否可用
      if (!info || !videoDetails) {
        return NextResponse.json<ApiResponse<never>>({
          success: false,
          error: {
            code: 'VIDEO_NOT_FOUND',
            message: '找不到此影片',
          },
        }, { status: 404, headers: corsHeaders });
      }
      if (videoDetails.isLiveContent) {
        return NextResponse.json<ApiResponse<never>>({
          success: false,
          error: {
            code: 'UNSUPPORTED_CONTENT',
            message: '無法下載直播內容',
          },
        }, { status: 400, headers: corsHeaders });
      }

      // 尋找符合畫質的格式
      const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
      const selectedFormat = formats.find(format => 
        format.qualityLabel === quality
      );

      if (!selectedFormat) {
        return NextResponse.json<ApiResponse<never>>({
          success: false,
          error: {
            code: 'QUALITY_NOT_FOUND',
            message: '找不到指定的畫質選項',
          },
        }, { status: 400, headers: corsHeaders });
      }

      // 生成安全的檔案名稱
      const safeTitle = videoDetails.title
        .replace(/[^\w\s-]/g, '') // 移除特殊字符
        .replace(/\s+/g, '_') // 空格替換為底線
        .substring(0, 100); // 限制長度

      const filename = `${safeTitle}_${quality}.mp4`;

      // 返回下載 URL，讓前端直接從 YouTube 下載
      const downloadUrl = selectedFormat.url;

      return NextResponse.json<ApiResponse<{ downloadUrl: string; filename: string }>>({
        success: true,
        data: {
          downloadUrl,
          filename,
        },
      }, { 
        status: 200,
        headers: corsHeaders 
      });

    } catch (error) {
      console.error('Download API Error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Video unavailable')) {
          return NextResponse.json<ApiResponse<never>>({
            success: false,
            error: {
              code: 'VIDEO_UNAVAILABLE',
              message: '影片無法存取',
            },
          }, { status: 404, headers: corsHeaders });
        }
        
        if (error.message.includes('age-restricted')) {
          return NextResponse.json<ApiResponse<never>>({
            success: false,
            error: {
              code: 'UNSUPPORTED_CONTENT',
              message: '無法下載年齡限制的影片',
            },
          }, { status: 400, headers: corsHeaders });
        }
      }

      return NextResponse.json<ApiResponse<never>>({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: '下載準備失敗，請稍後再試',
        },
      }, { status: 500, headers: corsHeaders });
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: '伺服器錯誤，請稍後再試',
      },
    }, { status: 500, headers: corsHeaders });
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