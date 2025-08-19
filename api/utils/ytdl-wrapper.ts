/**
 * ytdl-core 包裝器 - 處理 Vercel 環境的文件系統問題
 */

import ytdl from '@distube/ytdl-core';

// 包裝 ytdl.getInfo 來處理文件系統錯誤
export const getVideoInfo = async (url: string, options?: any) => {
  try {
    return await ytdl.getInfo(url, options);
  } catch (error: any) {
    // 如果是文件系統錯誤，嘗試重新執行
    if (error.message && error.message.includes('EROFS')) {
      console.log('[YTDL Wrapper] Detected EROFS error, retrying...');
      
      // 嘗試在 /tmp 目錄中執行
      const originalCwd = process.cwd();
      try {
        if (process.env.VERCEL) {
          process.chdir('/tmp');
        }
        const result = await ytdl.getInfo(url, options);
        return result;
      } finally {
        if (process.env.VERCEL) {
          try {
            process.chdir(originalCwd);
          } catch (e) {
            // 忽略錯誤
          }
        }
      }
    }
    throw error;
  }
};

// 包裝 ytdl 流創建
export const createStream = (url: string, options?: any) => {
  // 在 Vercel 環境中，先嘗試改變工作目錄
  const originalCwd = process.cwd();
  
  try {
    if (process.env.VERCEL) {
      try {
        process.chdir('/tmp');
      } catch (e) {
        // 忽略錯誤
      }
    }
    
    return ytdl(url, options);
  } catch (error: any) {
    if (error.message && error.message.includes('EROFS')) {
      console.log('[YTDL Wrapper] Detected EROFS error in stream creation');
      throw new Error('YouTube service temporarily unavailable due to server limitations. Please try again later.');
    }
    throw error;
  } finally {
    if (process.env.VERCEL) {
      try {
        process.chdir(originalCwd);
      } catch (e) {
        // 忽略錯誤
      }
    }
  }
};

// 導出其他 ytdl 函數
export const validateURL = ytdl.validateURL;
export const getVideoID = ytdl.getVideoID;

// 創建一個可以作為函數調用的包裝器
const ytdlWrapper = (url: string, options?: any) => {
  return createStream(url, options);
};

// 添加靜態方法
ytdlWrapper.getInfo = getVideoInfo;
ytdlWrapper.validateURL = validateURL;
ytdlWrapper.getVideoID = getVideoID;

export default ytdlWrapper;