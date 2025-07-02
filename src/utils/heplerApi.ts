import { LocalAccessKeys } from '../types/LocalAccessKeys';
import { accessLocalStorage } from './accessLocalStorage';

export const getLocalToken = () => {
  return `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`;
};
