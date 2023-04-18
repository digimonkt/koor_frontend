import { getSearchJobsAPI } from "@api/job";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  talent: [],
  isSearching: true,
  totalItems: 0,
  totalPages: 1,
  page: 1,
  limit: 10,
  advanceFilter: {
    country: "",
    city: "",
    jobCategory: "",
    fullTime: false,
    partTime: false,
    contract: false,
  },
};

export const searchJobs = createAsyncThunk(
  "jobs/searchJobs",
  async (data, { getState, rejectWithValue }) => {
    const {
      jobs: { page, limit, advanceFilter },
    } = getState();
    const payload = {
      page,
      limit,
      ...advanceFilter,
      ...data,
    };
    for (const key in payload) {
      if (!payload[key]) {
        delete payload[key];
      }
    }
    const res = await getSearchJobsAPI({ ...payload });
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobPage: (state, action) => {
      state.page = action.payload;
    },
    setAdvanceFilter: (state, action) => {
      state.advanceFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchJobs.pending, (state, action) => {
      state.isSearching = true;
    });
    builder.addCase(searchJobs.fulfilled, (state, action) => {
      state.isSearching = false;
      state.jobs = action.payload.results;
      state.totalJobs = action.payload.count;
      const pages = Math.ceil(action.payload.count / state.limit);
      state.totalPages = pages;
    });
    builder.addCase(searchJobs.rejected, (state, action) => {
      state.isSearching = false;
    });
  },
});
export const { setJobPage, setAdvanceFilter } = jobsSlice.actions;
export default jobsSlice.reducer;
