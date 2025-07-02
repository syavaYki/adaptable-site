import { configureStore } from '@reduxjs/toolkit';
import mobilMenueVisibleSlice from '../features/mobilMenu';
import AuthSlice from '../features/authentication';
import PetSlice from '../features/pets';
import FavoritesSlice from '../features/favorites';

const store = configureStore({
  reducer: {
    menuVisible: mobilMenueVisibleSlice,
    auth: AuthSlice,
    pet: PetSlice,
    favorite: FavoritesSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
