import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TagList } from '../../redux/taglist/TagsReducer';

function Dropbox({ width, height, filteredTags, setFilteredTags }) {
  const dipatch = useDispatch();
  const { filteringTags } = useSelector(state => state.tags);
  useEffect(() => {
    dipatch(TagList());
  }, []);

  return (
    <Container width={width} height={height}>
      {filteringTags.map((e, i) => (
        <div
          key={i}
          onClick={() => {
            setFilteredTags([...filteredTags, e.name]);
          }}>
          {e.name}
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 0px 0px 5px var(--liblk);
  font-size: var(--reg);
  width: ${props => props.width};
  max-height: ${props => props.height};
  overflow-y: scroll;
  position: absolute;
  background-color: white;
  padding: 12px 16px;
  margin-top: 35px;
  font-family: var(--main);
  color: var(--blk);
  border-radius: 5px;
  > div {
    padding: 5px;
  }
  > div:hover {
    border-radius: 5px;
    cursor: pointer;
    background-color: var(--liblk);
  }
`;

export default Dropbox;
