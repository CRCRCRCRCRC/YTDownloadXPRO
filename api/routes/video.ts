import express, { Request, Response } from 'express';
import ytdl from '@distube/ytdl-core';
import { supabase } from '../config/supabase.js';
import { YouTubeService } from '../services/youtubeService.js';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

// Configure ffmpeg binary path if available
if (ffmpegPath) {
  try {
    // @ts-ignore - types may not reflect ESM default
    ffmpeg.setFfmpegPath(ffmpegPath as unknown as string);
  } catch (e) {
    console.warn('[Download] Failed to set ffmpeg path:', e);
  }
}

const router = express.Router();

/**
 * Get video information
 * POST /api/video/info
 */
router.post('/info', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid YouTube URL'
      });
    }

    const videoInfo = await YouTubeService.getVideoInfo(url);
    
    res.json({
      success: true,
      data: videoInfo
    });
  } catch (error) {
    console.error('Error getting video info:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get video info'
    });
  }
});

/**
 * Download video
 * POST /api/video/download
 */
router.post('/download', async (req: Request, res: Response) => {
  let historyData: any = null;
  
  try {
    const { url, quality, format, hasAudio, hasVideo } = req.body;

    if (!url || !quality || !format) {
      return res.status(400).json({
        success: false,
        error: 'URL, quality, and format are required'
      });
    }

    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid YouTube URL'
      });
    }

    // Get video info using YouTubeService to ensure consistent format processing
    const videoInfo = await YouTubeService.getVideoInfo(url);
    
    // Get raw info for ytdl stream creation
    const getInfoWithRetry = async (url: string, maxRetries = 3): Promise<any> => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return await ytdl.getInfo(url);
        } catch (error: any) {
          console.error(`Attempt ${attempt} failed:`, error.message);
          if (attempt === maxRetries) {
            throw error;
          }
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    };

    const info = await getInfoWithRetry(url);
    const videoDetails = info.videoDetails;
    const rawFormats = info.formats;

    console.log(`[Download] Available raw formats: ${rawFormats.length}`);
    console.log(`[Download] Processed formats: ${videoInfo.formats.length}`);
    console.log(`[Download] Request params:`, { quality, format, hasAudio, hasVideo });

    // Save download history
    try {
      const { data, error } = await supabase
        .from('download_history')
        .insert({
          video_url: url,
          video_title: videoDetails.title,
          video_duration: videoDetails.lengthSeconds,
          quality: quality,
          format: format,
          status: 'downloading',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving download history:', error);
      } else {
        historyData = data;
      }
    } catch (historyError) {
      console.error('Error with download history:', historyError);
    }

    // Log processed formats from YouTubeService
    videoInfo.formats.forEach((fmt: any, index: number) => {
      console.log(`[Download] Processed format ${index + 1}:`, {
        quality: fmt.quality,
        container: fmt.container,
        hasAudio: fmt.hasAudio,
        hasVideo: fmt.hasVideo,
        filesize: fmt.filesize
      });
    });

    // Use processed formats from YouTubeService (these already prioritize audio)
    let selectedProcessedFormat = null;
    
    console.log(`[Download] Looking for format with:`, { quality, format, hasAudio, hasVideo });
    
    // First, try to find exact match in processed formats
    selectedProcessedFormat = videoInfo.formats.find((fmt: any) => {
      const qualityMatch = fmt.quality === quality;
      const containerMatch = fmt.container === format;
      const audioMatch = hasAudio === undefined || fmt.hasAudio === hasAudio;
      const videoMatch = hasVideo === undefined || fmt.hasVideo === hasVideo;
      
      console.log(`[Download] Checking processed format:`, {
        format: fmt,
        qualityMatch,
        containerMatch,
        audioMatch,
        videoMatch,
        overall: qualityMatch && containerMatch && audioMatch && videoMatch
      });
      
      return qualityMatch && containerMatch && audioMatch && videoMatch;
    });
    
    console.log(`[Download] Exact processed format match:`, selectedProcessedFormat ? 'Found' : 'Not found');
    
    // If no exact match and audio is required, find any format with audio
    if (!selectedProcessedFormat && hasAudio) {
      selectedProcessedFormat = videoInfo.formats.find((fmt: any) => {
        const qualityMatch = fmt.quality === quality;
        const audioMatch = fmt.hasAudio === true;
        const videoMatch = hasVideo === undefined || fmt.hasVideo === hasVideo;
        
        return qualityMatch && audioMatch && videoMatch;
      });
      
      console.log(`[Download] Audio priority processed format match:`, selectedProcessedFormat ? 'Found' : 'Not found');
      
      // If still no match, use the first available format with audio
      if (!selectedProcessedFormat) {
        selectedProcessedFormat = videoInfo.formats.find((fmt: any) => {
          const audioMatch = fmt.hasAudio === true;
          const videoMatch = hasVideo === undefined || fmt.hasVideo === hasVideo;
          return audioMatch && videoMatch;
        });
        
        if (selectedProcessedFormat) {
          console.log(`[Download] Using fallback audio format:`, {
            quality: selectedProcessedFormat.quality,
            container: selectedProcessedFormat.container
          });
        }
      }
    }
    
    // If no processed format found, fall back to quality-only match
    if (!selectedProcessedFormat) {
      selectedProcessedFormat = videoInfo.formats.find((fmt: any) => {
        const qualityMatch = fmt.quality === quality;
        const videoMatch = hasVideo === undefined || fmt.hasVideo === hasVideo;
        return qualityMatch && videoMatch;
      });
      
      console.log(`[Download] Quality-only processed format match:`, selectedProcessedFormat ? 'Found' : 'Not found');
    }
    
    // Now find the corresponding raw format for ytdl
    let targetFormat = null;
    
    if (selectedProcessedFormat) {
      console.log(`[Download] Looking for raw format matching:`, {
        quality: selectedProcessedFormat.quality,
        container: selectedProcessedFormat.container,
        hasAudio: selectedProcessedFormat.hasAudio,
        downloadType: selectedProcessedFormat.downloadType
      });
      
      if (selectedProcessedFormat.downloadType === 'video-only') {
        // 視頻專用下載：找對應的視頻格式
        console.log(`[Download] Video-only download, finding video format`);
        
        targetFormat = rawFormats.find((fmt: any) => {
          const qualityMatch = (fmt.qualityLabel === selectedProcessedFormat.quality) || (fmt.quality === selectedProcessedFormat.quality);
          const isVideoOnly = fmt.hasVideo && !fmt.hasAudio;
          
          console.log(`[Download] Checking video format:`, {
            qualityLabel: fmt.qualityLabel,
            quality: fmt.quality,
            qualityMatch,
            isVideoOnly,
            container: fmt.container
          });
          
          return qualityMatch && isVideoOnly;
        });
        
      } else if (selectedProcessedFormat.downloadType === 'audio-only') {
        // 音頻專用下載：找對應的音頻格式
        console.log(`[Download] Audio-only download, finding audio format`);
        
        targetFormat = rawFormats.find((fmt: any) => {
          const isAudioOnly = fmt.hasAudio && !fmt.hasVideo;
          
          console.log(`[Download] Checking audio format:`, {
            isAudioOnly,
            container: fmt.container,
            mimeType: fmt.mimeType
          });
          
          return isAudioOnly;
        });
        
      } else {
        // 合併格式下載：找包含音視頻的格式
        console.log(`[Download] Looking for combined format`);
        
        targetFormat = rawFormats.find((fmt: any) => {
          const qualityMatch = (fmt.qualityLabel === selectedProcessedFormat.quality) || (fmt.quality === selectedProcessedFormat.quality);
          const containerMatch = fmt.container === selectedProcessedFormat.container;
          const audioMatch = fmt.hasAudio === selectedProcessedFormat.hasAudio;
          const videoMatch = fmt.hasVideo === selectedProcessedFormat.hasVideo;
          
          return qualityMatch && containerMatch && audioMatch && videoMatch;
        });
        
        if (!targetFormat) {
          // Fallback: find any raw format with matching quality and audio status
          targetFormat = rawFormats.find((fmt: any) => {
            const qualityMatch = (fmt.qualityLabel === selectedProcessedFormat.quality) || (fmt.quality === selectedProcessedFormat.quality);
            const audioMatch = fmt.hasAudio === selectedProcessedFormat.hasAudio;
            const videoMatch = fmt.hasVideo === selectedProcessedFormat.hasVideo;
            
            return qualityMatch && audioMatch && videoMatch;
          });
        }
      }
    }
    
    // Check if we have the required format
    if (!targetFormat) {
      console.log(`[Download] ERROR: Missing required format`, {
        downloadType: selectedProcessedFormat?.downloadType,
        hasTargetFormat: !!targetFormat
      });
      
      // Update download status to failed
      if (historyData) {
        await supabase
          .from('download_history')
          .update({ 
            status: 'failed',
            completed_at: new Date().toISOString()
          })
          .eq('id', historyData.id);
      }

      // Provide specific error message
      let errorMessage = `Quality ${quality} not available`;
      if (selectedProcessedFormat?.downloadType === 'video-only') {
        errorMessage = `Cannot find video-only format for ${quality} quality. Please try other qualities`;
      } else if (selectedProcessedFormat?.downloadType === 'audio-only') {
        errorMessage = `Cannot find audio-only format. Please try other options`;
      } else if (hasAudio) {
        errorMessage = `Cannot find ${quality} quality with audio. Please try other qualities or formats`;
      }

      return res.status(404).json({
        success: false,
        error: errorMessage
      });
    }
    
    console.log(`[Download] Selected format:`, {
      format: targetFormat ? {
        quality: targetFormat.qualityLabel || targetFormat.quality,
        container: targetFormat.container,
        hasAudio: targetFormat.hasAudio,
        hasVideo: targetFormat.hasVideo,
        contentLength: targetFormat.contentLength
      } : 'null',
      downloadType: selectedProcessedFormat?.downloadType
    });

    // Generate filename
    const sanitizedTitle = videoDetails.title
      .replace(/[^a-zA-Z0-9\s-_]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 50);

    // 強制輸出為 mp4，若來源為 webm 或僅影片會自動合併/轉檔
    const outputContainer = 'mp4';
    const finalFilename = `${sanitizedTitle}_${quality}.${outputContainer}`;

    // Set response headers
    res.setHeader('Content-Disposition', `attachment; filename="${finalFilename}"`);
    res.setHeader('Content-Type', selectedProcessedFormat?.downloadType === 'audio-only' ? 'audio/mp4' : 'video/mp4');

    // Set Content-Length for direct downloads when known (combined direct stream)
    if (targetFormat.contentLength && (selectedProcessedFormat?.downloadType !== 'video-only') && targetFormat.hasAudio) {
      res.setHeader('Content-Length', targetFormat.contentLength);
    }

    // Create download stream with retry mechanism
    const createStreamWithRetry = async (url: string, options: any, maxRetries = 2): Promise<any> => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          return ytdl(url, options);
        } catch (error: any) {
          console.error(`Stream creation attempt ${attempt} failed:`, error.message);
          if (attempt === maxRetries) {
            throw new Error('Unable to create download stream, please try again later');
          }
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    };

    // If selected is video-only or target format lacks audio, merge with best audio via ffmpeg
    if (selectedProcessedFormat?.downloadType === 'video-only' || !targetFormat.hasAudio) {
      console.log('[Download] Merging video-only with best audio via ffmpeg');

      // Create streams
      const videoStream = await createStreamWithRetry(url, { format: targetFormat });
      // Prefer highestaudio; if that fails, fall back to first audio-only format
      let audioStream: any;
      try {
        audioStream = await createStreamWithRetry(url, { filter: 'audioonly', quality: 'highestaudio' });
      } catch (e) {
        console.warn('[Download] Failed to get highestaudio, falling back to generic audioonly');
        audioStream = await createStreamWithRetry(url, { filter: 'audioonly' });
      }

      // Use ffmpeg to mux video+audio, copying video codec; transcode audio to match container when needed
      const ff = ffmpeg()
        .input(videoStream)
        .input(audioStream)
        .outputOptions([
          '-c:v copy',
          '-c:a aac',
        ])
        .format('mp4');

      ff.on('error', async (err: any) => {
        console.error('[Download] ffmpeg error:', err?.message || err);
        if (historyData) {
          await supabase
            .from('download_history')
            .update({ status: 'failed', completed_at: new Date().toISOString() })
            .eq('id', historyData.id);
        }
        if (!res.headersSent) {
          res.status(500).json({ success: false, error: 'Failed to merge audio and video' });
        } else {
          // End response on error
          try { res.end(); } catch {}
        }
      });

      ff.on('end', async () => {
        if (historyData) {
          await supabase
            .from('download_history')
            .update({ status: 'completed', completed_at: new Date().toISOString() })
            .eq('id', historyData.id);
        }
      });

      // Start piping to response
      ff.pipe(res, { end: true });

    } else {
      // Standard direct download (format has both audio and video)
      const videoStream = await createStreamWithRetry(url, { format: targetFormat });

      // Handle stream events
      videoStream.on('error', async (error: any) => {
        console.error('Video stream error:', error);

        // Update download status to failed
        if (historyData) {
          await supabase
            .from('download_history')
            .update({
              status: 'failed',
              completed_at: new Date().toISOString()
            })
            .eq('id', historyData.id);
        }

        if (!res.headersSent) {
          let errorMessage = 'Download failed';

          // Provide specific error messages based on error type
          if (error.message?.includes('403') || error.message?.includes('Forbidden')) {
            errorMessage = 'Video is protected by copyright or region restrictions';
          } else if (error.message?.includes('404') || error.message?.includes('Not Found')) {
            errorMessage = 'Video not found or has been deleted';
          } else if (error.message?.includes('Could not extract functions')) {
            errorMessage = 'YouTube service temporarily unavailable, please try again later';
          } else if (error.message?.includes('Private video')) {
            errorMessage = 'This is a private video and cannot be downloaded';
          } else if (error.message?.includes('Video unavailable')) {
            errorMessage = 'Video temporarily unavailable, please try again later';
          }

          res.status(500).json({
            success: false,
            error: errorMessage
          });
        }
      });

      videoStream.on('end', async () => {
        // Update download status to completed
        if (historyData) {
          await supabase
            .from('download_history')
            .update({
              status: 'completed',
              completed_at: new Date().toISOString()
            })
            .eq('id', historyData.id);
        }
      });

      // Pipe video stream to response
      videoStream.pipe(res);
    }

  } catch (downloadError: any) {
    console.error('Download error:', downloadError);
    
    // Update download status to failed
    if (historyData) {
      await supabase
        .from('download_history')
        .update({ 
          status: 'failed',
          completed_at: new Date().toISOString()
        })
        .eq('id', historyData.id);
    }

    if (!res.headersSent) {
      let errorMessage = 'Download failed';
      
      // Provide specific error messages based on error type
      if (downloadError.message?.includes('Could not extract functions')) {
        errorMessage = 'YouTube service temporarily unavailable, please try again later. This may be due to YouTube API updates';
      } else if (downloadError.message?.includes('Video unavailable')) {
        errorMessage = 'Video temporarily unavailable, please try again later';
      } else if (downloadError.message?.includes('Private video')) {
        errorMessage = 'This is a private video and cannot be downloaded';
      } else if (downloadError.message?.includes('403')) {
        errorMessage = 'Video is protected by copyright or region restrictions';
      } else if (downloadError.message?.includes('404')) {
        errorMessage = 'Video not found or has been deleted';
      } else if (downloadError.message?.includes('YouTube service temporarily unavailable')) {
        errorMessage = downloadError.message;
      }
      
      res.status(500).json({
        success: false,
        error: errorMessage
      });
    }
  }
});

/**
 * Get download history
 * GET /api/video/history
 */
router.get('/history', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('download_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      data: data || []
    });
  } catch (error) {
    console.error('Error getting download history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get download history'
    });
  }
});

export default router;