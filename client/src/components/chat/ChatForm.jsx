import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useEffect, useState } from 'react';
import { getUser } from '../../utils/Localstorage';
import { GetUser } from '../../redux/user/UserReducer';
import { IconMode } from '../buttons/ColorMode.jsx';

function ChatForm() {
  const params = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [pastChat, setPastChat] = useState([]);
  const [chat, setChat] = useState([]);
  const { user } = useSelector(state => state.user);
  const { role, userId } = getUser();

  const socket = useMemo(
    () => new WebSocket(`wss://seb039pre029.ga/chat?role=${role}&userId=${userId}&roomId=${params.id}`),
    []
  );

  useEffect(() => {
    dispatch(GetUser());
  }, []);

  useEffect(() => {
    socket.addEventListener('open', event => {
      console.log('connected!');
    });
    socket.addEventListener('message', event => {
      console.log(event);
      if (event.data.includes('Past')) {
        const sliceChat1 = event.data.split('"')[1];
        const sliceChat2 = sliceChat1.split('=')[1];
        const pastChats = sliceChat2.split('\\n');
        console.log(pastChats);
        setPastChat([...pastChats].filter(e => e !== ''));
      } else if (!event.data.includes('session Id')) {
        const currentChats = event.data.split('"')[1];
        console.log(currentChats);
        setChat(prev => [...prev, currentChats]);
      }
    });
  }, []);

  const sendMessage = () => {
    const data = {
      messageType: 'CHAT',
      roomId: params.id,
      message,
      sender: user.nickName,
      role,
      userId,
    };
    socket.send(JSON.stringify(data));
  };

  const onSubmit = event => {
    event.preventDefault();
    sendMessage();
    setMessage('');
  };

  return (
    <Container>
      <ViewChat>
        {pastChat.map((e, i) => (
          <div
            key={i}
            className={
              (role === 'student' && e.includes('s)')) || (role === 'teacher' && e.includes('t)')) ? 'me' : 'other'
            }>
            <div className="nickName">{e.split(':')[0].split(')')[1]}</div>
            <div className="content">{e.split(':')[1]}</div>
          </div>
        ))}
        {chat.map((e, i) => (
          <div
            key={i}
            className={
              (role === 'student' && e.includes('s)')) || (role === 'teacher' && e.includes('t)')) ? 'me' : 'other'
            }>
            <div className="nickName">{e.split(':')[0].split(')')[1]}</div>
            <div className="content">{e.split(':')[1]}</div>
          </div>
        ))}
      </ViewChat>
      <SubmitWrapper>
        <Submit onChange={e => setMessage(e.target.value)} value={message} />
        <button onClick={onSubmit} type="submit">
          보내기
        </button>
      </SubmitWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const ViewChat = styled.div`
  margin-top: 10px;
  padding-top: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;

  width: 80%;
  color: white;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  font-family: var(--point);
  font-size: var(--reg);
  .me {
    width: 250px;
    align-self: flex-end;
    margin: 10px;
    display: flex;
    flex-direction: column;
    .content {
      padding: 8px;
      border-radius: 10px;
      background-color: var(--grn);
    }
  }
  .other {
    width: 250px;
    align-self: flex-start;
    margin: 10px;
    display: flex;
    flex-direction: column;
    .content {
      padding: 8px;
      border-radius: 10px;
      background-color: var(--org);
    }
  }
  .nickName {
    color: var(--blk);
    background-color: white;
    font-weight: bold;
    font-size: var(--s);
    padding: 0px 0px 5px 5px;
  }
`;

const Submit = styled.textarea`
  width: 90%;
  height: 50px;
`;

const SubmitWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export default ChatForm;
