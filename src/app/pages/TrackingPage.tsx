import { useState } from 'react';
import { Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [foundItem, setFoundItem] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);

    // Mock search - in real app would query backend
    const mockResult = {
      trackingId: trackingId || 'COMP-2026-001234',
      type: trackingId.startsWith('LIC') ? 'License Application' : 'Complaint',
      status: 'In Progress',
      submittedDate: '2026-03-20',
      lastUpdated: '2026-03-21',
      timeline: [
        { status: 'Submitted', date: '2026-03-20 09:30', completed: true },
        { status: 'Under Review', date: '2026-03-20 14:15', completed: true },
        { status: 'In Progress', date: '2026-03-21 10:00', completed: true },
        { status: 'Resolved', date: 'Pending', completed: false },
      ],
      details: {
        category: 'Network Quality',
        provider: 'BTC Mobile',
        description: 'Experiencing frequent network disconnections in Gaborone West area.',
      },
    };

    setFoundItem(mockResult);
  };

  const getStatusIcon = (completed: boolean, isLast: boolean) => {
    if (completed) {
      return <CheckCircle size={20} className="text-green-600" />;
    } else if (!completed && !isLast) {
      return <Clock size={20} className="text-gray-400" />;
    } else {
      return <Clock size={20} className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Track Your Submission</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Enter your tracking ID to check the status of your complaint or license application
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter tracking ID (e.g., COMP-2026-001234)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FDB913] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#FDB913] text-white rounded-md font-medium hover:bg-[#E5A70F] transition-colors whitespace-nowrap"
            >
              Track Status
            </button>
          </form>

          <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <p>
              Your tracking ID was provided when you submitted your complaint or application. 
              Check your email confirmation for the tracking number.
            </p>
          </div>
        </div>

        {/* Results */}
        {searchPerformed && foundItem && (
          <div className="space-y-6">
            {/* Overview Card */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tracking ID</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#FDB913] break-all">{foundItem.trackingId}</p>
                </div>
                <StatusBadge status={foundItem.status} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Type</p>
                  <p className="font-medium text-gray-900">{foundItem.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Submitted</p>
                  <p className="font-medium text-gray-900">
                    {new Date(foundItem.submittedDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                  <p className="font-medium text-gray-900">
                    {new Date(foundItem.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Status Timeline</h2>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[9px] top-6 bottom-6 w-0.5 bg-gray-200" />

                <div className="space-y-6">
                  {foundItem.timeline.map((item: any, index: number) => (
                    <div key={index} className="relative flex gap-4">
                      {/* Icon */}
                      <div className="relative z-10 flex-shrink-0">
                        {getStatusIcon(item.completed, index === foundItem.timeline.length - 1)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <h3
                              className={`font-medium ${
                                item.completed ? 'text-gray-900' : 'text-gray-500'
                              }`}
                            >
                              {item.status}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{item.date}</p>
                          </div>
                          {item.completed && (
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded self-start">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Details</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Category</p>
                  <p className="font-medium text-gray-900">{foundItem.details.category}</p>
                </div>

                {foundItem.details.provider && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Service Provider</p>
                    <p className="font-medium text-gray-900">{foundItem.details.provider}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 mb-1">Description</p>
                  <p className="text-gray-900 leading-relaxed">{foundItem.details.description}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
              <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                If you have questions about your submission or need to provide additional information, 
                please contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-2 bg-[#0095DA] text-white rounded-md font-medium hover:bg-[#0077B3] transition-colors"
                >
                  Contact Support
                </a>
                <button
                  onClick={() => {
                    setSearchPerformed(false);
                    setFoundItem(null);
                    setTrackingId('');
                  }}
                  className="inline-flex items-center justify-center px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Track Another
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {searchPerformed && !foundItem && (
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any submission with the tracking ID you entered. 
              Please check the ID and try again.
            </p>
            <button
              onClick={() => {
                setSearchPerformed(false);
                setTrackingId('');
              }}
              className="px-6 py-2 bg-[#FDB913] text-white rounded-md font-medium hover:bg-[#E5A70F] transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Example IDs */}
        {!searchPerformed && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="font-medium text-gray-900 mb-3">Example Tracking IDs</h3>
            <p className="text-sm text-gray-600 mb-4">
              Try one of these sample tracking IDs to see how the system works:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTrackingId('COMP-2026-001234')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
              >
                COMP-2026-001234
              </button>
              <button
                onClick={() => setTrackingId('COMP-2026-001235')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
              >
                COMP-2026-001235
              </button>
              <button
                onClick={() => setTrackingId('LIC-2026-000456')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
              >
                LIC-2026-000456
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}