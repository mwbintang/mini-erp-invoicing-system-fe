import { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
}

export function SummaryCard({ title, value, icon, description }: SummaryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-gray-100">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50 transition-transform duration-500 group-hover:scale-150" />
      
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">{value}</h3>
          {description && <p className="mt-2 text-xs font-medium text-gray-400">{description}</p>}
        </div>
        
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-600 transition-colors duration-300 group-hover:bg-indigo-50 group-hover:text-indigo-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
