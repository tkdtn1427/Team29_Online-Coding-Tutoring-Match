import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetTeachers } from '../../utils/apis/AuthAPI';

const TeacherList = createAsyncThunk('GET_TEACHERS', async arrange => {
  const response = await GetTeachers(arrange);
  return response;
});

const TeachersReducer = createSlice({
  name: 'teacherslist', // state 이름
  initialState: { teachers: [], loading: 'true' }, // 값
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(TeacherList.pending, state => {
        state.loading = true;
      })
      .addCase(TeacherList.fulfilled, (state, { payload }) => {
        state.teachers = [...payload.data];
        state.loading = false;
      })
      .addCase(TeacherList.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
}); // useState랑 비슷

export { TeacherList, TeachersReducer };
