import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

import authReducer from "./slices/admin/authSlice";
import teacherReducer from "./slices/admin/teacherSlice";
import studentReducer from "./slices/admin/studentSlice";

const persistAuthConfig = {
  key: "adminAuth",
  storage,
  whitelist: [
    "id",
    "user",
    "email",
    "organization",
    "role",
    "token",
    "isAuthenticated",
  ],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

const store = configureStore({
  reducer: {
    adminAuth: persistedAuthReducer,
    adminTeacher: teacherReducer,
    adminStudent: studentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistedStore = persistStore(store);

export { store, persistedStore };
