import authRequest from '../Interceptors';
import { getUser } from '../../Localstorage';

// 과외 등록
async function UploadLesson({ postLessonForm }) {
  try {
    const result = await authRequest.post(`/v1/tutorings/register`, postLessonForm);
    return result.data;
  } catch (err) {
    console.log('에러', err);
  }
}

// 과외 수정
async function UpdateLesson({ editLessonForm, tutoringId }) {
  try {
    const result = await authRequest.patch(`/v1/tutorings/update/${tutoringId}`, editLessonForm);
    return result.data;
  } catch (err) {
    console.log('에러', err);
  }
}

// 과외 삭제
async function RemoveLesson({ tutoringId }) {
  try {
    const result = await authRequest.delete(`/v1/tutorings/delete/${tutoringId}`);
    return result;
  } catch (err) {
    console.log('에러', err);
  }
}

// 내 과외 조회
async function SearchLesson({ date }) {
  const { userId } = getUser();
  try {
    const result = await authRequest.get(`/v1/tutorings/${userId}?date=${date}`);
    return result.data;
  } catch (err) {
    console.log('에러', err);
  }
}

// 선생님 과외 조회
async function SearchGlobalLesson({ userId, date }) {
  try {
    const result = await authRequest.get(`/v1/tutorings/${userId}?date=${date}`);
    return result.data;
  } catch (err) {
    console.log('에러', err);
  }
}

export { UpdateLesson, UploadLesson, RemoveLesson, SearchLesson, SearchGlobalLesson };
