/**
 * YouTube URL 驗證和處理工具
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  videoId?: string;
}

/**
 * 驗證 YouTube URL 格式
 */
export function validateYouTubeUrl(url: string): ValidationResult {
  if (!url || typeof url !== 'string') {
    return {
      isValid: false,
      error: '請先貼上 YouTube 影片網址',
    };
  }

  const trimmedUrl = url.trim();
  
  if (!trimmedUrl) {
    return {
      isValid: false,
      error: '請先貼上 YouTube 影片網址',
    };
  }

  // 檢查是否為有效的 URL 格式
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmedUrl);
  } catch {
    return {
      isValid: false,
      error: '這看起來不是有效的影片連結，請再試一次',
    };
  }

  // 檢查是否為 YouTube 域名
  const validDomains = [
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'youtu.be',
  ];

  if (!validDomains.includes(parsedUrl.hostname)) {
    return {
      isValid: false,
      error: '這看起來不是有效的影片連結，請再試一次',
    };
  }

  // 檢查是否為播放清單
  if (isPlaylistUrl(parsedUrl)) {
    return {
      isValid: false,
      error: '目前版本僅支援單一影片，請貼上單支影片的網址',
    };
  }

  // 提取影片 ID
  const videoId = extractVideoId(parsedUrl);
  
  if (!videoId) {
    return {
      isValid: false,
      error: '這看起來不是有效的影片連結，請再試一次',
    };
  }

  return {
    isValid: true,
    videoId,
  };
}

/**
 * 檢查是否為播放清單 URL
 */
function isPlaylistUrl(url: URL): boolean {
  // 檢查 URL 參數中是否包含 list 參數
  const listParam = url.searchParams.get('list');
  
  if (listParam) {
    // 如果同時有 v 和 list 參數，且 list 不是 watch later 或 favorites，則視為播放清單
    const videoParam = url.searchParams.get('v');
    const isWatchLater = listParam === 'WL';
    const isFavorites = listParam === 'FL';
    
    if (!videoParam || (!isWatchLater && !isFavorites)) {
      return true;
    }
  }

  // 檢查路徑是否為播放清單路徑
  const playlistPaths = ['/playlist', '/watch_videos'];
  return playlistPaths.some(path => url.pathname.startsWith(path));
}

/**
 * 從 YouTube URL 提取影片 ID
 */
function extractVideoId(url: URL): string | null {
  // youtu.be 短網址格式
  if (url.hostname === 'youtu.be') {
    const videoId = url.pathname.slice(1); // 移除開頭的 '/'
    return isValidVideoId(videoId) ? videoId : null;
  }

  // youtube.com 標準格式
  if (url.hostname.includes('youtube.com')) {
    // /watch?v=VIDEO_ID 格式
    if (url.pathname === '/watch') {
      const videoId = url.searchParams.get('v');
      return videoId && isValidVideoId(videoId) ? videoId : null;
    }

    // /embed/VIDEO_ID 格式
    if (url.pathname.startsWith('/embed/')) {
      const videoId = url.pathname.split('/embed/')[1]?.split('?')[0];
      return videoId && isValidVideoId(videoId) ? videoId : null;
    }

    // /v/VIDEO_ID 格式
    if (url.pathname.startsWith('/v/')) {
      const videoId = url.pathname.split('/v/')[1]?.split('?')[0];
      return videoId && isValidVideoId(videoId) ? videoId : null;
    }
  }

  return null;
}

/**
 * 驗證影片 ID 格式
 */
function isValidVideoId(videoId: string): boolean {
  // YouTube 影片 ID 通常是 11 個字符，包含字母、數字、連字符和底線
  const videoIdRegex = /^[a-zA-Z0-9_-]{11}$/;
  return videoIdRegex.test(videoId);
}

/**
 * 標準化 YouTube URL
 */
export function normalizeYouTubeUrl(url: string): string | null {
  const validation = validateYouTubeUrl(url);
  
  if (!validation.isValid || !validation.videoId) {
    return null;
  }

  return `https://www.youtube.com/watch?v=${validation.videoId}`;
}

/**
 * 錯誤訊息映射
 */
export const ERROR_MESSAGES = {
  EMPTY_URL: '請先貼上 YouTube 影片網址',
  INVALID_URL: '這看起來不是有效的影片連結，請再試一次',
  PLAYLIST_NOT_SUPPORTED: '目前版本僅支援單一影片，請貼上單支影片的網址',
  INVALID_VIDEO_ID: '這看起來不是有效的影片連結，請再試一次',
} as const;