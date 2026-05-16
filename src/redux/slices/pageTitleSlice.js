import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Algo Terminal",
};

const pageTitleSlice = createSlice({
  name: "pageTitle",
  initialState,
  reducers: {
    setPageTitle: (state, action) => {
      state.title = action.payload;
    },
    resetPageTitle: (state) => {
      state.title = initialState.title;
    },
  },
});

export const { setPageTitle, resetPageTitle } = pageTitleSlice.actions;
export default pageTitleSlice.reducer;
