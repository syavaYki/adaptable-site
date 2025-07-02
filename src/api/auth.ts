import { getLocalToken } from '../utils/heplerApi';
import api from './api';

export const userLogin = (email: string, password: string) => {
  return api.post(`api/v1/users/login/`, { email, password });
};

export const userLogout = () => {
  return api.post(`api/v1/users/logout/`, null, {
    headers: {
      Authorization: getLocalToken(),
    },
  });
};

export const register = (
  email: string,
  password: string,
  first_name: string,
  last_name: string,
) => {
  return api.post(`api/v1/users/register/`, {
    email,
    password,
    first_name,
    last_name,
  });
};

export const sendRestoreToken = (email: string) => {
  return api.post(`/api/v1/users/restore_token/`, {
    email,
  });
};

export const updatePassword = (password: string, token: string) => {
  return api.post(`/api/v1/users/update_password/`, {
    password,
    token,
  });
};
