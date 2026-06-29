import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface DeleteCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  customerName?: string;
}

export function DeleteCustomerModal({ isOpen, onClose, onConfirm, isDeleting, customerName }: DeleteCustomerModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Customer">
      <div className="py-4">
        <p className="text-gray-600">
          Are you sure you want to delete <strong>{customerName}</strong>? This action cannot be undone.
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
