import { CheckCircle, Signal, FileCheck, Clock } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
}

// Map icon names to components
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  CheckCircle,
  Signal,
  FileCheck,
  Clock,
};

export function StatCard({ label, value, icon }: StatCardProps) {
  const IconComponent = iconMap[icon] || CheckCircle;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-[#0095DA]">{value}</p>
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <IconComponent size={24} className="text-[#0095DA]" />
        </div>
      </div>
    </div>
  );
}