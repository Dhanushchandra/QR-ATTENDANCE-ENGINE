import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

import authReducer from "./slices/admin/authSlice";
import teacherReducer from "./slices/admin/teacherSlice";
import studentReducer from "./slices/admin/studentSlice";

import teacherAuthReducer from "./slices/teacher/authSlice";
import classesReducer from "./slices/teacher/classesSlice";

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

const persistTeacherAuthConfig = {
  key: "teacherAuth",
  storage,
  whitelist: [
    "id",
    "user",
    "email",
    "organization",
    "department",
    "phone",
    "role",
    "token",
    "isAuthenticated",
  ],
};

const persistTeacherClassesConfig = {
  key: "teacherClasses",
  storage,
  whitelist: ["classes"],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedTeacherAuthReducer = persistReducer(
  persistTeacherAuthConfig,
  teacherAuthReducer
);
const persistedTeacherClassesReducer = persistReducer(
  persistTeacherClassesConfig,
  classesReducer
);

const store = configureStore({
  reducer: {
    adminAuth: persistedAuthReducer,
    adminTeacher: teacherReducer,
    adminStudent: studentReducer,
    teacherAuth: persistedTeacherAuthReducer,
    teacherClasses: persistedTeacherClassesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistedStore = persistStore(store);

export { store, persistedStore };
