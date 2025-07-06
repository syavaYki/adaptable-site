import { AxiosResponse } from 'axios';
import api from './api';
import { getLocalToken } from '../utils/heplerApi';

export const getUserData = (): Promise<AxiosResponse> => {
  return api.get(`api/v1/users/me/`, {
    headers: {
      Authorization: getLocalToken(),
    },
  });
};

export const getUserMe = (): Promise<AxiosResponse> => {
  return api.get(`api/v1/users/me/`, {
    headers: {
      Authorization: getLocalToken(),
    },
  });
};

