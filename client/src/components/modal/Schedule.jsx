import styled from '@emotion/styled';
import Modal from './Modal.jsx';
import { TextMode } from '../buttons/ColorMode.jsx';

function Schedule({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <Wrap>
        <TextMode mode={'GREY'} text={'09:00'} />
        <span>리액트 강의</span>
      </Wrap>
      <Wrap>
        <TextMode mode={'GREEN'} text={'10:00'} />
        <span></span>
      </Wrap>
      <Wrap>
        <TextMode mode={'GREEN'} text={'11:00'} />
        <span></span>
      </Wrap>
      <Wrap>
        <TextMode mode={'GREY'} text={'12:00'} />
        <span> - </span>
      </Wrap>
      <Wrap>
        <TextMode mode={'GREY'} text={'13:00'} />
        <span>자바 스크립트 강의</span>
      </Wrap>
      <Wrap>
        <TextMode mode={'GREY'} text={'14:00'} />
        <span>타입 스크립트 강의</span>
      </Wrap>
      <Wrap>
        <TextMode mode={'GREEN'} text={'15:00'} />
        <span></span>
      </Wrap>
      <Wrap>
        <TextMode mode={'GREY'} text={'16:00'} />
        <span>프로젝트 평가</span>
      </Wrap>
      <Wrap>
        <TextMode mode={'GREY'} text={'17:00'} />
        <span>프로젝트 평가</span>
      </Wrap>
      <Wrap>
        <TextMode mode={'GREY'} text={'18:00'} />
        <span> - </span>
      </Wrap>
      <Wrap>
        <TextMode mode={'GREY'} text={'19:00'} />
        <span>리액트 강의</span>
      </Wrap>
      <Wrap>
        <TextMode mode={'GREEN'} text={'20:00'} />
        <span></span>
      </Wrap>
      <Wrap>
        <TextMode mode={'GREEN'} text={'21:00'} />
        <span></span>
      </Wrap>
    </Modal>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 10px 0;

  > span {
    margin: 0 0 0 10px;
  }
`;

export default Schedule;
