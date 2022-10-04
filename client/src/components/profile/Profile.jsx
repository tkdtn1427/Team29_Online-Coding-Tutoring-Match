import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProfileImg from '../profileImg/ProfileImg.jsx';
import { TextMode } from '../buttons/ColorMode.jsx';
import PorfileEditModal from '../modal/PorfileEditModal.jsx';
import { GetUserInfo } from '../../utils/apis/API/UserAPI';
import picturelogo from '../../assets/img/picturelogo.png';
import { UploadImage, UpdateImage, RemoveImage } from '../../utils/apis/API/ImageAPI';

function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const hiddenFileInput = useRef(null);

  const onClickButton = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();

  useEffect(() => {
    GetUserInfo().then(data => setUser(data));
  }, []);

  const imageSelectHandler = event => {
    const imageFile = event.target.files[0];
    setFile(imageFile);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = event => {
      setPreview({
        imgSrc: event.target.result,
        fileName: imageFile.name,
      });
    };

    if (setImgSrc() !== picturelogo) UpdateImage(imageFile);
    else UploadImage(imageFile);
  };

  // 1.버튼을 누르면 handleClick 동작
  // 2. ref한게 클릭을 시킴
  //    여기서 ref한게 input임
  // 3. input을 클릭하게됨
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const setImgSrc = () => {
    if (preview && preview.imgSrc) return preview.imgSrc;
    if (user && user.imageUrl !== 'x') return user.imageUrl;
    return picturelogo;
  };

  const removeHandler = () => {
    setUser({ ...user, imageUrl: 'x' });
    setPreview(null);
    RemoveImage();
  };

  return (
    <Container>
      <div className="picture">
        <ProfileImg width="300px" height="300px" src={setImgSrc()} />
        {location.pathname === '/mypage' ? (
          <div className="btnWrap">
            <TextMode mode={'ORANGE'} text={'삭제'} onClick={removeHandler} />
            <TextMode mode={'GREEN'} text={'등록'} onClick={handleClick} />
            <input
              id="image"
              type="file"
              ref={hiddenFileInput}
              style={{ display: 'none' }}
              onChange={imageSelectHandler}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <Wrapper>
        <div className="nameWrap">
          <p>ttt</p>
          <span>ttt</span>
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
