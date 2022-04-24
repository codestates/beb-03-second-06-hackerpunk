import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  internalpublicKey: '',
  externalPublicKey: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
