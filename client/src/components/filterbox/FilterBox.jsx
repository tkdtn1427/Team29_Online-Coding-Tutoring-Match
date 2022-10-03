import { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { TextMode } from '../buttons/ColorMode.jsx';
import SearchInput from '../input/SearchInput.jsx';
import TabHandler from '../../utils/TabHandler';
import { TeacherList } from '../../redux/teacherlist/TeachersReducer';

function FilterBox() {
  const [currentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();

  const Tab = [
    { text: '가나다순', filter: 'nickName' },
    { text: '별점순', filter: 'reputation' },
    { text: '후기순', filter: 'count' },
  ];

  return (
    <Container>
      <ButtonWrapper>
        {Tab.map((e, i) => (
          <TextMode
            key={i}
            mode={currentTab === i ? 'GREEN' : 'GREY'}
            text={e.text}
            ftsize="var(--s)"
            padding="10px 15px"
            onClick={() => {
              TabHandler(i, setCurrentTab);
              dispatch(TeacherList(e.filter));
            }}
          />
        ))}
      </ButtonWrapper>
      <SearchInput height="30px" ftsize="var(--s)" placeholder="기술스택 검색" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--blk);
  padding: 10px;
  margin: 50px 0px;
  width: 1100px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0px 10px 0px 0px;
  margin: 0px 10px 0px 0px;
  border-right: 1px solid var(--blk);
`;

export default FilterBox;
