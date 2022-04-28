import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: 0, // === -1 writing, === 0 no selected(all visible), > 0 selected
  contents: [],
  writingTitle: "",
  writingContent: "",
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
    setWriting: (state, action) => {
      const { title, content } = action.payload;
      if (content !== undefined) state.writingContent = content;
      if (title !== undefined) state.writingTitle = title;
    },
  },
});

export const { setPosts, setSelected, setWriting } = postsSlice.actions;

export default postsSlice.reducer;
