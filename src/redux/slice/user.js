import { GetUserDetailsAPI } from "@api/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EMPLOYMENT_STATUS, GENDER, ORGANIZATION_TYPE } from "@utils/enum";

/**
 * **NOTE**: Vendor is pending.
 */
const initialState = {
  isLoggedIn: false,
  role: "",
  currentUser: {
    id: "",
    email: "",
    mobileNumber: "",
    countryCode: "",
    name: "",
    profileImage: "",
    profile: {
      // common
      description: "",

      // job-seeker
      gender: GENDER.male,
      dob: "",
      employmentStatus: EMPLOYMENT_STATUS.unEmployed,
      marketInformationNotification: false,
      jobNotification: false,

      // employer
      organization_type: ORGANIZATION_TYPE.business,
      license_id: "",
      license_id_file: "",
    },
    /**
     *  {
        id: "",
        title: "",
        startDate: "",
        endDate: "",
        present: false,
        organization: "",
        description: "",
      },
     */
    educationRecord: [],
    /**
     * {
        id: "",
        title: "",
        startDate: "",
        endDate: "",
        present: false,
        organization: "",
        description: "",
      },
     */
    workExperience: [],
    /**
     * {
        id: "",
        title: "",
        filePath: "",
        createdAt: "",
      },
     */
    resume: [],
    /**
     * {
        id: "",
        language: "",
        written: LANGUAGE_PROFICIENCY.basic,
        spoken: LANGUAGE_PROFICIENCY.basic,
      },
     */
    languages: [],
    /**
     *  {
        id: "",
        skill: "ReactJS",
      },
     */
    skills: [],
  },
};

export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (data, { rejectWithValue }) => {
    const res = await GetUserDetailsAPI(data);
    if (res.remote === "success") {
      return res.data;
    } else {
      return rejectWithValue(res.error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.role = action.payload.role;
    });
  },
});
export const { setIsLoggedIn, setUserRole, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
