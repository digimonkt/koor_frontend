import { getTenderSearchAPI } from "../../api/tender";
import { getSearchJobsAPI } from "../../api/job";
import { searchUserByRole } from "../../api/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SALARY_MAX, SALARY_MIN } from "../../utils/constants/constants";
import { USER_ROLES } from "../../utils/enum";

const initialState = {
  jobs: [],
  talents: [],
  tenders: [],
  vendors: [],
  isSearching: true,
  totalItems: 0,
  totalPages: 1,
  page: 1,
  limit: 20,
  advanceFilter: {
    country: "",
    city: "",
    jobCategory: "",
    jobSubCategory: [],
    fullTime: false,
    partTime: false,
    contract: false,
    // talent
    isAvailable: false,
    salaryMin: SALARY_MIN,
    salaryMax: SALARY_MAX,
    // tender
    deadline: null,
    budgetMin: "",
    budgetMax: "",
    sector: [],
    opportunityType: [],
    tag: [],
  },
};

export const searchJobs = createAsyncThunk(
  "search/searchJobs",
  async (data, { getState, dispatch, rejectWithValue }) => {
    const {
      search: { page, limit, advanceFilter },
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
    let res = await getSearchJobsAPI({ ...payload });
    if (res.remote === "success") {
      dispatch(setSearchTrue(false));
      return res.data;
    } else if (res.error.errors.detail === "I") {
      res = await getTenderSearchAPI({
        ...payload,
        page: 1,
      });
      if (res.remote === "success") {
        dispatch(setSearchTrue(false));
        dispatch(setJobPage(1));
        return res.data;
      } else {
        dispatch(setSearchTrue(false));
        return rejectWithValue(res.error);
      }
    } else {
      dispatch(setSearchTrue(false));
      return rejectWithValue(res.error);
    }
  },
);
export const searchTalent = createAsyncThunk(
  "search/searchTalent",
  async (data, { getState, dispatch, rejectWithValue }) => {
    const {
      search: { page, limit, advanceFilter },
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
    let res = await searchUserByRole({
      ...payload,
      role: USER_ROLES.jobSeeker,
    });
    if (res.remote === "success") {
      dispatch(setSearchTrue(false));
      return res.data;
    } else if (res.error.errors.detail === "I") {
      res = await getTenderSearchAPI({
        ...payload,
        page: 1,
      });
      if (res.remote === "success") {
        dispatch(setSearchTrue(false));
        dispatch(setJobPage(1));
        return res.data;
      } else {
        dispatch(setSearchTrue(false));
        return rejectWithValue(res.error);
      }
    } else {
      dispatch(setSearchTrue(false));
      return rejectWithValue(res.error);
    }
  },
);

export const searchTender = createAsyncThunk(
  "search/tenders",
  async (data, { getState, dispatch, rejectWithValue }) => {
    const {
      search: { page, limit, advanceFilter },
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
    let res = await getTenderSearchAPI({
      ...payload,
    });
    if (res.remote === "success") {
      dispatch(setSearchTrue(false));
      return res.data;
    } else if (res.error.errors.detail === "I") {
      res = await getTenderSearchAPI({
        ...payload,
        page: 1,
      });
      if (res.remote === "success") {
        dispatch(setSearchTrue(false));
        dispatch(setJobPage(1));
        return res.data;
      } else {
        dispatch(setSearchTrue(false));
        return rejectWithValue(res.error);
      }
    } else {
      dispatch(setSearchTrue(false));
      return rejectWithValue(res.error);
    }
  },
);

export const searchVendor = createAsyncThunk(
  "search/searchVendor",
  async (data, { getState, dispatch, rejectWithValue }) => {
    const {
      search: { page, limit, advanceFilter },
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
    let res = await searchUserByRole({
      ...payload,
      role: USER_ROLES.vendor,
    });
    if (res.remote === "success") {
      dispatch(setSearchTrue(false));
      return res.data;
    } else if (res.error.errors.detail === "I") {
      dispatch(setSearchTrue(false));
      res = await getTenderSearchAPI({
        ...payload,
        page: 1,
      });
      if (res.remote === "success") {
        dispatch(setSearchTrue(false));
        dispatch(setJobPage(1));
        return res.data;
      } else {
        dispatch(setSearchTrue(false));
        return rejectWithValue(res.error);
      }
    } else {
      dispatch(setSearchTrue(false));
      return rejectWithValue(res.error);
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setJobPage: (state, action) => {
      state.page = action.payload;
    },
    setAdvanceFilter: (state, action) => {
      state.advanceFilter = action.payload;
    },
    setSearchTrue: (state) => {
      state.isSearching = true;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    // jobs
    builder.addCase(searchJobs.pending, (state, action) => {
      state.isSearching = true;
    });
    builder.addCase(searchJobs.fulfilled, (state, action) => {
      state.isSearching = false;
      state.jobs = action.payload.results;
      state.totalItems = action.payload.count;
      const pages = Math.ceil(action.payload.count / state.limit);
      state.totalPages = pages;
    });
    builder.addCase(searchJobs.rejected, (state, action) => {
      state.isSearching = false;
    });
    // talent
    builder.addCase(searchTalent.pending, (state, action) => {
      state.isSearching = true;
    });
    builder.addCase(searchTalent.fulfilled, (state, action) => {
      state.isSearching = false;
      state.talents = action.payload.results;
      state.totalItems = action.payload.count;
      const pages = Math.ceil(action.payload.count / state.limit);
      state.totalPages = pages;
    });
    builder.addCase(searchTalent.rejected, (state, action) => {
      state.isSearching = false;
    });
    // Tender
    builder.addCase(searchTender.pending, (state, action) => {
      state.isSearching = true;
    });
    builder.addCase(searchTender.fulfilled, (state, action) => {
      state.isSearching = false;
      state.tenders = action.payload.results;
      state.totalItems = action.payload.count;
      const pages = Math.ceil(action.payload.count / state.limit);
      state.totalPages = pages;
    });
    builder.addCase(searchTender.rejected, (state, action) => {
      state.isSearching = false;
    });
    // Vendor
    builder.addCase(searchVendor.pending, (state, action) => {
      state.isSearching = true;
    });
    builder.addCase(searchVendor.fulfilled, (state, action) => {
      state.isSearching = false;
      state.vendors = action.payload.results;
      state.totalItems = action.payload.count;
      const pages = Math.ceil(action.payload.count / state.limit);
      state.totalPages = pages;
    });
    builder.addCase(searchVendor.rejected, (state, action) => {
      state.isSearching = false;
    });
  },
});
export const { setJobPage, setAdvanceFilter, setSearchTrue, setTotalItems } =
  searchSlice.actions;
export default searchSlice.reducer;
