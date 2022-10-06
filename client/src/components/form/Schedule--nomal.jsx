import styled from '@emotion/styled';

import { TextMode } from '../buttons/ColorMode.jsx';

function Schedule({ lesson }) {
  return (
    <Container>
      {lesson == false ? (
        <Wrap>
          <div className="st">일정이 없습니다</div>
        </Wrap>
      ) : (
        lesson?.map((el, idx) => (
          <Wrap key={idx}>
            {el.time.map((e, i) => (
              <TextMode mode={'GREEN'} text={Object.values(e)} key={i} />
            ))}
            <div>{el.subject}</div>
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
  margin: 0 0 20px 0;

  div {
    margin: 0 0 0 10px;
    font-weight: bold;
  }

  .st {
    font-weight: bold;
  }
`;

export default Schedule;
