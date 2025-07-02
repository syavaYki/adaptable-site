import { LocalAccessKeys } from '../types/LocalAccessKeys';

export const accessLocalStorage = {
  get(key: LocalAccessKeys) {
    const data = localStorage.getItem(key);

    try {
      return data ? JSON.parse(data) : undefined;
    } catch {
      return undefined;
    }
  },

  set(key: LocalAccessKeys, data: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(data));

      return this.get(key);
    } catch {
      return undefined;
    }
  },

  clearKey(key: LocalAccessKeys) {
    localStorage.removeItem(key);
  },
};
