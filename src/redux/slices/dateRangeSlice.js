import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fromDate: "",
  toDate: "",
};

const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.fromDate = action.payload.fromDate;
      state.toDate = action.payload.toDate;
    },
  },
});

export const { setDateRange } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
