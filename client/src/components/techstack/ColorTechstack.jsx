// bgcolor, text 받을 수 있도록 (상위에서 데이터에 있는 값들 내려줄 것)

import styled from '@emotion/styled';

function ColorTechstack({ bgcolor, text }) {
  return <Container bgcolor={bgcolor}>{text}</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: var(--s);
  padding: 4px 12px;
  font-family: var(--point);
  border-radius: 30px;
  background-color: ${props => props.bgcolor};
`;

export default ColorTechstack;
