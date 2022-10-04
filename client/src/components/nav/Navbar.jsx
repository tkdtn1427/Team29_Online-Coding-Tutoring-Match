// 로그인 상태에 따라 다른 네브바(삼항연산자)
import styled from '@emotion/styled';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextMode, IconMode } from '../buttons/ColorMode.jsx';
import LowercaseLogo from '../logos/LowercaseLogo.jsx';
import Profile from '../../assets/svg/Profile.jsx';
import Alert from '../../assets/svg/Alert.jsx';
import LoginModal from '../modal/LoginModal.jsx';
import { SignUp, Login } from '../../utils/apis/AuthAPI';
import LoginReducer from '../../redux/login/LoginReducer';
import { removeUser } from '../../utils/Localstorage';

function Navbar() {
  const { loginState } = useSelector(state => state.loginState);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // 리덕스상태로 변경 예정

  const openLoginModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <LowercaseLogo />
      {loginState ? (
        <ButtonWrapper>
          <IconMode mode="ORANGE" text={<Alert />} />
          <IconMode mode="GREEN" text={<Profile />} />
          <TextMode
            mode="GREEN"
            text="logout"
            onClick={() => {
              removeUser();
              dispatch(LoginReducer.actions.logOut());
            }}
          />
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <TextMode
            mode="ORANGE"
            text="login"
            onClick={async () => {
              const result = await Login({
                loginForm: { email: 'euisuk95@gmail.com', password: '12345678' },
                role: 'teacher',
              });
              if (result) {
                dispatch(LoginReducer.actions.logIn());
              }
            }}
          />
          <TextMode
            mode="GREEN"
            text="signup"
            onClick={() => {
              SignUp();
            }}
          />
          {isOpen && (
            <LoginModal
              onClose={() => {
                openLoginModal();
              }}
            />
          )}
        </ButtonWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 0px 10px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  border-bottom: 1px solid var(--blk);
  background-color: white;
  width: 100%;
  height: 60px;
  z-index: 10px;
  align-items: center;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  margin-right: 20px;
  height: 25px;
  display: flex;
  gap: 10px;
`;
export default Navbar;
