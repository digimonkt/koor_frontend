import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileView: false,
  version: "v1.0.0",
};

export const platformSlice = createSlice({
  name: "platform",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsMobileView: (state, action) => {
      state.isMobileView = action.payload;
    },
    setAppVersion: (state, action) => {
      state.version = action.payload;
    },
  },
});

export const { setIsMobileView, setAppVersion } = platformSlice.actions;
export default platformSlice.reducer;
