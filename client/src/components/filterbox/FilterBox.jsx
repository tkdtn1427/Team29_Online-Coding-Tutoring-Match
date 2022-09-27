import { useState } from 'react';
import styled from '@emotion/styled';
import TagListBox from '../tagbox/TagListBox.jsx';
import { TextMode } from '../buttons/ColorMode.jsx';
import SearchInput from '../input/SearchInput.jsx';
import Dropbox from '../dropbox/Dropbox.jsx';

function FilterBox() {
  const [currentTab, setCurrentTab] = useState(0);

  const Tab = [{ text: '인기순' }, { text: '관심분야별' }];

  const selectTabHandler = i => {
    setCurrentTab(i);
  };

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
              selectTabHandler(i);
            }}
          />
        ))}
        {/* <TextMode mode="GREY" text="인기순" ftsize="var(--s)" padding="10px 15px"></TextMode>
        <TextMode mode="GREY" text="관심분야별" ftsize="var(--s)" padding="10px 15px"></TextMode> */}
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
