import { Metadata } from 'next';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: '常見問題 (FAQ)',
  description: 'YTDownloadXPRO 常見問題：下載、畫質、錯誤、授權等完整解答。',
};

export default function FAQPage() {
  return <FaqClient />;
}