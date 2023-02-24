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
      employmentStatus: EMPLOYMENT_STATUS.fresher,
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
      if (!action.payload) {
        state.role = "";
        state.currentUser = initialState.currentUser;
      }
      state.isLoggedIn = action.payload;
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    setProfilePic: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        profileImage: action.payload,
      };
    },

    updateCurrentUser: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
        profile: {
          ...state.currentUser.profile,
          ...(action.payload.profile || {}),
        },
      };
    },

    addEducationRecord: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        educationRecord: [...state.currentUser.educationRecord, action.payload],
      };
    },
    updateEducationRecord: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        educationRecord: state.currentUser.educationRecord.map((education) => {
          if (education.id === action.payload.id) {
            return {
              ...education,
              ...action.payload,
            };
          }
          return education;
        }),
      };
    },
    deleteEducationRecord: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        educationRecord: state.currentUser.educationRecord.filter(
          (record) => record.id !== action.payload
        ),
      };
    },

    addLanguageRecord: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        languages: [...state.currentUser.languages, action.payload],
      };
    },
    updateLanguageRecord: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        languages: state.currentUser.languages.map((language) => {
          if (language.id === action.payload.id) {
            return {
              ...language,
              ...action.payload,
            };
          }
          return language;
        }),
      };
    },
    deleteLanguageRecord: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        languages: state.currentUser.languages.filter(
          (record) => record.id !== action.payload
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      if (!action.payload.profileImage) {
        delete action.payload.profileImage;
      }
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.role = action.payload.role;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      console.log({ payload: action.payload, error: action.error, action });
    });
  },
});
export const {
  setIsLoggedIn,
  setUserRole,
  setProfilePic,
  updateCurrentUser,
  addEducationRecord,
  updateEducationRecord,
  deleteEducationRecord,
  addLanguageRecord,
  updateLanguageRecord,
  deleteLanguageRecord,
} = authSlice.actions;
export default authSlice.reducer;
