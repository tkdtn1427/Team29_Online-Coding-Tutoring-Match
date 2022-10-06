import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { GetUser } from '../../redux/user/UserReducer';
import ReviewForm from './ReviewForm.jsx';
import ReviewBox from './ReviewBox.jsx';

function ReviewContainer() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(GetUser());
  }, []);

  return (
    <>
      {loading ? (
        ''
      ) : (
        <Container>
          <ReviewForm user={user} />
          <ReviewBox user={user} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  align-self: center;

  width: 800px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ReviewContainer;
