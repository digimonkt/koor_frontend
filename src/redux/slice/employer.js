import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCreatedJobs: 0,
  totalApplications: 0,
  totalTender: 0,
  totalBlacklist: 0,
  totalTenderApplications: 0,
  totalApplicationsByJob: [],
  totalApplicationsByTender: [],
  jobPostUpdate: false,
  totalAvailableCredits: 0,
  minimumCreditJobPost: 10,
  manageJobActiveTab: 0,
  jobSeekerJobApplication: [],
  vendorTenderApplication: [],
  tabsStep: 0,
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
    setManageJobActiveTab: (state, action) => {
      state.manageJobActiveTab = action.payload;
    },
    setTotalApplicationsByJob: (state, action) => {
      state.totalApplicationsByJob = {
        loading: true,
        data: {
          ...(state.totalApplicationsByJob.data || {}),
          [action.payload.jobId]: action.payload.data,
        },
      };
    },
    setTotalApplicationsByTender: (state, action) => {
      state.totalApplicationsByTender = {
        loading: true,
        data: {
          ...(state.totalApplicationsByTender.data || {}),
          [action.payload.tenderId]: action.payload.data,
        },
      };
    },
    setJobPostUpdate: (state, action) => {
      state.jobPostUpdate = action.payload;
    },
    setTotalAvailableCredits: (state, action) => {
      state.totalAvailableCredits = action.payload;
    },
    setMinimumCreditJobPost: (state, action) => {
      state.minimumCreditJobPost = action.payload;
    },
    setJobSeekerJobApplication: (state, action) => {
      state.jobSeekerJobApplication = action.payload;
    },
    setVendorTenderApplication: (state, action) => {
      state.vendorTenderApplication = action.payload;
    },
    setEmployerTabsSteps: (state, action) => {
      state.tabsStep = action.payload;
    },
  },
});
export const {
  setTotalCreatedJobs,
  setTotalApplications,
  setTotalTenders,
  setTotalBlacklist,
  setTotalTenderApplications,
  setTotalApplicationsByJob,
  setTotalApplicationsByTender,
  setJobPostUpdate,
  setTotalAvailableCredits,
  setMinimumCreditJobPost,
  setJobSeekerJobApplication,
  setManageJobActiveTab,
  setVendorTenderApplication,
  setEmployerTabsSteps,
} = employerSlice.actions;
export default employerSlice.reducer;
