import Modal from './Modal.jsx';
import LessonInput from '../input/LessonInput.jsx';

function LessonModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <LessonInput />
    </Modal>
  );
}

export default LessonModal;
