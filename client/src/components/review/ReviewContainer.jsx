import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { GetUser } from '../../redux/user/UserReducer';
import ReviewForm from './ReviewForm.jsx';
import ReviewBox from './ReviewBox.jsx';

function ReviewContainer() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.user);

  const [status, setStatus] = useState(false);

  const onChangeStatus = () => {
    setStatus(!status);
  };

  useEffect(() => {
    dispatch(GetUser());
  }, []);

  return (
    <>
      {loading ? (
        ''
      ) : (
        <Container>
          <ReviewForm user={user} onChangeStatus={onChangeStatus} />
          <ReviewBox user={user} onChangeStatus={onChangeStatus} status={status} />
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
