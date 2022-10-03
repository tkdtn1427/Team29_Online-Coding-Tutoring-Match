import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Card from './Card.jsx';
import { TeacherList } from '../../redux/teacherlist/TeachersReducer';

function CardList() {
  const dispatch = useDispatch();
  const { teachers } = useSelector(state => state.teachers);

  useEffect(() => {
    dispatch(TeacherList('nickName'));
  }, []);

  return (
    <Container>
      {[...teachers].reverse().map((e, i) => (
        <Card key={i} data={e} />
      ))}
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 50px;
  width: 1100px;
`;

export default CardList;
