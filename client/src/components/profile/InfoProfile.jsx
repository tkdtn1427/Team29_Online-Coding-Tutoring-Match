import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useLocation, useParams } from 'react-router-dom';
import ProfileImg from '../profileImg/ProfileImg.jsx';
import { TextMode } from '../buttons/ColorMode.jsx';
import { GetOneTeacher } from '../../utils/apis/AuthAPI';
import picturelogo from '../../assets/img/picturelogo.png';
import { UploadImage, UpdateImage, RemoveImage } from '../../utils/apis/API/ImageAPI';
import RenderInWindow from '../chat/ChatBtn';
import CreateRoom from '../../utils/apis/API/ChatApi';
import Stars from '../star/Stars.jsx';
import ColorStackList from '../techstack/ColorStackList.jsx';

function InfoProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const hiddenFileInput = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(user);
  const toggleChatRoom = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const params = useParams();
  console.log(params.id);

  // useEffect(() => {
  //   GetUserInfo().then(data => setUser(data));
  // }, []);

  useEffect(() => {
    GetOneTeacher(params.id).then(data => {
      setUser(data);
      setIsLoading(false);
    });
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
    <>
      {isLoading ? null : (
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
              <p>{user.nickName}</p>
              <span>{user.code}</span>

              <TextMode
                mode={'GREEN'}
                text={'문의하기'}
                onClick={() => {
                  toggleChatRoom();
                  CreateRoom(params.id).then(data => {
                    setRoomId(data.roomId);
                  });
                }}
              />

              {roomId && <RenderInWindow onClose={toggleChatRoom} roomId={roomId} />}
            </div>
            <div className="st">
              <Stars scores={user.reputation} width="10px" height="10px"></Stars>
              <span>{user.reputation}</span>
            </div>
            <div className="ab1">about me.</div>
            <div className="ab2">{user.aboutMe}</div>
            <ColorStackList stacks={user.skillTableList} width="400px"></ColorStackList>
            <div className="cr1">career.</div>
            <div className="cr2">{user.career} </div>
          </Wrapper>
        </Container>
      )}
    </>
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
    display: flex;
    gap: 5px;
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

export default InfoProfile;
