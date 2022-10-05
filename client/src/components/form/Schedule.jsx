import { useState } from 'react';
import styled from '@emotion/styled';

import { TextMode } from '../buttons/ColorMode.jsx';
import LessonChangeModal from '../modal/LessonChangeModal.jsx';

function Schedule({ lesson, role }) {
  const [isOpen, setIsOpen] = useState(false);
  const openLessonChangeModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      {lesson == false ? (
        <Wrap>
          <div className="st">일정이 없습니다</div>
        </Wrap>
      ) : (
        lesson?.map((el, idx) => (
          <Wrap key={idx}>
            {el.time.map((e, i) =>
              role === 'student' ? (
                <TextMode mode={'GREEN'} text={Object.values(e)} key={i} />
              ) : (
                <TextMode mode={'GREEN'} text={Object.values(e)} key={i} onClick={openLessonChangeModal} />
              )
            )}
            <div>{el.subject}</div>
            {isOpen && <LessonChangeModal onClose={openLessonChangeModal} lesson={lesson[idx]} />}
          </Wrap>
        ))
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  margin-top: 60px;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 10px 0;

  div {
    margin: 0 0 0 10px;
  }

  .st {
    font-weight: bold;
  }
`;

export default Schedule;
