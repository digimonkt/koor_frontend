import { createSlice } from "@reduxjs/toolkit";
import { USER_ROLES } from "src/utils/enum";

const initialState = {
  isLoggedIn: false,
  role: USER_ROLES.employer,
  currentUser: {
    profileImage: "",
    mobileNumber: "",
    email: "",
    name: "",
    jobLetterApplicationNotification: false,
    newsLetterApplicationNotification: false,
  },
};

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
});
export const { setIsLoggedIn, setUserRole, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
