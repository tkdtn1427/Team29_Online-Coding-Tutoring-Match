import styled from '@emotion/styled';
import carouselImg1 from '../../assets/img/carouselImg1.png';

function Carousel1() {
  return (
    <Container>
      <img src={carouselImg1} className="img" alt="carouselimg" />
      <Intro>
        {' '}
        <div>코딩 과외를 받고 싶다면</div>
        <div>IGUWANA</div>
        <div>나와 맞는 선생님과 함께 공부해보세요!</div>
      </Intro>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  width: 100%;
  height: 430px;
  background-color: var(--grn);
  .img {
    margin: 130px 30px 0px 0px;
    width: 180px;
    height: 230px;
  }
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 180px;
  div:first-child {
    font-family: var(--main);
    font-size: var(--s);
    margin: 0px 0px 10px 0px;
  }
  div:nth-child(2) {
    font-family: var(--main);
    font-size: 40px;
  }
  div:nth-child(3) {
    font-family: var(--main);
    font-size: var(--reg);
    margin: 10px 0px 0px 0px;
  }
`;

export default Carousel1;
