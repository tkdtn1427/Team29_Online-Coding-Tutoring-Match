import styled from '@emotion/styled';

function ReviewBox() {
  return (
    <Container>
      <span className="st">5.0</span>
      <div className="text">역시 믿고 보는 솔라쌤</div>
      <Inform>
        <div className="pic" />
        <span className="name">씌미</span>
        <span className="time">2022-09-26</span>
      </Inform>
    </Container>
  );
}

const Container = styled.div`
  margin: 20px 0 0 0;
  padding: 20px;
  border-bottom: 1px solid var(--liblk);

  display: flex;
  flex-direction: column;

  .st {
    margin: 0 0 10px 0;
  }
  .text {
    margin: 0 0 10px 0;
  }
`;
const Inform = styled.div`
  align-self: flex-end;
  display: flex;
  align-items: center;

  .pic {
    background-color: var(--grn);
    width: 30px;
    height: 30px;
    border-radius: 200px;

    margin: 0 10px 0 0;
  }
  .name {
    margin: 0 10px 0 0;
  }
`;

export default ReviewBox;
