import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EMPLOYMENT_STATUS, GENDER, ORGANIZATION_TYPE } from "@utils/enum";
import { USER_ROLES } from "./../../utils/enum";

/**
 * **NOTE**: Vendor is pending.
 */
const initialState = {
  isLoggedIn: false,
  role: USER_ROLES.vendor,
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
      employment_status: EMPLOYMENT_STATUS.unEmployed,
      market_information: false,
      job_notification: false,

      // employer
      organization_name: "",
      organization_type: ORGANIZATION_TYPE.business,
      license_id: "",
      license_id_file: "",
    },
    /**
     *  {
        id: "",
        title: "",
        start_date: "",
        end_date: "",
        present: false,
        organization: "",
        description: "",
      },
     */
    education_record: [],
    /**
     * {
        id: "",
        title: "",
        start_date: "",
        end_date: "",
        present: false,
        organization: "",
        description: "",
      },
     */
    work_experience: [],
    /**
     * {
        id: "",
        title: "",
        file_path: "",
        created_at: "",
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

const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (_, { rejectWithValue }) => {}
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
    });
  },
});
export const { setIsLoggedIn, setUserRole, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
