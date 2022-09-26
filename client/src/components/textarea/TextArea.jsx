import styled from '@emotion/styled';
import { TextMode } from '../buttons/ColorMode.jsx';

function TextArea() {
  return (
    <Container>
      <div className="str">
        <div>평점 4.8 / 5</div>
        <TextMode mode={'GREEN'} text={'후기 등록'} />
      </div>
      <Text />
    </Container>
  );
}

const Container = styled.div`
  .str {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 20px 0;
  }
`;
const Text = styled.div`
  border: 1px solid var(--liblk);
  height: 100px;
`;

export default TextArea;
