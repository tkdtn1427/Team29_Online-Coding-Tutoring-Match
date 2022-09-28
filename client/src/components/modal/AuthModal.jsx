import AuthInput from '../form/Authform.jsx';
import Modal from './Modal.jsx';

function AuthModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <AuthInput onClose={onClose} />
    </Modal>
  );
}

export default AuthModal;
