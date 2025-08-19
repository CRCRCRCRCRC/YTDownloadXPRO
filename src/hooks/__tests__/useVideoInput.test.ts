import { renderHook, act } from '@testing-library/react';
import { useVideoInput } from '../useVideoInput';

// Mock the validation module
jest.mock('@/lib/validation', () => ({
  validateYouTubeUrl: jest.fn(),
}));

import { validateYouTubeUrl } from '@/lib/validation';

const mockValidateYouTubeUrl = validateYouTubeUrl as jest.MockedFunction<typeof validateYouTubeUrl>;

describe('useVideoInput Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useVideoInput());
    
    expect(result.current.url).toBe('');
    expect(result.current.isValid).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('updates URL and clears error', () => {
    const { result } = renderHook(() => useVideoInput());
    
    act(() => {
      result.current.setUrl('https://youtube.com/watch?v=test');
    });
    
    expect(result.current.url).toBe('https://youtube.com/watch?v=test');
    expect(result.current.error).toBeNull();
    expect(result.current.isValid).toBe(false);
  });

  it('validates URL correctly', () => {
    mockValidateYouTubeUrl.mockReturnValue({
      isValid: true,
      videoId: 'test123',
    });

    const { result } = renderHook(() => useVideoInput());
    
    act(() => {
      result.current.setUrl('https://youtube.com/watch?v=test123');
    });

    act(() => {
      const validation = result.current.validateUrl();
      expect(validation.isValid).toBe(true);
      expect(validation.videoId).toBe('test123');
    });

    expect(result.current.isValid).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('handles validation errors', () => {
    mockValidateYouTubeUrl.mockReturnValue({
      isValid: false,
      error: 'Invalid URL',
    });

    const { result } = renderHook(() => useVideoInput());
    
    act(() => {
      result.current.setUrl('invalid-url');
    });

    act(() => {
      result.current.validateUrl();
    });

    expect(result.current.isValid).toBe(false);
    expect(result.current.error).toBe('Invalid URL');
  });

  it('clears error', () => {
    const { result } = renderHook(() => useVideoInput());
    
    // Set an error first
    mockValidateYouTubeUrl.mockReturnValue({
      isValid: false,
      error: 'Test error',
    });

    act(() => {
      result.current.setUrl('invalid');
      result.current.validateUrl();
    });

    expect(result.current.error).toBe('Test error');

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('sets loading state', () => {
    const { result } = renderHook(() => useVideoInput());
    
    act(() => {
      result.current.setLoading(true);
    });
    
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });
    
    expect(result.current.isLoading).toBe(false);
  });

  it('resets to initial state', () => {
    const { result } = renderHook(() => useVideoInput());
    
    // Change some state
    act(() => {
      result.current.setUrl('test');
      result.current.setLoading(true);
    });

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.url).toBe('');
    expect(result.current.isValid).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
});