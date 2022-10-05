import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import ProfileImg from '../profileImg/ProfileImg.jsx';
import picturelogo from '../../assets/img/picturelogo.png';
import { GetReviews } from '../../utils/apis/API/ReviewAPI';
import { GetUserInfo } from '../../utils/apis/API/UserAPI';
import { UploadImage, UpdateImage, RemoveImage } from '../../utils/apis/API/ImageAPI';
import Stars from '../star/Stars.jsx';

function ReviewBox() {
  const params = useParams();
  const [data, setData] = useState([{ reputation: 5 }]);
  const [user, setUser] = useState({ nickName: 'dummy' });

  // console.log('data', data);
  console.log('user', user);

  useEffect(() => {
    GetReviews({ teacherId: params.id, page: 1, size: 5 }).then(res => setData(res.data));
  }, []);

  useEffect(() => {
    GetUserInfo({ role: 'student', userId: data.studentId }).then(res => setUser(res));
  }, []);

  const setImgSrc = () => {
    if (user && user.imageUrl !== 'x') return user.imageUrl;
    return picturelogo;
  };

  return (
    <Container>
      {data.map((el, idx) => (
        <Wrp key={idx}>
          <div className="viewer">
            <div className="star-wrp">
              <Stars scores={el.reputation} width="30px" height="30px" />
              <div className="repu">{el.reputation}</div>
            </div>
            <div className="content">{el.content}</div>
          </div>
          <div className="info-wrp">
            <ProfileImg width="30px" height="30px" src={setImgSrc} />
            <div className="nick">{user.nickName}</div>
            <div className="date">{el.date}</div>
          </div>
        </Wrp>
      ))}
    </Container>
  );
}

const Container = styled.div``;
const Wrp = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 800px;
  padding: 20px 20px;
  margin-bottom: 10px;
  border-bottom: 2px solid var(--blk);

  .star-wrp {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 20px 0;
  }

  .repu {
    font-size: var(--l);
    margin: 5px 0 0 10px;
  }

  .content {
    font-size: var(--l);
    margin-bottom: 10px;
  }

  .info-wrp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    font-size: var(--r);
  }
`;

export default ReviewBox;
