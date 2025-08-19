/**
 * Vercel 環境補丁 - 必須在所有其他模組載入之前執行
 */

// 設置環境變數
process.env.YTDL_NO_UPDATE = 'true';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.YTDL_DEBUG = 'false';

// 嘗試禁用 ytdl-core 的調試功能
try {
  // 設置全域變數來禁用調試
  (global as any).YTDL_DEBUG = false;
  (global as any).YTDL_NO_DEBUG = true;
} catch (e) {
  // 忽略錯誤
}

// 在 Vercel 或生產環境中禁用文件寫入來避免 EROFS 錯誤
if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
  console.log('[Vercel Patch] Applying comprehensive file system patch...');
  
  try {
    // 方法1: 直接修改 fs 模組
    const fs = require('fs');
    const originalWriteFileSync = fs.writeFileSync;
    const originalWriteFile = fs.writeFile;
    const originalCreateWriteStream = fs.createWriteStream;
    
    const shouldBlock = (file: string) => {
      return file.includes('watch.html') || 
             file.includes('debug') ||
             file.includes('.html') ||
             file.match(/\d+-watch\.html$/) ||
             file.match(/^\.\//);  // 攔截相對路徑文件
    };
    
    // 攔截同步寫入
    fs.writeFileSync = function(file: any, data: any, options?: any) {
      if (typeof file === 'string' && shouldBlock(file)) {
        console.log(`[Vercel Patch] Blocked writeFileSync: ${file}`);
        return;
      }
      return originalWriteFileSync.call(this, file, data, options);
    };
    
    // 攔截異步寫入
    fs.writeFile = function(file: any, data: any, options?: any, callback?: any) {
      if (typeof file === 'string' && shouldBlock(file)) {
        console.log(`[Vercel Patch] Blocked writeFile: ${file}`);
        if (typeof callback === 'function') {
          process.nextTick(callback);
        }
        return;
      }
      return originalWriteFile.call(this, file, data, options, callback);
    };
    
    // 攔截寫入流創建
    fs.createWriteStream = function(path: any, options?: any) {
      if (typeof path === 'string' && shouldBlock(path)) {
        console.log(`[Vercel Patch] Blocked createWriteStream: ${path}`);
        const { Writable } = require('stream');
        return new Writable({
          write(chunk, encoding, callback) {
            callback();
          }
        });
      }
      return originalCreateWriteStream.call(this, path, options);
    };
    
    // 方法2: 修改 Module._load 來攔截 fs 模組載入
    const Module = require('module');
    const originalLoad = Module._load;
    
    Module._load = function(request: string, parent: any) {
      if (request === 'fs') {
        return fs; // 返回我們修改過的 fs
      }
      return originalLoad.apply(this, arguments);
    };
    
    console.log('[Vercel Patch] Comprehensive file system patch applied successfully');
  } catch (error) {
    console.warn('[Vercel Patch] Failed to apply file system patch:', error);
  }
}

export {};