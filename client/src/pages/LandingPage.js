import styled from '@emotion/styled';
import UppercaseLogo from '../components/logos/UppercaseLogo.jsx';
import { TextMode } from '../components/buttons/ColorMode.jsx';

function LandingPage() {
  return (
    <Container>
      <UppercaseLogo />
      <TextMode mode="WHITE" text="과외 하러 가기  >" padding="15px 50px" ftsize="var(--l)" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  border: 1px solid red;
  width: 100%;
`;

export default LandingPage;
