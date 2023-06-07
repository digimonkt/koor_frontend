import { createSlice } from "@reduxjs/toolkit";

/**
 * **NOTE**: Vendor is pending.
 */
const initialState = {
  totalCreatedJobs: 0,
  totalApplications: 0,
  totalTender: 0,
  totalBlacklist: 0,
  totalTenderApplications: 0,
  totalApplicationsByJob: [],
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
    setTotalTenders: (state, action) => {
      state.totalTender = action.payload;
    },
    setTotalBlacklist: (state, action) => {
      state.totalBlacklist = action.payload;
    },
    setTotalTenderApplications: (state, action) => {
      state.totalTenderApplications = action.payload;
    },
    setTotalApplicationsByJob: (state, action) => {
      state.totalApplicationsByJob = {
        loading: true,
        data: {
          ...(state.totalApplicationsByJob.data || {}),
          [action.payload.jobId]: action.payload.data,
        }
      };
    },
  },
});
export const {
  setTotalCreatedJobs,
  setTotalApplications,
  setTotalTenders,
  setTotalBlacklist,
  setTotalTenderApplications,
  setTotalApplicationsByJob
} = employerSlice.actions;
export default employerSlice.reducer;
