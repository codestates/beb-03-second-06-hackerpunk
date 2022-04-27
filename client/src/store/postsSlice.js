import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: 0,
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
    setSelected: (state, action) => {
      const selected = action.payload;

      state.selected = selected;
    },
  },
});

export const { setPosts, setSelected } = postsSlice.actions;

export default postsSlice.reducer;
