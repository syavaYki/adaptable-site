import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { accessLocalStorage } from '../utils/accessLocalStorage';
import { LocalAccessKeys } from '../types/LocalAccessKeys';
import { userLogout } from '../api/auth';

const initialValue = {
  loggedIn: accessLocalStorage.get(LocalAccessKeys.LOGGEDIN),
};

const logout = createAsyncThunk('auth/logout', async () => {
  const response = await userLogout();

  return response;
});

const AuthSlice = createSlice({
  name: 'auth',
  initialState: initialValue,
  reducers: {
    init: state => {
      state.loggedIn = accessLocalStorage.get(LocalAccessKeys.LOGGEDIN);
    },

    login: (state, action: { payload: string }) => {
      if (action.payload) {
        state.loggedIn = action.payload;
        accessLocalStorage.set(LocalAccessKeys.LOGGEDIN, action.payload);
      }
    },
  },
  extraReducers: builder => {
    builder

      .addCase(logout.pending, state => {
        state.loggedIn = undefined;
        accessLocalStorage.clearKey(LocalAccessKeys.LOGGEDIN);
      })

      .addCase(logout.fulfilled, state => {
        state.loggedIn = undefined;
        accessLocalStorage.clearKey(LocalAccessKeys.LOGGEDIN);
      })

      .addCase(logout.rejected, (state, action) => {
        console.error(action.error.message || 'Failed to logout.');
      });
  },
});

export default AuthSlice.reducer;
export const { actions } = AuthSlice;
export { logout };
