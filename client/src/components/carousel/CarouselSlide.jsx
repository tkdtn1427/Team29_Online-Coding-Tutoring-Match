import styled from '@emotion/styled';
import { useRef, useState, useEffect } from 'react';
import Carousel1 from './Carousel1.jsx';
import Carousel2 from './Carousel2.jsx';
import Carousel3 from './Carousel3.jsx';

function Carousel() {
  const TOTAL_SLIDES = 2;
  const [currentSlide, setCurrentSlide] = useState(1);
  const slideRef = useRef(null);

  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면
      setCurrentSlide(0); // 1번째 사진으로 넘어갑니다.
      // return;  // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
  }, [currentSlide]);

  useEffect(() => {
    setTimeout(() => {
      NextSlide();
    }, 2000);
  }, [currentSlide]);

  return (
    <Container>
      <div className="inner" ref={slideRef}>
        <div className="item">
          <Carousel1 />
        </div>
        <div className="item">
          <Carousel2 />
        </div>
        <div className="item">
          <Carousel3 />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  overflow: hidden;
  max-width: 1100px;

  .inner {
    white-space: nowrap;
  }
  .item {
    display: inline-block;
    width: 100%;
  }
`;

export default Carousel;
