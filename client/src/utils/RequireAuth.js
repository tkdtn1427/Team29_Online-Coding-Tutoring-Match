import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

// option true = 로그인시에만 가능
// option false = 로그아웃시에만 가능
// option null = 둘다 가능
const RequireAuth = ({ children, option, setModal }) => {
  const { loginState } = useSelector(state => state.loginState);
  const location = useLocation();

  // 로그인시 비로그인시 둘다 접근 가능
  if (option === null || option === false) {
    return children;
  }

  // 로그인이 필요한 경우
  if (option === true) {
    if (loginState) {
      return children;
    }
    setTimeout(() => {
      setModal(true);
    }, 1000);
    return <Navigate to={'/'} state={location}></Navigate>;
  }

  return children;
};

export default RequireAuth;
