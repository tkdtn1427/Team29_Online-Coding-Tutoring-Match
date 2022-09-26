import styled from '@emotion/styled';
import { useState } from 'react';
import ColorTechstack from './ColorTechstack.jsx';

function ColorStackList({ width }) {
  const [stacks, useStacks] = useState([]);

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
  width: ${props => props.width};
`;

export default ColorStackList;
