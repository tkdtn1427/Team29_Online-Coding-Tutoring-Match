import styled from '@emotion/styled';
import SignupInput from '../components/form/SignupInput.jsx';

function SignupPage() {
  return (
    <Container>
      <SignupInput />
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
