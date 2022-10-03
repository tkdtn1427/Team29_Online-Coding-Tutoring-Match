import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { TeachersReducer } from '../teacherlist/TeachersReducer';

const store = configureStore({
  reducer: {
    teachers: TeachersReducer.reducer,
  },
}); // state를 등록해야 사용 가능 등록 규격이 있음

export default store;
