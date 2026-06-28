import * as React from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={cn('relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg', className)}>
        {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}
