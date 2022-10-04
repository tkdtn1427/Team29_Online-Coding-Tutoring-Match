import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetTeachers } from '../../utils/apis/AuthAPI';

const TeacherList = createAsyncThunk('GET_TEACHERS', async arrange => {
  const response = await GetTeachers(arrange);
  return response;
});

const TeachersReducer = createSlice({
  name: 'teacherslist', // state 이름
  initialState: { teachers: [], filteredTeachers: [], loading: 'true' }, // 값
  reducers: {
    searchByNickName: (state, action) => {
      const filteredTeachers = state.teachers.filter(teacher =>
        teacher.nickName.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filteredTeachers: [...filteredTeachers],
      };
    },

    searchByStack: (state, action) => {
      const filteredTeachers = state.teachers.filter(teacher => {
        const skills = teacher.skillTableList.map(skill => skill.name);
        return skills.some(skill => action.payload.includes(skill)); // tags["javascript","react"]
      });

      return {
        ...state,
        filteredTeachers: [...filteredTeachers],
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(TeacherList.pending, state => {
        state.loading = true;
      })
      .addCase(TeacherList.fulfilled, (state, { payload }) => {
        state.teachers = [...payload.data];
        state.filteredTeachers = [...payload.data];
        state.loading = false;
      })
      .addCase(TeacherList.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
}); // useState랑 비슷

export { TeacherList, TeachersReducer };
