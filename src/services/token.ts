import {AUTH_TOKEN_KEY} from '../const.tsx';

export type Token = string;

export const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_KEY) ?? '';
export const saveToken = (token: Token) => localStorage.setItem(AUTH_TOKEN_KEY, token);
export const dropToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);
