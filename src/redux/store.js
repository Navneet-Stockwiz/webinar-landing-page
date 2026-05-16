import { configureStore } from "@reduxjs/toolkit";
import dateRangeResucer from "./slices/dateRangeSlice";
import pageTitleReducer from "./slices/pageTitleSlice";

const store = configureStore({
  reducer: {
    dateRangeResucer: dateRangeResucer,
    pageTitle: pageTitleReducer,
  },
});

export default store;
