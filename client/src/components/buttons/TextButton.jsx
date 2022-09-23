import styled from '@emotion/styled';

function TextButton({ ftcolor, bgcolor, shadow, text, ftsize, padding, onClick }) {
  return (
    <Container ftcolor={ftcolor} bgcolor={bgcolor} shadow={shadow} ftsize={ftsize} padding={padding} onClick={onClick}>
      {text}
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  align-items: center;
  background-color: ${props => props.bgcolor};
  color: ${props => props.ftcolor};
  padding: ${props => props.padding || '6px 12px'};
  border-radius: 50px;
  font-size: ${props => props.ftsize || 'var(--reg)'};
  cursor: pointer;
  border: none;
  box-shadow: ${props => props.shadow};
`;

export default TextButton;
