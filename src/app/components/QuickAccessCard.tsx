import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  color: string;
}

export function QuickAccessCard({ title, description, icon: Icon, link, color }: QuickAccessCardProps) {
  return (
    <Link
      to={link}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 group"
    >
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
