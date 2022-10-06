import styled from '@emotion/styled';
import carouselImg1 from '../../assets/img/carouselImg1.png';

function Carousel3() {
  return (
    <Container>
      <img src={carouselImg1} className="img" alt="carouselimg" />
      <Intro>
        {' '}
        <div className="firstcontent">코딩 과외를 받고 싶다면</div>
        <div className="secondcontent">IGUWANA</div>
        <div className="thirdcontent">나와 맞는 선생님과 함께 공부해보세요!</div>
      </Intro>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 350px;
  background-color: var(--blk);
  img {
    margin: 120px 30px 0px 0px;
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
  font-family: var(--main);
  color: white;
  .firstcontent {
    font-size: var(--s);
    margin: 0px 0px 10px 0px;
  }
  .secondcontent {
    font-size: 40px;
  }
  .thirdcontent {
    font-size: var(--reg);
    margin: 10px 0px 0px 0px;
  }
`;

export default Carousel3;
