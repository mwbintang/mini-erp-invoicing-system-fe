import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface CustomerActionsDropdownProps {
  customerId: string;
  onDeleteClick: () => void;
}

export function CustomerActionsDropdown({ customerId, onDeleteClick }: CustomerActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu">
            <button
              onClick={() => router.push(`/customers/${customerId}`)}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Eye className="mr-2 h-4 w-4" /> View Details
            </button>
            <button
              onClick={() => router.push(`/customers/${customerId}/edit`)}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Edit className="mr-2 h-4 w-4" /> Edit
            </button>
            <button
              onClick={() => { setIsOpen(false); onDeleteClick(); }}
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
