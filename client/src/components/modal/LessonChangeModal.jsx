import Modal from './Modal.jsx';
import LessonChangeForm from '../form/lessonRegForm/LessonChangeForm.jsx';

function LessonChangeModal({ onClose, lesson }) {
  return (
    <Modal onClose={onClose}>
      <LessonChangeForm lesson={lesson} />
    </Modal>
  );
}

export default LessonChangeModal;
