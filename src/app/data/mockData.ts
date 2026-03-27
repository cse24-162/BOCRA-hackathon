import { Complaint, LicenseApplication, Statistic } from '../types';

export const mockStatistics: Statistic[] = [
  { label: 'Complaints Resolved', value: '4,523', icon: 'CheckCircle' },
  { label: 'Network Coverage', value: '96.8%', icon: 'Signal' },
  { label: 'Active Licenses', value: '1,247', icon: 'FileCheck' },
  { label: 'Avg Response Time', value: '2.3 days', icon: 'Clock' },
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    trackingId: 'COMP-2026-001234',
    name: 'Thabo Modise',
    email: 'thabo.modise@email.com',
    phone: '+267 7234 5678',
    serviceProvider: 'BTC Mobile',
    category: 'Network Quality',
    description: 'Experiencing frequent network disconnections in Gaborone West area.',
    status: 'In Progress',
    createdAt: '2026-03-20T09:30:00Z',
    updatedAt: '2026-03-21T14:20:00Z',
  },
  {
    id: '2',
    trackingId: 'COMP-2026-001235',
    name: 'Keitumetse Setlhare',
    email: 'keitu.setlhare@email.com',
    phone: '+267 7345 6789',
    serviceProvider: 'Orange Botswana',
    category: 'Billing Dispute',
    description: 'Overcharged for data bundles purchased last month.',
    status: 'Under Review',
    createdAt: '2026-03-21T11:15:00Z',
    updatedAt: '2026-03-21T11:15:00Z',
  },
  {
    id: '3',
    trackingId: 'COMP-2026-001236',
    name: 'Lesego Kgomo',
    email: 'lesego.kgomo@email.com',
    phone: '+267 7456 7890',
    serviceProvider: 'Mascom',
    category: 'Service Interruption',
    description: 'Complete service outage in Francistown for over 24 hours.',
    status: 'Resolved',
    createdAt: '2026-03-19T08:00:00Z',
    updatedAt: '2026-03-20T16:30:00Z',
  },
];

export const mockLicenseApplications: LicenseApplication[] = [
  {
    id: '1',
    trackingId: 'LIC-2026-000456',
    companyName: 'Connect Botswana Ltd',
    contactPerson: 'Mpho Kgatleng',
    email: 'mpho@connectbw.com',
    phone: '+267 7567 8901',
    licenseType: 'Internet Service Provider',
    status: 'Under Review',
    currentStep: 3,
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-21T09:00:00Z',
  },
  {
    id: '2',
    trackingId: 'LIC-2026-000457',
    companyName: 'Wireless Solutions BW',
    contactPerson: 'Olebile Mothibi',
    email: 'olebile@wirelessbw.com',
    phone: '+267 7678 9012',
    licenseType: 'Telecommunications Operator',
    status: 'Approved',
    currentStep: 3,
    createdAt: '2026-03-10T14:30:00Z',
    updatedAt: '2026-03-18T11:20:00Z',
  },
];

export const serviceProviders = [
  'BTC Mobile',
  'Orange Botswana',
  'Mascom',
  'Other',
];

export const complaintCategories = [
  'Network Quality',
  'Service Interruption',
  'Billing Dispute',
  'Customer Service',
  'Fraud',
  'Contract Issues',
  'Other',
];

export const licenseTypes = [
  'Internet Service Provider',
  'Telecommunications Operator',
  'Broadcasting License',
  'Spectrum License',
  'Value Added Services',
  'Infrastructure Provider',
];
