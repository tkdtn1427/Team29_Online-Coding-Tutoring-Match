import authRequest from '../Interceptors';
import { getUser } from '../../Localstorage';

// 과외 등록
async function UploadLesson({ postLessonForm }) {
  try {
    const result = await authRequest.post(`/v1/tutorings/register`, postLessonForm);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

// 과외 수정
async function UpdateLesson({ editLessonForm }) {
  const { userId } = getUser();
  try {
    const result = await authRequest.patch(`/v1/tutorings/update/${userId}`, editLessonForm);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

// 과외 삭제
async function RemoveLesson() {
  const { userId } = getUser();
  try {
    const result = await authRequest.delete(`/v1/tutorings/delete/${userId}`);
    return result;
  } catch (err) {
    console.log(err);
  }
}

// 특정 선생님 과외 검색
// date가 안들어오면 전체 조회(?)
async function SearchLesson({ page, size, date }) {
  const { userId } = getUser();
  try {
    const result = await authRequest.get(`/v1/tutorings/${userId}/page=${page}&size=${size}&date=${date}`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

export { UpdateLesson, UploadLesson, RemoveLesson, SearchLesson };
