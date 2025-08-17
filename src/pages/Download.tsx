import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download as DownloadIcon, Play, Clock, User, Eye, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Loading, FullScreenLoading } from '../components/ui/Loading';
import { useVideoStore } from '../store/useVideoStore';
import apiService, { VideoFormat } from '../services/api';
import { toast } from 'sonner';

const Download: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentVideo, 
    isDownloading, 
    setDownloading, 
    setError, 
    error 
  } = useVideoStore();
  
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    if (!currentVideo) {
      navigate('/');
    } else if (currentVideo.formats && currentVideo.formats.length > 0) {
      // 自動選擇最佳的有音頻格式
      // 優先選擇有音頻的格式，按畫質從高到低排序
      const audioFormats = currentVideo.formats.filter(f => f.hasAudio);
      if (audioFormats.length > 0) {
        const qualityOrder = ['2160p', '1440p', '1080p', '720p', '480p', '360p', '240p', '144p'];
        const bestAudioFormat = audioFormats.sort((a, b) => {
          const aIndex = qualityOrder.indexOf(a.quality);
          const bIndex = qualityOrder.indexOf(b.quality);
          return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
        })[0];
        setSelectedFormat(bestAudioFormat);
      } else {
        // 如果沒有音頻格式，選擇第一個格式
        const firstFormat = currentVideo.formats[0];
        setSelectedFormat(firstFormat);
      }
    }
  }, [currentVideo, navigate]);

  const handlePlay = () => {
    if (currentVideo) {
      window.open(`https://www.youtube.com/watch?v=${currentVideo.videoId}`, '_blank');
    }
  };

  const handleDownload = async () => {
    if (!currentVideo || !selectedFormat) {
      toast.error('請選擇下載格式');
      return;
    }

    setDownloading(true);
    setDownloadProgress(0);

    try {
      const videoUrl = `https://www.youtube.com/watch?v=${currentVideo.videoId}`;
      // 直接尊重使用者選擇的格式（即使沒有音頻），後端會自動尋找音頻並進行合併/轉碼，最終輸出含音訊的 MP4
      const downloadFormat = selectedFormat;

      if (!selectedFormat.hasAudio) {
        // 告知使用者：高畫質（如 4K/8K）通常需要合併/轉碼，耗時較長
        toast.message('高畫質格式將自動合併音頻並轉碼為 MP4（可能較耗時）');
      }

      await apiService.downloadVideo(
        videoUrl,
        downloadFormat.quality,
        downloadFormat.container,
        downloadFormat.hasAudio,
        downloadFormat.hasVideo
      );
      
      toast.success('下載完成！');
    } catch (error) {
      console.error('Download error:', error);
      const errorMessage = error instanceof Error ? error.message : '下載失敗';
      if (errorMessage.includes('Quality') && errorMessage.includes('not available')) {
        toast.error('所選畫質不可用，請選擇其他畫質');
      } else if (errorMessage.includes('Invalid')) {
        toast.error('影片網址無效，請重新檢查');
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        toast.error('網路連線問題，請檢查網路後重試');
      } else {
        toast.error(`下載失敗：${errorMessage}`);
      }
    } finally {
      setDownloading(false);
      setDownloadProgress(0);
    }
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '未知大小';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getQualityColor = (quality: string): string => {
    if (quality.includes('4K') || quality.includes('2160')) return 'text-purple-600 bg-purple-100';
    if (quality.includes('1080')) return 'text-blue-600 bg-blue-100';
    if (quality.includes('720')) return 'text-green-600 bg-green-100';
    if (quality.includes('480')) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  if (!currentVideo) {
    return <FullScreenLoading text="載入影片資訊中..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {isDownloading && (
        <FullScreenLoading text={`下載中... ${Math.round(downloadProgress)}%`} />
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="secondary"
          onClick={() => navigate('/')}
          className="mb-8 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>返回首頁</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Info */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={currentVideo.thumbnail}
                    alt={currentVideo.title}
                    className="w-full h-64 sm:h-80 object-cover rounded-t-xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-xl">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {currentVideo.duration}
                  </div>
                </div>
                
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {currentVideo.title}
                  </h1>
                  
                  <div className="flex items-center space-x-6 text-gray-600 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{currentVideo.channel}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{currentVideo.duration}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <button 
                      onClick={handlePlay}
                      className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <Play className="w-5 h-5" />
                      播放影片
                    </button>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Download Options */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                  <DownloadIcon className="h-5 w-5" />
                  <span>下載選項</span>
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentVideo.formats && currentVideo.formats.length > 0 ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          選擇畫質
                        </label>
                        <select
                          value={selectedFormat ? selectedFormat.quality : ''}
                          onChange={(e) => {
                            if (e.target.value) {
                              const format = currentVideo.formats.find(f => f.quality === e.target.value);
                              if (format) {
                                setSelectedFormat(format);
                              }
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                        >
                          <option value="">請選擇下載選項...</option>
                          {currentVideo.formats
                            .sort((a, b) => {
                              const qualityOrder = ['2160p', '1440p', '1080p', '720p', '480p', '360p', '240p', '144p'];
                              const aIndex = qualityOrder.indexOf(a.quality);
                              const bIndex = qualityOrder.indexOf(b.quality);
                              return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
                            })
                            .map((format, index) => {
                              const displayText = `${format.quality} (${format.container.toUpperCase()}${format.hasAudio ? ' + 音訊' : '（僅影片，將自動合併音訊）'}) - ${formatFileSize(format.filesize)}`;

                              return (
                                <option key={index} value={format.quality}>
                                  {displayText}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      
                      {selectedFormat && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">已選擇格式</h4>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center justify-between">
                              <span>畫質:</span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                getQualityColor(selectedFormat.quality)
                              }`}>
                                {selectedFormat.quality}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>格式:</span>
                              <span className="font-medium">{selectedFormat.container.toUpperCase()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>包含內容:</span>
                              <div className="flex items-center space-x-2">
                                {selectedFormat.hasVideo && (
                                  <span className="flex items-center space-x-1">
                                    <Play className="h-3 w-3" />
                                    <span>影片</span>
                                  </span>
                                )}
                                {selectedFormat.hasAudio && (
                                  <span className="flex items-center space-x-1">
                                    <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                                    <span>音訊</span>
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>檔案大小:</span>
                              <span className="font-medium">{formatFileSize(selectedFormat.filesize)}</span>
                            </div>
                          </div>
                          <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                            <p className="text-sm text-blue-800">
                              ✅ 這是完整的視頻文件，包含視頻和音頻。下載後可直接播放。
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Loading size="md" text="載入格式選項中..." />
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <Button
                    onClick={handleDownload}
                    disabled={!selectedFormat || isDownloading}
                    isLoading={isDownloading}
                    className="w-full"
                    size="lg"
                  >
                    {isDownloading ? `下載中 ${Math.round(downloadProgress)}%` : '開始下載'}
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">下載說明</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 選擇您需要的畫質和格式</li>
                    <li>• 高畫質檔案較大，下載時間較長</li>
                    <li>• 建議在WiFi環境下下載</li>
                  </ul>
                  {selectedFormat && (
                    <div className="mt-3">
                      <p className="text-sm text-blue-800">
                        <strong>選中格式：</strong> {selectedFormat.quality} ({selectedFormat.container.toUpperCase()})
                        {selectedFormat.downloadType === 'video-only' ? ' 🎬 視頻專用' : 
                         selectedFormat.downloadType === 'audio-only' ? ' 🎵 音頻專用' :
                         selectedFormat.hasAudio ? ' + 音訊' : ' ⚠️ 僅影片'}
                      </p>
                      {selectedFormat.filesize && (
                        <p className="text-sm text-blue-800 mt-1">
                          <strong>檔案大小：</strong> {formatFileSize(selectedFormat.filesize)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;