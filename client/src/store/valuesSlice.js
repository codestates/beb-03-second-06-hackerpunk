import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const valuesSlice = createSlice({
  name: "values",
  initialState,
  reducers: {
    addValues: (state, action) => {
      const values = action.payload;

      Object.assign(state, values);
    },
  },
});

export const { addValues } = valuesSlice.actions;

export default valuesSlice.reducer;
