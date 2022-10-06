import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

import ProfileImg from '../profileImg/ProfileImg.jsx';
import picturelogo from '../../assets/img/picturelogo.png';
import { GetReviews } from '../../utils/apis/API/ReviewAPI';
import Stars from '../star/Stars.jsx';
import ReviewChangeModal from '../modal/ReviewChangeModal.jsx';

function ReviewBox() {
  const params = useParams();
  const [data, setData] = useState([{ reputation: 5 }]);
  const { user } = useSelector(state => state.user);

  console.log('user:', user);
  console.log('data:', data);

  useEffect(() => {
    GetReviews({ teacherId: params.id, page: 1, size: 5 }).then(res => setData(res.data));
  }, []);

  const setImgSrc = () => {
    if (data.image !== 'x') return data.image;
    return picturelogo;
  };

  const [isOpen, setIsOpen] = useState(false);

  const openChangeModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      {data.map((el, idx) => (
        <Wrp key={idx}>
          <div className="viewer">
            <div className="star-wrp">
              <Stars scores={el.reputation} width="20px" height="20px" />
              <div className="repu">{el.reputation}</div>
            </div>
            <div className="content">{el.content}</div>
          </div>

          <div className="info-wrp">
            <ProfileImg width="30px" height="30px" src={setImgSrc} />
            <div className="nick">{el.nickName}</div>
            <div className="date">{el.date}</div>
            <button className={el.studentId === user.studentId ? 'btn' : 'btn--no'} onClick={openChangeModal}>
              수정
            </button>
          </div>
          {isOpen && <ReviewChangeModal onClose={openChangeModal} contentId={el.reviewId} />}
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
  width: 600px;
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
    font-size: var(--r);
    margin: 5px 0 0 10px;
  }

  .content {
    font-size: var(--r);
    margin-bottom: 10px;
  }

  .info-wrp {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    font-size: var(--r);
  }

  .btn {
    cursor: pointer;
    padding: 5px 10px;
    color: white;
    border: none;
    border-radius: 50px;
    background-color: var(--org);
  }

  .btn--no {
    display: none;
  }
`;

export default ReviewBox;
