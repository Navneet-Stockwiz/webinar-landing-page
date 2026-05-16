// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import dateRangeResucer from "./slices/dateRangeSlice";

const store = configureStore({
  reducer: {
    dateRangeResucer: dateRangeResucer,
  },
});

export default store;
