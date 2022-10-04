import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetUserInfo } from '../../utils/apis/API/UserAPI';

const GetUser = createAsyncThunk('GET_USER', async () => {
  const response = await GetUserInfo();
  return response;
});

const UserInfoReducer = createSlice({
  name: 'userinfo', // state 이름
  initialState: { user: {}, loading: 'true' }, // 값
  reducers: {
    user: (state, action) => ({ ...state.user, ...action.payload }),
  },

  extraReducers: builder => {
    builder
      .addCase(GetUser.pending, state => {
        state.loading = true;
      })
      .addCase(GetUser.fulfilled, (state, { payload }) => {
        state.user = { ...payload };
        state.loading = false;
      })
      .addCase(GetUser.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
}); // useState랑 비슷

export { UserInfoReducer, GetUser };
