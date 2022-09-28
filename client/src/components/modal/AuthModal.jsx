import Authform from '../form/Authform.jsx';
import Modal from './Modal.jsx';

function AuthModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <Authform onClose={onClose} />
    </Modal>
  );
}

export default AuthModal;
