import { GetUserDetailsAPI } from "@api/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EMPLOYMENT_STATUS, GENDER } from "@utils/enum";

/**
 * **NOTE**: Vendor is pending.
 */
const initialState = {
  isGlobalLoading: false,
  isLoggedIn: false,
  isHomePage: false,
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
      organizationType: {},
      licenseId: "",
      licenseIdFile: "",

      // vendor
      operatingYears: "",
      jobsExperience: "",
      certificationNumber: "",
      registrationNumber: "",
      registrationCertificate: "",
    },
    jobPreferences: {
      id: "",
      isAvailable: false,
      displayInSearch: false,
      isPartTime: false,
      isFullTime: false,
      hasContract: false,
      expectedSalary: 0,
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
    workExperiences: [],
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
  currentLocation: {
    countryCode: "",
    countryName: "",
  },
  // here that email is come on which mail is sent
  verifyEmail: "",
};

export const getUserDetails = createAsyncThunk(
  "users/getUserDetails",
  async (data, { getState, rejectWithValue }) => {
    const {
      auth: { currentUser },
    } = getState();
    if (currentUser.id) {
      return { ...currentUser };
    }
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
    setVerifyEmail: (state, action) => {
      state.verifyEmail = action.payload;
    },
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
        jobPreferences: {
          ...state.currentUser.jobPreferences,
          ...(action.payload.jobPreferences || {}),
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

    addWorkExperienceRecord: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        workExperiences: [...state.currentUser.workExperiences, action.payload],
      };
    },
    updateWorkExperienceRecord: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        workExperiences: state.currentUser.workExperiences.map(
          (workExperience) => {
            if (workExperience.id === action.payload.id) {
              return {
                ...workExperience,
                ...action.payload,
              };
            }
            return workExperience;
          }
        ),
      };
    },
    deleteWorkExperienceRecord: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        workExperiences: state.currentUser.workExperiences.filter(
          (record) => record.id !== action.payload
        ),
      };
    },
    setIstHomePage: (state, action) => {
      state.isHomePage = action.payload;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state, action) => {
      state.isGlobalLoading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.isGlobalLoading = false;
      if (!action.payload.profileImage) {
        delete action.payload.profileImage;
      }
      state.currentUser = { ...state.currentUser, ...action.payload };
      state.role = action.payload.role;
      state.isLoggedIn = true;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isGlobalLoading = false;
    });
  },
});
export const {
  setIstHomePage,
  setVerifyEmail,
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
  addWorkExperienceRecord,
  updateWorkExperienceRecord,
  deleteWorkExperienceRecord,
  setCurrentLocation,
} = authSlice.actions;
export default authSlice.reducer;
