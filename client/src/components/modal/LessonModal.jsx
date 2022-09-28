import Modal from './Modal.jsx';
import Lessonform from '../form/Lessonform.jsx';

function LessonModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <Lessonform />
    </Modal>
  );
}

export default LessonModal;
