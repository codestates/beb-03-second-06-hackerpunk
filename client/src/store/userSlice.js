import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  internalPublicKey: '',
  externalPublicKey: '',
  amount: 0,
  level: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, email, internal_pub_key, external_pub_key, amount, level } =
        action.payload;
      state.id = id;
      state.email = email;
      state.internalPublicKey = internal_pub_key;
      state.externalPublicKey = external_pub_key;
      state.amount = amount;
      state.level = level;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
