import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

import authReducer from "./slices/admin/authSlice";

const persistAuthConfig = {
  key: "auth",
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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistedStore = persistStore(store);

export { store, persistedStore };
