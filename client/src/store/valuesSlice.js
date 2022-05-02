import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "none",
  writingTitle: "",
  writingContent: "",
  editingTitle: "",
  editingContent: "",
  waitingAPI: false,
  donating: {},
};

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
