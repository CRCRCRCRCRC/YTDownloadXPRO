/**
 * 簡單的編譯測試
 */

console.log('Testing TypeScript compilation...');

try {
  // 測試 ytdl-wrapper 導入
  const ytdlWrapper = require('./api/utils/ytdl-wrapper.js');
  console.log('✅ ytdl-wrapper imported successfully');
  
  // 測試 YouTube 服務導入
  const { YouTubeService } = require('./api/services/youtubeService.js');
  console.log('✅ YouTubeService imported successfully');
  
  console.log('🎉 All imports successful!');
} catch (error) {
  console.error('❌ Import failed:', error.message);
  process.exit(1);
}