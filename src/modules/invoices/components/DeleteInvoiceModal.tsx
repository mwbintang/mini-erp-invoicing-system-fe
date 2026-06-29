import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface DeleteInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  invoiceNumber?: string;
}

export function DeleteInvoiceModal({ isOpen, onClose, onConfirm, isDeleting, invoiceNumber }: DeleteInvoiceModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Invoice">
      <div className="py-4">
        <p className="text-gray-600">
          Are you sure you want to delete invoice <strong>{invoiceNumber}</strong>? This action cannot be undone.
        </p>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
}
