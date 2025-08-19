/**
 * 文件系統模擬模組 - 用於 Vercel 環境
 */

const originalFs = require('fs');

// 創建一個代理來攔截所有文件系統操作
const fsMock = new Proxy(originalFs, {
  get(target, prop) {
    if (prop === 'writeFileSync') {
      return function(file: any, data: any, options?: any) {
        if (typeof file === 'string' && (
          file.includes('watch.html') || 
          file.includes('debug') ||
          file.includes('.html') ||
          file.match(/\d+-watch\.html$/)
        )) {
          console.log(`[FS Mock] Blocked writeFileSync: ${file}`);
          return;
        }
        return target.writeFileSync(file, data, options);
      };
    }
    
    if (prop === 'writeFile') {
      return function(file: any, data: any, options?: any, callback?: any) {
        if (typeof file === 'string' && (
          file.includes('watch.html') || 
          file.includes('debug') ||
          file.includes('.html') ||
          file.match(/\d+-watch\.html$/)
        )) {
          console.log(`[FS Mock] Blocked writeFile: ${file}`);
          if (typeof callback === 'function') {
            process.nextTick(callback);
          }
          return;
        }
        return target.writeFile(file, data, options, callback);
      };
    }
    
    if (prop === 'createWriteStream') {
      return function(path: any, options?: any) {
        if (typeof path === 'string' && (
          path.includes('watch.html') || 
          path.includes('debug') ||
          path.includes('.html') ||
          path.match(/\d+-watch\.html$/)
        )) {
          console.log(`[FS Mock] Blocked createWriteStream: ${path}`);
          const { Writable } = require('stream');
          return new Writable({
            write(chunk, encoding, callback) {
              callback();
            }
          });
        }
        return target.createWriteStream(path, options);
      };
    }
    
    return target[prop];
  }
});

// 替換 require cache 中的 fs 模組
require.cache[require.resolve('fs')] = {
  id: require.resolve('fs'),
  filename: require.resolve('fs'),
  loaded: true,
  exports: fsMock
};

export default fsMock;