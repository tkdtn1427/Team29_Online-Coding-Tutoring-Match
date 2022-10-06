import styled from '@emotion/styled';

import ColorTechstack from './ColorTechstack.jsx';

function ColorStackList({ width, stacks }) {
  return (
    <Container width={width}>
      {stacks.map((e, i) => (
        <ColorTechstack key={i} text={e.name} bgcolor={e.color} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 2px;
  width: ${props => props.width};
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default ColorStackList;
