import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: 0, // === -1 writing, === 0 no selected(all visible), > 0 selected
  prevSelected: 0,
  contents: [],
  currentContentId: 0,
  currentContentBody: "",
  currentDonationAmount: 0,
  lastArticleId: 0,
  writingTitle: "",
  writingContent: "",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      const contents = action.payload;
      if (
        Array.isArray(contents) === false ||
        contents.length < 1 ||
        typeof contents[0].article_id !== "number"
      )
        throw new Error(`Invalid Aticle`);

      state.contents = contents;
      state.lastArticleId = contents[contents.length - 1].article_id;
    },
    deletePost: (state, action) => {
      let selected = action.payload;
      if (typeof selected !== "number" || selected < 1)
        throw new Error(`Invalid Aticle`);

      selected--;
      state.contents = state.contents.filter((_, idx) => idx !== selected);
    },
    setSelected: (state, action) => {
      const selected = action.payload;
      state.prevSelected = state.selected;
      state.selected = selected;
      if (selected > 0) {
        state.currentContentId = state.contents[selected - 1].article_id;
      }
      if (selected === 0) state.currentContentBody = "";
    },
    setWriting: (state, action) => {
      const { title, content } = action.payload;
      if (content !== undefined) state.writingContent = content;
      if (title !== undefined) state.writingTitle = title;
    },
    setCurrentContentId: (state, action) => {
      const id = action.payload;
      if (typeof id === "number") state.currentContentId = id;
    },
    setCurrentDonationAmount: (state, action) => {
      const id = action.payload;
      if (typeof id === "number") state.currentDonationAmount = id;
    },
    setCurrentContentBody: (state, action) => {
      const body = action.payload;
      if (typeof body === "string") state.currentContentBody = body;
    },
  },
});

export const {
  setPosts,
  setSelected,
  setWriting,
  deletePost,
  setCurrentContentId,
  setCurrentContentBody,
  setCurrentDonationAmount,
} = postsSlice.actions;

export default postsSlice.reducer;
