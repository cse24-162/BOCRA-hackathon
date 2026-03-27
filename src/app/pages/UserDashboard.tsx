import { useState, useEffect } from 'react';
import { Bell, FileText, MessageSquare, Clock, ExternalLink } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { getUserComplaints, getUserLicenses } from '../utils/api';
import { Complaint, LicenseApplication } from '../types';
import { Link } from 'react-router';

export function UserDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [licenses, setLicenses] = useState<LicenseApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // For demo purposes, using a static email. In production, get this from auth
  const userEmail = 'user@example.com';

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError('');
      try {
        const [complaintsData, licensesData] = await Promise.all([
          getUserComplaints(userEmail),
          getUserLicenses(userEmail),
        ]);
        setComplaints(complaintsData);
        setLicenses(licensesData);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [userEmail]);

  const recentComplaints = complaints.slice(0, 3);
  const recentApplications = licenses.slice(0, 2);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Track and manage your submissions</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active Complaints</p>
                <p className="text-3xl font-bold text-[#E6007E]">{complaints.filter(c => c.status !== 'Resolved').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <MessageSquare size={24} className="text-[#E6007E]" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/complaints" className="text-sm text-[#E6007E] hover:underline flex items-center gap-1">
                Submit new complaint
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">License Applications</p>
                <p className="text-3xl font-bold text-[#00A651]">{licenses.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <FileText size={24} className="text-[#00A651]" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/licensing" className="text-sm text-[#00A651] hover:underline flex items-center gap-1">
                New application
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Notifications</p>
                <p className="text-3xl font-bold text-[#FDB913]">3</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Bell size={24} className="text-[#FDB913]" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-500">2 unread messages</span>
            </div>
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">My Complaints</h2>
              <Link to="/tracking" className="text-sm text-[#E6007E] hover:underline">
                View all
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to="/tracking" className="text-sm font-medium text-[#003366] hover:underline">
                        {complaint.trackingId}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {complaint.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {complaint.serviceProvider}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent License Applications */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">License Applications</h2>
              <Link to="/licensing" className="text-sm text-[#00A651] hover:underline">
                New application
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    License Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to="/tracking" className="text-sm font-medium text-[#003366] hover:underline">
                        {app.trackingId}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.licenseType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Clock size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Recent Updates</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Your complaint COMP-2026-001234 status has been updated to "In Progress"</li>
                <li>License application LIC-2026-000456 requires additional documentation</li>
                <li>New regulatory guidelines published - Click to view</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}