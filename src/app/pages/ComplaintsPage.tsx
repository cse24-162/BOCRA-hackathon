import { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { submitComplaint } from '../utils/api';

// Static data that doesn't need backend
const serviceProviders = [
  'BTC Mobile',
  'Orange Botswana',
  'Mascom',
  'Other',
];

const complaintCategories = [
  'Network Quality',
  'Service Interruption',
  'Billing Dispute',
  'Customer Service',
  'Fraud',
  'Contract Issues',
  'Other',
];

export function ComplaintsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceProvider: '',
    category: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await submitComplaint(formData);
      setTrackingId(result.trackingId);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting complaint:', err);
      setError('Failed to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Complaint Submitted Successfully</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Your complaint has been received and will be reviewed by our team.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Tracking ID</p>
              <p className="text-xl sm:text-2xl font-bold text-[#0095DA] mb-2 break-all">{trackingId}</p>
              <p className="text-xs sm:text-sm text-gray-600">
                Please save this ID to track your complaint status
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <a
                href="/tracking"
                className="block w-full bg-[#0095DA] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0077B3] transition-colors"
              >
                Track Complaint Status
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    serviceProvider: '',
                    category: '',
                    description: '',
                  });
                }}
                className="block w-full bg-white text-[#0095DA] border border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Submit Another Complaint
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Submit a Complaint</h1>
          <p className="text-sm sm:text-base text-gray-600">
            File a complaint about telecommunications or broadcasting services. We will review and respond within 5 business days.
          </p>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex gap-3">
          <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-medium mb-1">Before submitting a complaint:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Ensure you have contacted your service provider first</li>
              <li>Gather relevant documentation (bills, contracts, screenshots)</li>
              <li>Provide detailed information to help us resolve your issue</li>
            </ul>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-700">
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Complaint Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Complaint Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0095DA] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0095DA] focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0095DA] focus:border-transparent"
                placeholder="+267 7XXX XXXX"
              />
            </div>

            <div>
              <label htmlFor="serviceProvider" className="block text-sm font-medium text-gray-700 mb-2">
                Service Provider *
              </label>
              <select
                id="serviceProvider"
                name="serviceProvider"
                required
                value={formData.serviceProvider}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0095DA] focus:border-transparent"
              >
                <option value="">Select provider</option>
                {serviceProviders.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Complaint Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0095DA] focus:border-transparent"
            >
              <option value="">Select category</option>
              {complaintCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Complaint Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0095DA] focus:border-transparent resize-none"
              placeholder="Provide detailed information about your complaint, including dates, locations, and any relevant reference numbers..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#0095DA] text-white px-6 py-3 rounded-md font-medium hover:bg-[#0077B3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}