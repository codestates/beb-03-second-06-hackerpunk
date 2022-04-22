import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTest: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setTest } = testSlice.actions;

export default testSlice.reducer;
