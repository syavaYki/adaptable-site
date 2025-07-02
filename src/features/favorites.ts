import { createSlice } from '@reduxjs/toolkit';
import { accessLocalStorage } from '../utils/accessLocalStorage';
import { LocalAccessKeys } from '../types/LocalAccessKeys';

type Initial = {
  favorites: number[];
  loading: boolean;
  error: string;
};

const initialValue: Initial = {
  favorites: [],
  loading: false,
  error: '',
};

const FavoritesSlice = createSlice({
  name: 'favorite',
  initialState: initialValue,
  reducers: {
    init: state => {
      const localFavs = accessLocalStorage.get(LocalAccessKeys.FAVORITES);

      if (localFavs && Array.isArray(localFavs)) {
        state.favorites = localFavs;
      } else {
        accessLocalStorage.set(LocalAccessKeys.FAVORITES, []);
        state.favorites = [];
      }
    },

    toggle: (state, action: { payload: number }) => {
      let currentFavs = state.favorites;
      const newId = action.payload;

      if (currentFavs.includes(newId)) {
        currentFavs = currentFavs.filter(id => id !== newId);
      } else {
        currentFavs.push(newId);
      }
      accessLocalStorage.set(LocalAccessKeys.FAVORITES, currentFavs);
      state.favorites = currentFavs;
    },

    clear: state => {
      state.favorites = [];
      accessLocalStorage.clearKey(LocalAccessKeys.FAVORITES);
    },

    set: (state, action: { payload: number[] }) => {
      state.favorites = action.payload;
      accessLocalStorage.set(LocalAccessKeys.FAVORITES, action.payload);
    },
  },
});

export default FavoritesSlice.reducer;
export const { init, toggle, clear, set } = FavoritesSlice.actions;
