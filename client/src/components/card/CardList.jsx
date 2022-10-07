import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card.jsx';
import { TeacherList } from '../../redux/teacherlist/TeachersReducer';
import { GetOneTeacher } from '../../utils/apis/AuthAPI';

function CardList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filteredTeachers, loading } = useSelector(state => state.teachers);

  useEffect(() => {
    dispatch(TeacherList('nickName'));
  }, []);

  const navigateInfo = e => {
    navigate(`/info/${e.teacherId}`);
  };

  return (
    <>
      {loading ? (
        ''
      ) : (
        <Container>
          {[...filteredTeachers].map((e, i) => (
            <Card
              key={i}
              data={e}
              onClick={() => {
                navigateInfo(e);
              }}
            />
          ))}
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 50px;
  width: 1100px;
  margin-bottom: 50px;
`;

export default CardList;
