import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { TeachersReducer } from '../../redux/teacherlist/TeachersReducer';
import TagTechstack from './TagTechstack.jsx';

function TagListBox({ width, height, filteredTags, setFilteredTags }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TeachersReducer.actions.searchByStack(filteredTags));
  }, [filteredTags]);

  return (
    <Container width={width} height={height}>
      {filteredTags.map((e, i) => (
        <TagTechstack key={i} text={e} target={e} filteredTags={filteredTags} setFilteredTags={setFilteredTags} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border: 1px solid red;
  margin-left: 10px;
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: var(--s);
  gap: 5px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default TagListBox;
