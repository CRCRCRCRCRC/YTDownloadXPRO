import { validateYouTubeUrl, normalizeYouTubeUrl, ERROR_MESSAGES } from '../validation';

describe('YouTube URL Validation', () => {
  describe('validateYouTubeUrl', () => {
    // 有效的 YouTube URL 測試
    describe('Valid URLs', () => {
      const validUrls = [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://youtube.com/watch?v=dQw4w9WgXcQ',
        'https://m.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://youtu.be/dQw4w9WgXcQ',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://www.youtube.com/v/dQw4w9WgXcQ',
      ];

      test.each(validUrls)('should validate %s as valid', (url) => {
        const result = validateYouTubeUrl(url);
        expect(result.isValid).toBe(true);
        expect(result.videoId).toBe('dQw4w9WgXcQ');
        expect(result.error).toBeUndefined();
      });
    });

    // 無效的 URL 測試
    describe('Invalid URLs', () => {
      test('should reject empty string', () => {
        const result = validateYouTubeUrl('');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe(ERROR_MESSAGES.EMPTY_URL);
      });

      test('should reject null/undefined', () => {
        const result1 = validateYouTubeUrl(null as unknown as string);
        const result2 = validateYouTubeUrl(undefined as unknown as string);
        
        expect(result1.isValid).toBe(false);
        expect(result1.error).toBe(ERROR_MESSAGES.EMPTY_URL);
        expect(result2.isValid).toBe(false);
        expect(result2.error).toBe(ERROR_MESSAGES.EMPTY_URL);
      });

      test('should reject whitespace only', () => {
        const result = validateYouTubeUrl('   ');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe(ERROR_MESSAGES.EMPTY_URL);
      });

      test('should reject invalid URL format', () => {
        const result = validateYouTubeUrl('not-a-url');
        expect(result.isValid).toBe(false);
        expect(result.error).toBe(ERROR_MESSAGES.INVALID_URL);
      });

      test('should reject non-YouTube domains', () => {
        const invalidDomains = [
          'https://vimeo.com/123456789',
          'https://dailymotion.com/video/x123456',
          'https://facebook.com/watch?v=123456789',
        ];

        invalidDomains.forEach(url => {
          const result = validateYouTubeUrl(url);
          expect(result.isValid).toBe(false);
          expect(result.error).toBe(ERROR_MESSAGES.INVALID_URL);
        });
      });

      test('should reject URLs without video ID', () => {
        const urlsWithoutVideoId = [
          'https://www.youtube.com/watch',
          'https://www.youtube.com/watch?v=',
          'https://youtu.be/',
          'https://www.youtube.com/embed/',
        ];

        urlsWithoutVideoId.forEach(url => {
          const result = validateYouTubeUrl(url);
          expect(result.isValid).toBe(false);
          expect(result.error).toBe(ERROR_MESSAGES.INVALID_URL);
        });
      });

      test('should reject invalid video ID format', () => {
        const invalidVideoIds = [
          'https://www.youtube.com/watch?v=123', // 太短
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ123', // 太長
          'https://www.youtube.com/watch?v=dQw4w9WgXc@', // 無效字符
        ];

        invalidVideoIds.forEach(url => {
          const result = validateYouTubeUrl(url);
          expect(result.isValid).toBe(false);
          expect(result.error).toBe(ERROR_MESSAGES.INVALID_URL);
        });
      });
    });

    // 播放清單 URL 測試
    describe('Playlist URLs', () => {
      test('should reject playlist URLs', () => {
        const playlistUrls = [
          'https://www.youtube.com/playlist?list=PLrAXtmRdnEQy6nuLMfO2q6HID4QcWD0hm',
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmRdnEQy6nuLMfO2q6HID4QcWD0hm',
          'https://www.youtube.com/watch_videos?video_ids=dQw4w9WgXcQ,abc123def45',
        ];

        playlistUrls.forEach(url => {
          const result = validateYouTubeUrl(url);
          expect(result.isValid).toBe(false);
          expect(result.error).toBe(ERROR_MESSAGES.PLAYLIST_NOT_SUPPORTED);
        });
      });

      test('should allow Watch Later and Favorites', () => {
        const allowedUrls = [
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=WL', // Watch Later
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=FL', // Favorites
        ];

        allowedUrls.forEach(url => {
          const result = validateYouTubeUrl(url);
          expect(result.isValid).toBe(true);
          expect(result.videoId).toBe('dQw4w9WgXcQ');
        });
      });
    });
  });

  describe('normalizeYouTubeUrl', () => {
    test('should normalize valid URLs to standard format', () => {
      const testCases = [
        {
          input: 'https://youtu.be/dQw4w9WgXcQ',
          expected: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
          input: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          expected: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
          input: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s',
          expected: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = normalizeYouTubeUrl(input);
        expect(result).toBe(expected);
      });
    });

    test('should return null for invalid URLs', () => {
      const invalidUrls = [
        '',
        'not-a-url',
        'https://vimeo.com/123456789',
        'https://www.youtube.com/playlist?list=PLrAXtmRdnEQy6nuLMfO2q6HID4QcWD0hm',
      ];

      invalidUrls.forEach(url => {
        const result = normalizeYouTubeUrl(url);
        expect(result).toBeNull();
      });
    });
  });
});