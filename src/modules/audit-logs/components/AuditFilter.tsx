import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AuditFilterProps {
  search: string;
  action: string;
  entityType: string;
  onFilterChange: (filters: { search: string; action: string; entityType: string }) => void;
}

export function AuditFilter({ search, action, entityType, onFilterChange }: AuditFilterProps) {
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        onFilterChange({ search: localSearch, action, entityType });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, search, action, entityType, onFilterChange]);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <select
        className="w-full md:w-48 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={action}
        onChange={(e) => onFilterChange({ search: localSearch, action: e.target.value, entityType })}
      >
        <option value="">All Actions</option>
        <option value="CREATE">Create</option>
        <option value="UPDATE">Update</option>
        <option value="DELETE">Delete</option>
        <option value="STATUS_CHANGE">Status Change</option>
      </select>
      <select
        className="w-full md:w-48 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={entityType}
        onChange={(e) => onFilterChange({ search: localSearch, action, entityType: e.target.value })}
      >
        <option value="">All Entities</option>
        <option value="Customer">Customer</option>
        <option value="Invoice">Invoice</option>
      </select>
    </div>
  );
}
