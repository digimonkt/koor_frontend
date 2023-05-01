import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/user";
import ChoiceReducer from "./slice/choices";
import EmployerReducer from "./slice/employer";
import ToastReducer from "./slice/toast";
import JobReducer from "./slice/search";
import logger from "redux-logger";
const isProd = process.env.NODE_ENV === "production";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    choices: ChoiceReducer,
    employer: EmployerReducer,
    toast: ToastReducer,
    search: JobReducer,
  },
  devTools: !isProd,
  middleware: (getDefaultMiddleware) => {
    if (!isProd) {
      return getDefaultMiddleware().concat(logger);
    } else {
      return getDefaultMiddleware();
    }
  },
});
