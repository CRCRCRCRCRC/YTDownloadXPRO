-- Clear video cache to test new format processing logic
DELETE FROM video_cache;

-- Reset the cache expiration for any remaining entries
UPDATE video_cache SET expires_at = NOW() - INTERVAL '1 hour' WHERE expires_at > NOW();