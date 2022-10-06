import Modal from './Modal.jsx';
import ReviewChangeForm from '../review/ReviewChangeForm.jsx';

function ReviewChangeModal({ onClose, contentId }) {
  return (
    <Modal onClose={onClose}>
      <ReviewChangeForm onClose={onClose} contentId={contentId} />
    </Modal>
  );
}
export default ReviewChangeModal;
