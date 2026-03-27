import { projectId, publicAnonKey } from '/utils/supabase/info';
import { Complaint, LicenseApplication, Statistic } from '../types';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-7cad94aa`;

// Helper function to make API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(`API Error (${endpoint}):`, data);
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

// ============ COMPLAINTS API ============

export async function submitComplaint(complaintData: {
  name: string;
  email: string;
  phone: string;
  serviceProvider: string;
  category: string;
  description: string;
}): Promise<{ trackingId: string; complaint: Complaint }> {
  const result = await apiRequest('/complaints', {
    method: 'POST',
    body: JSON.stringify(complaintData),
  });
  return result;
}

export async function getComplaint(id: string): Promise<Complaint> {
  const result = await apiRequest(`/complaints/${id}`);
  return result.complaint;
}

export async function getUserComplaints(email: string): Promise<Complaint[]> {
  const result = await apiRequest(`/user/complaints?email=${encodeURIComponent(email)}`);
  return result.complaints;
}

export async function getAllComplaints(): Promise<Complaint[]> {
  const result = await apiRequest('/admin/complaints');
  return result.complaints;
}

export async function updateComplaintStatus(id: string, status: string): Promise<Complaint> {
  const result = await apiRequest(`/admin/complaints/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return result.complaint;
}

// ============ LICENSE API ============

export async function submitLicense(licenseData: {
  companyName: string;
  registrationNumber?: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string;
  licenseType: string;
}): Promise<{ trackingId: string; license: LicenseApplication }> {
  const result = await apiRequest('/licenses', {
    method: 'POST',
    body: JSON.stringify(licenseData),
  });
  return result;
}

export async function getLicense(id: string): Promise<LicenseApplication> {
  const result = await apiRequest(`/licenses/${id}`);
  return result.license;
}

export async function getUserLicenses(email: string): Promise<LicenseApplication[]> {
  const result = await apiRequest(`/user/licenses?email=${encodeURIComponent(email)}`);
  return result.licenses;
}

export async function getAllLicenses(): Promise<LicenseApplication[]> {
  const result = await apiRequest('/admin/licenses');
  return result.licenses;
}

export async function updateLicenseStatus(id: string, status: string): Promise<LicenseApplication> {
  const result = await apiRequest(`/admin/licenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return result.license;
}

// ============ TRACKING API ============

export async function trackItem(trackingId: string): Promise<any> {
  const result = await apiRequest(`/tracking/${trackingId}`);
  return result.item;
}

// ============ STATISTICS API ============

export async function getStatistics(): Promise<Statistic[]> {
  const result = await apiRequest('/statistics');
  return result.statistics;
}
