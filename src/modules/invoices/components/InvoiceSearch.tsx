import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';

interface InvoiceSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function InvoiceSearch({ value, onChange }: InvoiceSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Search invoices..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 rounded-xl"
      />
    </div>
  );
}
