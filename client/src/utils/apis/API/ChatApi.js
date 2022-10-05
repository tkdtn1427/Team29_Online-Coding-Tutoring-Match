// 나중에 토큰 생기면 옮길 예정
import axios from 'axios';
import { getUser } from '../../Localstorage';

const chatAPI = axios.create({ baseURL: 'https://seb039pre029.ga', timeout: 1000 });

async function CreateRoom(teacherId) {
  const { role, userId } = getUser();
  try {
    const result = await chatAPI.post('/v1/chat/room', {
      studentId: userId,
      teacherId,
    });
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function GetRoom() {
  const { role, userId } = getUser();
  try {
    const result = await chatAPI.get(`/v1/chat/?role=${role}&userId=${userId}`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

export { GetRoom, CreateRoom };
