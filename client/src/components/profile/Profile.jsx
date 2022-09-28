import { useState } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProfileImg from '../profileImg/ProfileImg.jsx';
import { TextMode } from '../buttons/ColorMode.jsx';
import PorfileEditModal from '../modal/PorfileEditModal.jsx';

function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const onClickButton = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();

  return (
    <Container>
      <div className="picture">
        <ProfileImg></ProfileImg>
        {location.pathname === '/mypage' ? (
          <div className="btnWrap">
            <TextMode mode={'ORANGE'} text={'삭제'} />
            <TextMode mode={'GREEN'} text={'등록'} />
          </div>
        ) : (
          ''
        )}
      </div>
      <Wrapper>
        <div className="nameWrap">
          <p>코드까마귀</p>
          <span>#0001</span>
          {location.pathname === '/mypage' ? (
            <TextMode mode={'GREEN'} text={'수정'} onClick={onClickButton} />
          ) : (
            <TextMode mode={'GREEN'} text={'문의하기'} onClick={onClickButton} />
          )}
          {isOpen && <PorfileEditModal onClose={onClickButton} />}
        </div>
        <div className="st">별점 4.8</div>
        <div className="ab1">about me.</div>
        <div className="ab2">자기소개 하기</div>
        <div className="sk">기술 스택 skill</div>
        <div className="cr1">career.</div>
        <div className="cr2">약력 좌르르</div>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 50px;

  .picture {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  /* .pic {
    display: flex;
    align-items: center;
    justify-content: center;

    border: 2px solid var(--blk);
    border-radius: 200px;
    width: 300px;
    height: 300px;

    background-color: var(--grn);
  } */
  .btnWrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    margin: 30px 0 0 0;
  }
`;
const Wrapper = styled.div`
  width: 400px;
  margin: 0 0 0 100px;

  .nameWrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    > p {
      margin: 0 10px 0 0;
    }
    > span {
      margin: 0 150px 0 0;
    }
  }

  .st {
    margin: 20px 0;
  }
  .ab1 {
    color: var(--grn);
    font-family: var(--point);
    margin: 0 0 10px 0;
  }
  .ab2 {
    margin: 0 0 20px 0;
  }
  .sk {
    font-family: var(--mono);
    margin: 0 0 20px 0;
  }
  .cr1 {
    color: var(--grn);
    font-family: var(--point);
    margin: 0 0 10px 0;
  }
  .cr2 {
    margin: 0 0 20px 0;
  }
`;

export default Profile;
