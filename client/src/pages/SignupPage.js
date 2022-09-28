import styled from '@emotion/styled';
import Signupform from '../components/form/Signupform.jsx';

function SignupPage() {
  return (
    <Container>
      <Signupform />
    </Container>
  );
}

const Container = styled.div`
  padding: 50px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default SignupPage;
