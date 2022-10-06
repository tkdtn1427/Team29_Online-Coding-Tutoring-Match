import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import UppercaseLogo from '../components/logos/UppercaseLogo.jsx';
import { TextMode } from '../components/buttons/ColorMode.jsx';
import Introduce from '../components/landing/Introduce.jsx';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <Main>
        <Intro>코딩 과외가 필요하다면</Intro>
        <UppercaseLogo />
        <TextMode
          mode="WHITE"
          text="과외 하러 가기  >"
          padding="15px 50px"
          ftsize="var(--l)"
          onClick={() => {
            navigate('/main');
          }}
        />
      </Main>
      <Black></Black>
      <Green></Green>
      <Gray></Gray>
      <IntroBox1>
        {[0, 1, 2].map((e, i) => (
          <Introduce key={i} i={i}></Introduce>
        ))}
      </IntroBox1>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  width: 100%;
  font-family: var(--main);
  color: var(--blk);
  height: 2500px;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 200px;
`;
const Intro = styled.div`
  font-size: var(--xl);
`;

const Black = styled.div`
  position: absolute;
  left: 0;
  top: 300px;
  background-color: var(--blk);
  height: 440px;
  width: 100%;
  clip-path: polygon(50% 50%, 0 0, 0 100%);
  z-index: 0;
`;
const Green = styled.div`
  position: absolute;
  left: 0;
  top: 300px;
  background-color: var(--grn);
  height: 1100px;
  width: 100%;
  z-index: 1;
  clip-path: polygon(100% 0, 100% 50%, 0 90%, 0 40%);
`;
const Gray = styled.div`
  background-color: #e7e7e7;
  height: 1000px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 1500px;
  bottom: 500px;
  clip-path: polygon(100% 40%, 100% 90%, 0 50%, 0 0);
`;

const IntroBox1 = styled.div`
  position: absolute;
  top: 1250px;
  z-index: 5;
`;

export default LandingPage;
