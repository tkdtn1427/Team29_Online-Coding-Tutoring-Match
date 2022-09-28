import Modal from './Modal.jsx';
import ProfileEditinput from '../form/ProfileEditform.jsx';

function PorfileEditModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <ProfileEditinput onClose={onClose} />
    </Modal>
  );
}
export default PorfileEditModal;
