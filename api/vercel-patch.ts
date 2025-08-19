/**
 * Vercel 環境補丁 - 必須在所有其他模組載入之前執行
 */

// 設置環境變數
process.env.YTDL_NO_UPDATE = 'true';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// 在 Vercel 環境中設置臨時目錄
if (process.env.VERCEL) {
  process.env.TMPDIR = '/tmp';
  process.env.TMP = '/tmp';
  process.env.TEMP = '/tmp';
  
  console.log('[Vercel Patch] Applying file system patch for Vercel...');
  
  try {
    // 改變工作目錄到 /tmp（可寫入）
    process.chdir('/tmp');
    console.log('[Vercel Patch] Changed working directory to /tmp');
    
    // 攔截文件寫入操作
    const fs = require('fs');
    const originalWriteFileSync = fs.writeFileSync;
    
    fs.writeFileSync = function(file: any, data: any, options?: any) {
      // 如果是相對路徑的 HTML 文件，重定向到 /tmp
      if (typeof file === 'string' && (
        file.includes('watch.html') || 
        file.match(/^\.\//)) && 
        file.includes('.html')
      ) {
        const newPath = `/tmp/${file.replace(/^\.\//, '')}`;
        console.log(`[Vercel Patch] Redirecting file write from ${file} to ${newPath}`);
        try {
          return originalWriteFileSync.call(this, newPath, data, options);
        } catch (e) {
          console.log(`[Vercel Patch] Silently ignoring write to ${newPath}`);
          return;
        }
      }
      return originalWriteFileSync.call(this, file, data, options);
    };
    
    console.log('[Vercel Patch] File system patch applied successfully');
  } catch (error) {
    console.warn('[Vercel Patch] Failed to apply patch:', error);
  }
}

export {};