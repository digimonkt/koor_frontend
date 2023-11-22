import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileView: false,
};

export const platformSlice = createSlice({
  name: "platform",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsMobileView: (state, action) => {
      state.isMobileView = action.payload;
    },
  },
});

export const { setIsMobileView } = platformSlice.actions;
export default platformSlice.reducer;
