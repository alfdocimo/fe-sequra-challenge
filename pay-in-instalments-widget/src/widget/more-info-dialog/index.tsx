import { Modal } from "@/shared/components/modal";

export function MoreInfoDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>Content here</div>
    </Modal>
  );
}
