import axios from 'axios';
import { addTokenLocalStorage, addRoleLocalStorage, addUserLocalStorage, getUser, getToken } from '../Localstorage';

const authAPI = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL, timeout: 10000 });

// 로그인 회원가입 폼이랑 role 내려주기
async function Login({ loginForm, role }) {
  try {
    const result = await authAPI.post(`/v1/user/login`, loginForm, { headers: { role } });
    const accessToken = result.headers.accesstoken.split(' ')[1];
    const refreshToken = result.headers.refreshtoken.split(' ')[1];
    const { userid } = result.headers;
    const Role = result.headers.role;
    addTokenLocalStorage({ refreshToken, accessToken });
    addUserLocalStorage(userid);
    addRoleLocalStorage(Role);
    return true;
  } catch (err) {
    if (err.response.data.status === 404) {
      console.log('없는 페이지입니다.');
    } // 실험해놓은것 다시 고치기
  }
}

async function SignUp({ signupForm, role }) {
  try {
    const result = await authAPI.post(`/v1/${role}s/join`, signupForm);
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

// 이메일 인증번호
async function EmailAuth({ code }) {
  try {
    const result = await authAPI.post(`/v1/emails/check?code=${code}`);
    console.log(result.data);
    return result;
  } catch (err) {
    if (err.response.data.status === 409) {
      console.log(err.response.data.message);
    }
    console.log(err);
  }
}

async function GetAccessToken() {
  const { userId, role } = getUser();
  const { refreshToken } = getToken();
  try {
    const result = await authAPI.post(`v1/jwt/refresh`, { userId, role, refreshToken: `Bearer ${refreshToken}` });
    if (result.headers.accesstoken && result.headers.refreshtoken) {
      const accessToken = result.headers.accesstoken.split(' ')[1];
      const refreshToken = result.headers.refreshtoken.split(' ')[1];
      addTokenLocalStorage({ accessToken, refreshToken });
    }
    return result.headers.accesstoken;
  } catch (err) {
    console.log(err);
  }
}

async function GetTeachers(arrange) {
  try {
    const result = await authAPI.get(`/v1/teachers?page=1&size=100&arrange=${arrange}&skill=x`);
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

async function GetOneTeacher(teacherId) {
  try {
    const result = await authAPI.get(`/v1/teachers/${teacherId}`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

export { Login, SignUp, EmailAuth, GetAccessToken, GetTeachers, GetOneTeacher };
