import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserType} from '../../types/user-type.ts';
import {AxiosInstance} from 'axios';
import {AppRoute} from '../../const.tsx';
import {dropToken, saveToken} from '../../services/token.ts';

export const checkAuth = createAsyncThunk<UserType, undefined, {extra: AxiosInstance}>('auth/checkAuth', async (
  _arg, {extra: api}) => {
  const response = await api.get<UserType>(AppRoute.Login);
  return response.data;
});

type LoginData = {
  email: string;
  password: string;
};

export const login = createAsyncThunk<UserType, LoginData, {extra: AxiosInstance}>('auth/login', async (
  body, {extra: api}) => {
  const response = await api.post<UserType>(AppRoute.Login, body);
  saveToken(response.data.token);
  return response.data;
});

export const logout = createAsyncThunk<unknown, undefined, {extra: AxiosInstance}>('auth/logout', async (
  _arg, {extra: api}) => {
  await api.delete(AppRoute.Login);
  dropToken();
});
