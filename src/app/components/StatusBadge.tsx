interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'under review':
        return 'bg-blue-100 text-blue-700';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'resolved':
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}
