// 나중에 토큰 생기면 옮길 예정
import axios from 'axios';
import { getUser } from '../../Localstorage';

const chatAPI = axios.create({ baseURL: 'https://seb039pre029.ga:444', timeout: 1000 });

async function CreateRoom(teacherId) {
  const { role, userId } = getUser();
  try {
    const result = await chatAPI.post('/v1/chat/room', {
      studentId: userId,
      teacherId,
      roomName: `${userId}-${teacherId}`,
    });
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

export default CreateRoom;
