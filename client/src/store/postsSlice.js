import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contents: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      const contents = action.payload;

      state.contents = contents;
    },
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
