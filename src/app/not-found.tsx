import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">頁面不存在</h2>
          <p className="text-gray-600">
            很抱歉，您要尋找的頁面不存在或已被移除。
          </p>
        </div>
        
        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full" variant="primary">
              返回首頁
            </Button>
          </Link>
          
          <Button
            onClick={() => window.history.back()}
            className="w-full"
            variant="secondary"
          >
            返回上一頁
          </Button>
        </div>
      </div>
    </div>
  );
}