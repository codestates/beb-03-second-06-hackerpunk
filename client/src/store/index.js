import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import postsReducer from "./postsSlice";

export { setUser } from "./userSlice";
export { setPosts } from "./postsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});
