import Modal from './Modal.jsx';
import ReviewChangeForm from '../review/ReviewChangeForm.jsx';

function ReviewChangeModal({ onClose, contentId, onChangeStatus }) {
  return (
    <Modal onClose={onClose}>
      <ReviewChangeForm onClose={onClose} contentId={contentId} onChangeStatus={onChangeStatus} />
    </Modal>
  );
}
export default ReviewChangeModal;
