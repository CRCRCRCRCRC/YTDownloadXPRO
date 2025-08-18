/**
 * 測試 YouTube 服務的簡單腳本
 * 使用方法: node test-youtube.js
 */

import { YouTubeService } from './api/services/youtubeService.js';

async function testYouTubeService() {
  const testUrl = 'https://www.youtube.com/watch?v=ZeerrnuLi5E';
  
  console.log('🧪 測試 YouTube 服務...');
  console.log(`📹 測試影片: ${testUrl}`);
  
  try {
    const videoInfo = await YouTubeService.getVideoInfo(testUrl);
    
    console.log('✅ 成功獲取影片資訊:');
    console.log(`📝 標題: ${videoInfo.title}`);
    console.log(`👤 頻道: ${videoInfo.channel}`);
    console.log(`⏱️ 時長: ${videoInfo.duration}`);
    console.log(`🎬 可用格式數量: ${videoInfo.formats.length}`);
    
    if (videoInfo.formats.length > 0) {
      console.log('\n📋 前3個可用格式:');
      videoInfo.formats.slice(0, 3).forEach((format, index) => {
        console.log(`  ${index + 1}. ${format.quality} (${format.container}) - 音訊:${format.hasAudio ? '✅' : '❌'} 影片:${format.hasVideo ? '✅' : '❌'}`);
      });
    }
    
  } catch (error) {
    console.error('❌ 測試失敗:', error.message);
    
    if (error.message.includes('機器人') || error.message.includes('bot')) {
      console.log('\n💡 建議解決方案:');
      console.log('1. 等待幾分鐘後再試');
      console.log('2. 嘗試其他影片網址');
      console.log('3. 如果問題持續，可能需要設定 YouTube Cookie');
    }
  }
}

// 執行測試
testYouTubeService();