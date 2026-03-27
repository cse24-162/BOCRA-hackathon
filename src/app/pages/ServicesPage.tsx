import {
  FileCheck,
  MessageSquare,
  BarChart3,
  Shield,
  Radio,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router';
import heroImg from '../assets/image.jpg';

export function ServicesPage() {
  const services = [
    {
      title: 'Licensing Services',
      icon: FileCheck,
      description:
        'Apply for and manage telecommunications, broadcasting, and spectrum licenses.',
      features: [
        'Online application submission',
        'Real-time status tracking',
        'Digital document management',
        'Automated renewal reminders',
      ],
      link: '/licensing',
    },
    {
      title: 'Complaint Resolution',
      icon: MessageSquare,
      description:
        'Submit complaints about service providers and track resolution progress.',
      features: [
        '24/7 complaint submission',
        'Transparent resolution timeline',
        'Automated status updates',
        'Direct communication with staff',
      ],
      link: '/complaints',
    },
    {
      title: 'Quality of Service Monitoring',
      icon: BarChart3,
      description:
        'Access real-time data on network performance and service quality metrics.',
      features: [
        'Coverage maps and analytics',
        'Network performance reports',
        'Service quality benchmarks',
        'Comparative provider analysis',
      ],
      link: '/dashboard',
    },
    {
      title: 'Regulatory Compliance',
      icon: Shield,
      description:
        'Stay informed about regulatory requirements and compliance standards.',
      features: [
        'Regulatory guidelines',
        'Compliance checklists',
        'Industry standards',
        'Legal framework documents',
      ],
      link: '/compliance',
    },
    {
      title: 'Spectrum Management',
      icon: Radio,
      description:
        'Apply for spectrum licenses and access frequency allocation information.',
      features: [
        'Spectrum availability checker',
        'Frequency allocation database',
        'Interference reporting',
        'Technical coordination',
      ],
      link: '/licensing',
    },
    {
      title: 'Device Registration',
      icon: Smartphone,
      description:
        'Register and verify telecommunications devices for compliance.',
      features: [
        'Device type approval',
        'IMEI registration',
        'Compliance verification',
        'Stolen device reporting',
      ],
      link: '/Deviceregistration',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5faff] to-white">

      {/* HERO */}
      <section
        className="relative h-[520px] flex items-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/85 via-[#0077B3]/70 to-[#0095DA]/50" />

        <div className="relative max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Regulatory Services
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
            Comprehensive digital services for telecommunications and broadcasting regulation in Botswana
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-6">

          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-md p-6 hover:shadow-lg transition"
            >
              {/* Top */}
              <div className="flex items-start gap-4">
                <div className="bg-[#0095DA] p-3 rounded-md">
                  <service.icon size={26} className="text-white" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mt-4">
                {service.features.map((f, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-5">
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-[#0077B3] font-medium hover:text-[#0095DA]"
                >
                  Learn more
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
<section className="relative w-full overflow-hidden">
  {/* Background image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${heroImg})` }}
  />

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 via-[#0077B3]/80 to-[#003366]/90" />

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 py-16 text-white text-center">
    <h2 className="text-3xl font-bold mb-3">
      Need Assistance?
    </h2>

    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
      Our support team is available to help you navigate regulatory requirements and platform features
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        to="/contact"
        className="bg-white text-[#003366] px-6 py-3 font-medium hover:bg-gray-100"
      >
        Contact Support
      </Link>

      <Link
        to="/services"
        className="border border-white px-6 py-3 font-medium hover:bg-white hover:text-[#003366]"
      >
        View All Services
      </Link>
    </div>
  </div>
</section>
    </div>
  );
}