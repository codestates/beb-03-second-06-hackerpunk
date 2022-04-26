import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  internalpublicKey: '',
  externalPublicKey: '',
  amount: 0,
  level: 0,
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
