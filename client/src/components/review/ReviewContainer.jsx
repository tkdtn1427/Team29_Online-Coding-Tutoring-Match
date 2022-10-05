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

  border: 1px solid red;
  width: 1000px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ReviewContainer;
