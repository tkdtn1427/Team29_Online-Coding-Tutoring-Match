import styled from '@emotion/styled';
import ReviewForm from './ReviewForm.jsx';
import ReviewBox from './ReviewBox.jsx';

function ReviewContainer() {
  return (
    <Container>
      <ReviewForm />
      <ReviewBox />
    </Container>
  );
}

const Container = styled.div`
  align-self: center;

  width: 800px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ReviewContainer;
