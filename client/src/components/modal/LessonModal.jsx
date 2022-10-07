import Modal from './Modal.jsx';
import Lessonform from '../form/lessonRegForm/LessonRegForm.jsx';

function LessonModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <Lessonform onClose={onClose} />
    </Modal>
  );
}

export default LessonModal;
