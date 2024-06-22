import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import formTabsReducer from "./features/formTabsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    formTabs: formTabsReducer,
  },
});
