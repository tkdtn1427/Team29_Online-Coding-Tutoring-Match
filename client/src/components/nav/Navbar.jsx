// 로그인 상태에 따라 다른 네브바(삼항연산자)
import styled from '@emotion/styled';
import { useState } from 'react';
import { TextMode, IconMode } from '../buttons/ColorMode.jsx';
import LowercaseLogo from '../logos/LowercaseLogo.jsx';
import Profile from '../../assets/svg/Profile.jsx';
import Alert from '../../assets/svg/Alert.jsx';

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  // 리덕스상태로 변경 예정

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
          <TextMode mode="ORANGE" text="login" />
          <TextMode mode="GREEN" text="signup" />
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
