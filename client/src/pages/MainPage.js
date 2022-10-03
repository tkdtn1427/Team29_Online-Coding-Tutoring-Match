import styled from '@emotion/styled';
import { Routes, Route, useParams } from 'react-router-dom';
import CarouselSlide from '../components/carousel/CarouselSlide.jsx';
import CardList from '../components/card/CardList.jsx';
import SearchInput from '../components/input/SearchInput.jsx';
import FilterBox from '../components/filterbox/FilterBox.jsx';

function MainPage() {
  const params = useParams();

  return (
    <Container>
      <CarouselSlide />
      <Wrapper>
        <SearchInput width="550px" height="45px" placeholder="선생님을 검색하세요." ftsize="var(--reg)" />
        <FilterBox />
        <CardList params={params} />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 30px;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  width: 100%;
`;

export default MainPage;
