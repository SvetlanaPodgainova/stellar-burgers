import { api, TLoginData, TRegisterData } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { setIsAuthChecked, setUser } from './slice';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) => {
    const response = await api.registerUserApi({
      email,
      name,
      password
    });
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const response = await api.loginUserApi({ email, password });
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    const res = await api.updateUserApi(data);
    return res.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      try {
        const response = await api.getUserApi();
        dispatch(setUser(response.user));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsAuthChecked(true));
      }
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const response = await api.logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return response;
});
