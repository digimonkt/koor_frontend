import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/user";
import ChoiceReducer from "./slice/choices";
import EmployerReducer from "./slice/employer";
import ToastReducer from "./slice/toast";
import JobReducer from "./slice/search";
import FaqReducer from "./slice/faq";
import AdSenseReducer from "./slice/adSense";
import PlatformReducer from "./slice/platform";
const isProd = process.env.NODE_ENV === "production";
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["auth/updateCurrentUser"],
      },
    }),
  reducer: {
    auth: AuthReducer,
    choices: ChoiceReducer,
    employer: EmployerReducer,
    toast: ToastReducer,
    search: JobReducer,
    faq: FaqReducer,
    adSense: AdSenseReducer,
    platform: PlatformReducer,
  },
  devTools: !isProd,
});
