import { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyTableStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyTableState({ icon: Icon, title, description, actionLabel, onAction }: EmptyTableStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 p-12 text-center bg-gray-50/50 my-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50/50 mb-6">
        <Icon className="h-10 w-10 text-indigo-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="px-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
