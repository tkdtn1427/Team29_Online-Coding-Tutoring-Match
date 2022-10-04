import { createSlice } from '@reduxjs/toolkit';

const LoginReducer = createSlice({
  name: 'login',
  initialState: { loginState: false },
  reducers: {
    logIn: state => {
      state.loginState = true;
    },
    logOut: state => {
      state.loginState = false;
    },
  },
});

export default LoginReducer;
