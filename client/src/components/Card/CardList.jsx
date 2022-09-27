import styled from '@emotion/styled';
import Card from './Card.jsx';

function CardList() {
  return (
    <Container>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
        <Card key={i} />
      ))}
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 50px;
  width: 1100px;
`;

export default CardList;
