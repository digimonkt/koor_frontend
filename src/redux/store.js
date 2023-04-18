import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/user";
import ChoiceReducer from "./slice/choices";
import EmployerReducer from "./slice/employer";
import ToastReducer from "./slice/toast";
import JobReducer from "./slice/search";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    choices: ChoiceReducer,
    employer: EmployerReducer,
    toast: ToastReducer,
    search: JobReducer,
  },
});
