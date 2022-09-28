// 로그인 상태에 따라 다른 네브바(삼항연산자)
import styled from '@emotion/styled';
import { useState } from 'react';
import { TextMode, IconMode } from '../buttons/ColorMode.jsx';
import LowercaseLogo from '../logos/LowercaseLogo.jsx';
import Profile from '../../assets/svg/Profile.jsx';
import Alert from '../../assets/svg/Alert.jsx';
import LoginModal from '../modal/LoginModal.jsx';

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // 리덕스상태로 변경 예정

  const openLoginModal = () => {
    setIsOpen(!isOpen);
  };
  console.log(isOpen);
  return (
    <Container>
      <LowercaseLogo />
      {isLogin ? (
        <ButtonWrapper>
          <IconMode mode="ORANGE" text={<Alert />} />
          <IconMode mode="GREEN" text={<Profile />} />
          <TextMode mode="GREEN" text="logout" />
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <TextMode
            mode="ORANGE"
            text="login"
            onClick={() => {
              openLoginModal();
            }}
          />
          <TextMode mode="GREEN" text="signup" />
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
