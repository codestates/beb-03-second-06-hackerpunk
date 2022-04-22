import { configureStore } from '@reduxjs/toolkit';

import testReducer from './testSlice';

export { setTest } from './testSlice';

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
});
