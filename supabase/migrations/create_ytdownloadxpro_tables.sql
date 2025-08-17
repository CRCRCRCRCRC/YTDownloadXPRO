-- YTDownloadXPRO Database Tables Migration
-- Create download_history and video_cache tables

-- 下載歷史表 (download_history)
CREATE TABLE download_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_url VARCHAR(500) NOT NULL,
    video_title VARCHAR(200),
    video_id VARCHAR(50) NOT NULL,
    quality VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- create index for download_history
CREATE INDEX idx_download_history_video_id ON download_history(video_id);
CREATE INDEX idx_download_history_created_at ON download_history(created_at DESC);
CREATE INDEX idx_download_history_status ON download_history(status);

-- grant permissions for download_history
GRANT SELECT ON download_history TO anon;
GRANT ALL PRIVILEGES ON download_history TO authenticated;

-- 影片快取表 (video_cache)
CREATE TABLE video_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    thumbnail VARCHAR(500),
    duration VARCHAR(20),
    channel VARCHAR(100),
    formats JSONB,
    cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours')
);

-- create index for video_cache
CREATE INDEX idx_video_cache_video_id ON video_cache(video_id);
CREATE INDEX idx_video_cache_expires_at ON video_cache(expires_at);

-- grant permissions for video_cache
GRANT SELECT ON video_cache TO anon;
GRANT ALL PRIVILEGES ON video_cache TO authenticated;