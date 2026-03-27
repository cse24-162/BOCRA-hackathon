// Type definitions for BOCRA platform

export interface Complaint {
  id: string;
  trackingId: string;
  name: string;
  email: string;
  phone: string;
  serviceProvider: string;
  category: string;
  description: string;
  status: 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved' | 'Rejected';
  createdAt: string;
  updatedAt: string;
}

export interface LicenseApplication {
  id: string;
  trackingId: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  licenseType: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  currentStep: number;
  createdAt: string;
  updatedAt: string;
}

export interface Statistic {
  label: string;
  value: string;
  icon: string;
}

export interface StatusTimeline {
  status: string;
  date: string;
  completed: boolean;
}
