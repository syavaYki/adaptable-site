/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  visible: boolean;
};

const initialValue: InitialState = {
  visible: false,
};

const mobilMenueVisibleSlice = createSlice({
  name: 'mobilMenueVisible',
  initialState: initialValue,
  reducers: {
    toggle: state => {
      state.visible = !state.visible;
    },

    setMenuVisibility: (state, visibility: PayloadAction<boolean>) => {
      state.visible = visibility.payload;
    },
  },
});

export default mobilMenueVisibleSlice.reducer;
export const { actions } = mobilMenueVisibleSlice;
