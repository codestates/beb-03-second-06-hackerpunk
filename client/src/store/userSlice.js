import { createSlice } from "@reduxjs/toolkit";
import { setToken } from "../common";

const initialState = {
  id: "",
  email: "",
  internal_pub_key: "",
  external_pub_key: "",
  amount: 0,
  level: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { access_token, ...userData } = action.payload;

      setToken(access_token);
      Object.assign(state, userData);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
