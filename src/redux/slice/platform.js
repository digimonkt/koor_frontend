import { createSlice } from "@reduxjs/toolkit";
import { NATIVE_PLATFORM } from "@utils/constants/constants";

const initialState = {
  isMobileView: false,
  platform: NATIVE_PLATFORM || undefined,
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
