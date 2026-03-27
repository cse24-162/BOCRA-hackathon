import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Filter, RefreshCw, Download, AlertCircle, TrendingUp, Users, FileCheck } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { getAllComplaints, getAllLicenses, updateComplaintStatus, updateLicenseStatus } from '../utils/api';
import { Complaint, LicenseApplication } from '../types';

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState<'complaints' | 'licenses'>('complaints');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [licenses, setLicenses] = useState<LicenseApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [complaintsData, licensesData] = await Promise.all([
        getAllComplaints(),
        getAllLicenses(),
      ]);
      setComplaints(complaintsData);
      setLicenses(licensesData);
    } catch (err) {
      console.error('Error loading admin dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusUpdate = async (id: string, status: string, type: 'complaint' | 'license') => {
    try {
      if (type === 'complaint') {
        await updateComplaintStatus(id, status);
      } else {
        await updateLicenseStatus(id, status);
      }
      await loadData(); // Reload data after update
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status. Please try again.');
    }
  };

  // Chart data
  const complaintsData = [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 38 },
    { month: 'Apr', count: 65 },
    { month: 'May', count: 48 },
    { month: 'Jun', count: 72 },
  ];

  const categoryData = [
    { name: 'Network Quality', value: 35, color: '#003366' },
    { name: 'Billing', value: 25, color: '#0066cc' },
    { name: 'Service', value: 20, color: '#3399ff' },
    { name: 'Other', value: 20, color: '#99ccff' },
  ];

  const resolutionData = [
    { week: 'Week 1', avgDays: 2.1 },
    { week: 'Week 2', avgDays: 2.8 },
    { week: 'Week 3', avgDays: 2.3 },
    { week: 'Week 4', avgDays: 1.9 },
  ];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || complaint.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const filteredApplications = licenses.filter(app => {
    const matchesSearch = app.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button 
              onClick={loadData}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh Data</span>
              <span className="sm:hidden">Refresh</span>
            </button>
          </div>
          <p className="text-sm sm:text-base text-gray-600">Monitor and manage regulatory activities</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Complaints</p>
                <p className="text-3xl font-bold text-[#003366]">{complaints.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <AlertCircle size={24} className="text-[#003366]" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-green-600 font-medium">12%</span>
              <span className="text-gray-600">vs last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">48</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <FileCheck size={24} className="text-yellow-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              32 complaints, 16 licenses
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Avg Resolution</p>
                <p className="text-3xl font-bold text-green-600">2.3d</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Target: &lt; 3 days
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active Users</p>
                <p className="text-3xl font-bold text-purple-600">1,247</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users size={24} className="text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Licensed operators
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Complaints Trend */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Complaints Trend (6 Months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={complaintsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#003366" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Complaints by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Resolution Time */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 lg:col-span-2">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Average Resolution Time (Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={resolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgDays" stroke="#003366" strokeWidth={2} name="Avg Days" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Queue Management */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">Queue Management</h2>
              
              {/* Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('complaints')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'complaints'
                      ? 'bg-[#E6007E] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Complaints
                </button>
                <button
                  onClick={() => setActiveTab('licenses')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'licenses'
                      ? 'bg-[#00A651] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  License Applications ({licenses.length})
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 mt-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by tracking ID or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="submitted">Submitted</option>
                  <option value="under review">Under Review</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Filter size={16} />
                  <span className="hidden sm:inline">More</span>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-[#003366] text-white rounded-md text-sm font-medium hover:bg-[#004d99]">
                  <Download size={16} />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Complaints Table */}
          {activeTab === 'complaints' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tracking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Complainant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredComplaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-[#003366]">
                          {complaint.trackingId}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{complaint.name}</div>
                          <div className="text-sm text-gray-500">{complaint.email}</div>
                        </div>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-[#003366] hover:underline font-medium">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* License Applications Table */}
          {activeTab === 'licenses' && (
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
                      Contact
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-[#003366]">
                          {app.trackingId}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {app.companyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{app.contactPerson}</div>
                          <div className="text-sm text-gray-500">{app.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {app.licenseType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-[#003366] hover:underline font-medium">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}