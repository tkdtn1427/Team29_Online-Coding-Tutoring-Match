import styled from '@emotion/styled';

import ReviewList from './ReviewList.jsx';
import TextArea from '../textarea/TextArea.jsx';

function ReviewContainer() {
  return (
    <Container>
      <div className="rvn">
        <span>캘린더</span>
        <span className="slt">강의 후기</span>
      </div>
      <div className="wrap">
        <TextArea />
        <ReviewList />
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 100px 0;

  display: flex;
  flex-direction: column;
  .rvn {
    align-self: center;
    width: 90%;
    border-bottom: 1px solid var(--liblk);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 20px;
    margin: 0 0 20px 0;
  }
  .slt {
    color: var(--grn);
  }
  .wrap {
    align-self: center;

    display: flex;
    flex-direction: column;
    width: 80%;
  }
`;

export default ReviewContainer;
