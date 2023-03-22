import { createSlice } from "@reduxjs/toolkit";

/**
 * **NOTE**: Vendor is pending.
 */
const initialState = {
  totalCreatedJobs: 0,
  totalApplications: 0,
};

export const employerSlice = createSlice({
  name: "employer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTotalCreatedJobs: (state, action) => {
      state.totalCreatedJobs = action.payload;
    },
    setTotalApplications: (state, action) => {
      state.totalApplications = action.payload;
    },
  },
});
export const { setTotalCreatedJobs, setTotalApplications } =
  employerSlice.actions;
export default employerSlice.reducer;
