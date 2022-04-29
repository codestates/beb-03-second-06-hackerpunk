import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import postsReducer from "./postsSlice";
import valuesReducer from "./valuesSlice";

export * from "./userSlice";
export * from "./postsSlice";
export * from "./valuesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    values: valuesReducer,
  },
});
