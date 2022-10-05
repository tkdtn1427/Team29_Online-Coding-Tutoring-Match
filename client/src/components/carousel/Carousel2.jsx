import styled from '@emotion/styled';
import carouselImg1 from '../../assets/img/carouselImg1.png';

function Carousel2() {
  return (
    <Container>
      <img src={carouselImg1} className="img" alt="carouselimg" />
      <Intro>
        {' '}
        <div className="firstcontent">답변 느린 질문게시판대신!</div>
        <div className="secondcontent"> IGUWANA</div>
        <div className="thirdcontent">빠른 실시간 채팅!</div>
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
  background-color: var(--org);
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

export default Carousel2;
