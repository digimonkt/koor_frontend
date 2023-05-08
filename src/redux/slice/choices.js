import {
  getCitiesAPI,
  getCountriesAPI,
  getEducationLevelsAPI,
  getJobCategoriesAPI,
  getJobSubCategoriesAPI,
  getLanguagesAPI,
  getSkillsAPI,
  getSectorsAPI,
  getTagsAPI,
} from "@api/choices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  /**
   countries: [{
      id: string,
      title: string,
      currencyCode: string,
      countryCode: string,
      iso2: string,
      iso3: string
    }]
   */
  countries: {
    loading: false,
    data: [],
  },
  /**
    cities: {
      [countryId]: [{
        id: string,
        title: string,
      }] // city list
    }
   */
  cities: {
    loading: false,
    data: {},
  },
  /**
    jobCategories: [{
        id: string,
        title: string,
    }]
   */
  jobCategories: {
    loading: false,
    data: [],
  },
  jobSubCategories: {
    loading: false,
    data: [],
  },

  /**
    sectors : [{
      id: string,
      title: string,
    }]
   */

  sectors: {
    loading: false,
    data: [],
  },

  /**
    tags : [{
      id: string,
      title: string,
    }]
   */

  tags: {
    loading: false,
    data: [],
  },
  /**
    educationLevels: [{
      id: string,
      title: string,
    }]
   */
  educationLevels: {
    loading: false,
    data: [],
  },
  /**
    languages: [{
      id: string,
      title: string,
    }]
   */
  languages: {
    loading: false,
    data: [],
  },
  /**
    skills: [{
      id: string,
      title: string,
    }]
   */
  skills: {
    loading: false,
    data: [],
  },
};

export const getCountries = createAsyncThunk(
  "choices/getCountries",
  async (_, { rejectWithValue }) => {
    const res = await getCountriesAPI();
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const getTags = createAsyncThunk(
  "choices/getTags",
  async (_, { rejectWithValue }) => {
    const res = await getTagsAPI();
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const getCities = createAsyncThunk(
  "choices/getCities",
  async (data, { rejectWithValue }) => {
    const res = await getCitiesAPI(data);
    if (res.remote === "success") {
      return {
        countryId: data.countryId,
        data: res.data,
      };
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const getJobCategories = createAsyncThunk(
  "choices/getJobCategories",
  async (_, { rejectWithValue }) => {
    const res = await getJobCategoriesAPI();
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const getJobSubCategories = createAsyncThunk(
  "choices/getJobSubCategories",
  async (data, { rejectWithValue }) => {
    const res = await getJobSubCategoriesAPI(data);
    if (res.remote === "success") {
      return {
        categoryId: data.categoryId,
        data: res.data,
      };
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const getEducationLevels = createAsyncThunk(
  "choices/getEducationLevels",
  async (_, { rejectWithValue }) => {
    const res = await getEducationLevelsAPI();
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const getLanguages = createAsyncThunk(
  "choices/getLanguages",
  async (_, { rejectWithValue }) => {
    const res = await getLanguagesAPI();
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const getSkills = createAsyncThunk(
  "choices/skills",
  async (data, { rejectWithValue }) => {
    const res = await getSkillsAPI(data);
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const getSectors = createAsyncThunk(
  "choices/getSectors",
  async (data, { rejectWithValue }) => {
    const res = await getSectorsAPI(data);
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const choiceSlice = createSlice({
  name: "choice",
  initialState,
  reducers: {
    resetSkillList: (state, action) => {
      state.skills = initialState.skills;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getCountries.pending, (state) => {
      state.countries = {
        loading: true,
        data: [],
      };
    });
    builder.addCase(getCountries.rejected, (state) => {
      state.countries = {
        ...state.countries,
        loading: false,
      };
    });
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.cities = {
        loading: false,
        data: {
          ...(state.cities.data || {}),
          [action.payload.countryId]: action.payload.data,
        },
      };
    });
    builder.addCase(getCities.pending, (state) => {
      state.cities = {
        ...state.cities,
        loading: true,
      };
    });
    builder.addCase(getCities.rejected, (state) => {
      state.cities = {
        ...state.cities,
        loading: false,
      };
    });
    builder.addCase(getJobCategories.fulfilled, (state, action) => {
      state.jobCategories = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getJobCategories.pending, (state) => {
      state.jobCategories = {
        ...state.jobCategories,
        loading: true,
      };
    });
    builder.addCase(getJobCategories.rejected, (state) => {
      state.jobCategories = {
        ...state.jobCategories,
        loading: false,
      };
    });
    builder.addCase(getJobSubCategories.fulfilled, (state, action) => {
      state.jobSubCategories = {
        loading: false,
        data: {
          ...(state.jobSubCategories.data || {}),
          [action.payload.categoryId]: action.payload.data,
        },
      };
    });
    builder.addCase(getJobSubCategories.pending, (state) => {
      state.jobSubCategories = {
        ...state.jobSubCategories,
        loading: true,
      };
    });
    builder.addCase(getJobSubCategories.rejected, (state) => {
      state.jobSubCategories = {
        ...state.jobSubCategories,
        loading: false,
      };
    });
    builder.addCase(getEducationLevels.fulfilled, (state, action) => {
      state.educationLevels = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getEducationLevels.pending, (state) => {
      state.educationLevels = {
        ...state.educationLevels,
        loading: true,
      };
    });
    builder.addCase(getEducationLevels.rejected, (state) => {
      state.educationLevels = {
        ...state.educationLevels,
        loading: false,
      };
    });
    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.languages = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getLanguages.pending, (state) => {
      state.languages = {
        ...state.languages,
        loading: true,
      };
    });
    builder.addCase(getLanguages.rejected, (state) => {
      state.languages = {
        ...state.languages,
        loading: false,
      };
    });
    builder.addCase(getSkills.fulfilled, (state, action) => {
      state.skills = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getSkills.pending, (state) => {
      state.skills = {
        ...state.skills,
        loading: true,
        data: [],
      };
    });
    builder.addCase(getSkills.rejected, (state) => {
      state.skills = {
        ...state.skills,
        loading: false,
      };
    });

    builder.addCase(getSectors.fulfilled, (state, action) => {
      state.sectors = {
        loading: false,
        data: action.payload,
      };
    });

    builder.addCase(getSectors.pending, (state) => {
      state.sectors = {
        ...state.sectors,
        loading: true,
      };
    });

    builder.addCase(getSectors.rejected, (state) => {
      state.sectors = {
        ...state.sectors,
        loading: false,
      };
    });

    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = {
        loading: false,
        data: action.payload,
      };
    });

    builder.addCase(getTags.pending, (state) => {
      state.tags = {
        ...state.sectors,
        loading: true,
      };
    });

    builder.addCase(getTags.rejected, (state) => {
      state.tags = {
        ...state.sectors,
        loading: false,
      };
    });
  },
});

export default choiceSlice.reducer;
