import styled from '@emotion/styled';

function CheckBox({ name, text, ftsize }) {
  return (
    <Container ftsize={ftsize}>
      <input type="radio" name={name} />
      <span>{text}</span>
    </Container>
  );
}

const Container = styled.label`
  font-size: ${props => props.ftsize};
  font-family: var(--main);

  > span {
    vertical-align: middle;
  }

  > [type='radio'] {
    vertical-align: middle;
    appearance: none;
    border: max(2px, 0.1em) solid var(--blk);
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
    transition: border 0.2s ease-in-out;
  }

  > [type='radio']:checked {
    border: 0.4em solid var(--grn);
  }

  > [type='radio']:hover {
    box-shadow: 0 0 0 max(2px, 0.1em) var(--liblk);
    cursor: pointer;
  }
`;

export default CheckBox;
