// text 받고 x(svg)표시 있어야함
import styled from '@emotion/styled';
import Cancel from '../../assets/svg/Cancel.jsx';

function TagTechStack({ text }) {
  return (
    <Container>
      {text} <Cancel />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--grn);
  border: 1px solid var(--grn);
  border-radius: 20px;
  font-family: var(--main);
  padding: 8px;
`;

export default TagTechStack;
