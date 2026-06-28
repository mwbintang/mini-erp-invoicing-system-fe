import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface InvoiceActionsDropdownProps {
  invoiceId: string;
  onDeleteClick: () => void;
}

export function InvoiceActionsDropdown({ invoiceId, onDeleteClick }: InvoiceActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleScroll() {
      if (isOpen) setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { capture: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: `${rect.bottom + 8}px`,
        left: `${rect.right - 192}px`, // 192px is w-48
        width: '192px',
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button ref={buttonRef} variant="ghost" size="icon" onClick={toggleDropdown}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div
          ref={dropdownRef}
          style={dropdownStyle}
          className="rounded-xl bg-white shadow-lg z-50 border border-gray-100 overflow-hidden"
        >
          <div className="py-1" role="menu">
            <button
              onClick={() => router.push(`/invoices/${invoiceId}`)}
              className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              <Eye className="mr-3 h-4 w-4" /> View Details
            </button>
            <button
              onClick={() => router.push(`/invoices/${invoiceId}/edit`)}
              className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              <Edit className="mr-3 h-4 w-4" /> Edit
            </button>
            <button
              onClick={() => { setIsOpen(false); onDeleteClick(); }}
              className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash className="mr-3 h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
