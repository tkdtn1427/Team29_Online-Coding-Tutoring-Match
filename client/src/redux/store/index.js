import { configureStore } from '@reduxjs/toolkit';
import { TeachersReducer } from '../teacherlist/TeachersReducer';
import { TagReducer } from '../taglist/TagsReducer';
import LoginReducer from '../login/LoginReducer';

const store = configureStore({
  reducer: {
    teachers: TeachersReducer.reducer,
    tags: TagReducer.reducer,
    loginState: LoginReducer.reducer,
  },
}); // state를 등록해야 사용 가능 등록 규격이 있음

export default store;
