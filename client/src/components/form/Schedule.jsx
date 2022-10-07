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
            <div className="spec">
              <div className="sub">{el.subject}</div>
              <div className="lsid">{el.tutoringId}</div>
              <div className="tid">{el.teacherId}</div>
            </div>
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
  min-width: 300px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid var(--liblk);
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .st {
    font-weight: bold;
    margin: 30px;
  }

  .spec {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 20px 0px;
    gap: 8px;
  }

  .sub {
    font-size: var(--r);
    font-weight: bold;
    margin-left: 12px;
  }

  .lsid {
    padding: 4px 6px;
    color: var(--grey0);
    font-family: var(--mono);
    font-size: var(--s);
    border-radius: 50px;
    background-color: var(--org);
    margin-left: 20px;
  }

  .tid {
    padding: 4px 6px;
    color: var(--grey0);
    font-family: var(--mono);
    font-size: var(--s);
    border-radius: 50px;
    background-color: var(--grn);
  }
`;

export default Schedule;
