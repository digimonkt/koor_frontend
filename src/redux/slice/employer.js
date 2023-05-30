import { createSlice } from "@reduxjs/toolkit";

/**
 * **NOTE**: Vendor is pending.
 */
const initialState = {
  totalCreatedJobs: 0,
  totalApplications: 0,
  totalTender: 0,
<<<<<<< HEAD
=======
  totalBlacklist: 0,
  totalTenderApplications: 0,
>>>>>>> a22fb17987cacc5ad6ce8a2bcf83e4672ae45b4d
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
<<<<<<< HEAD
  },
});
export const { setTotalCreatedJobs, setTotalApplications, setTotalTenders } =
  employerSlice.actions;
=======
    setTotalBlacklist: (state, action) => {
      state.totalBlacklist = action.payload;
    },
    setTotalTenderApplications: (state, action) => {
      state.totalTenderApplications = action.payload;
    },
  },
});
export const {
  setTotalCreatedJobs,
  setTotalApplications,
  setTotalTenders,
  setTotalBlacklist,
  setTotalTenderApplications,
} = employerSlice.actions;
>>>>>>> a22fb17987cacc5ad6ce8a2bcf83e4672ae45b4d
export default employerSlice.reducer;
