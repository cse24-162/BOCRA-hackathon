import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={32} className="text-gray-400" />
        </div>
        
        <h1 className="text-6xl font-bold text-[#0095DA] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full bg-[#0095DA] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0077B3] transition-colors"
          >
            Return to Home
          </Link>
          <Link
            to="/dashboard"
            className="block w-full bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}