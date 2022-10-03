import Modal from './Modal.jsx';
import Profileform from '../form/ProfileEditform.jsx';

function PorfileEditModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <Profileform onClose={onClose} />
    </Modal>
  );
}
export default PorfileEditModal;
