import { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { TextMode } from '../buttons/ColorMode.jsx';
import TabHandler from '../../utils/TabHandler';
import { TeacherList } from '../../redux/teacherlist/TeachersReducer';
import Dropbox from '../dropbox/Dropbox.jsx';
import FilterStackInput from '../input/FilterStackInput.jsx';
import TagListBox from '../tagbox/TagListBox.jsx';

function FilterBox() {
  const [filteredTags, setFilteredTags] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
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
      <SearchWrapper>
        <FilterStackInput
          height="30px"
          ftsize="var(--s)"
          placeholder="기술스택 검색"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        {isOpen ? (
          <Dropbox width="150px" height="100px" filteredTags={filteredTags} setFilteredTags={setFilteredTags} />
        ) : (
          ''
        )}
      </SearchWrapper>
      <TagListBox
        filteredTags={filteredTags}
        setFilteredTags={setFilteredTags}
        height="20px"
        width="650px"></TagListBox>
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
const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default FilterBox;
