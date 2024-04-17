import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileView: false,
  stateBar: 0,
  appInfo: {
    // version: "",
    // name: "",
    // id: "",
    // build: "",
  },
};

export const platformSlice = createSlice({
  name: "platform",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsMobileView: (state, action) => {
      state.isMobileView = action.payload;
    },
    setAppInfo: (state, action) => {
      state.appInfo = action.payload;
    },
    setStatusBar: (state, action) => {
      state.stateBar = action.payload;
    },
  },
});

export const { setIsMobileView, setAppInfo, setStatusBar } =
  platformSlice.actions;
export default platformSlice.reducer;
