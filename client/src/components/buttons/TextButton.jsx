import styled from '@emotion/styled';

function TextButton({ ftcolor, bgcolor, text }) {
  return (
    <Container ftcolor={ftcolor} bgcolor={bgcolor}>
      {text}
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  align-items: center;
  background-color: ${props => props.bgcolor};
  color: ${props => props.ftcolor};
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 15px;
  cursor: pointer;
  border: none;
`;

export default TextButton;
