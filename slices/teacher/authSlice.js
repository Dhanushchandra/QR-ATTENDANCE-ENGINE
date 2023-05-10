import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  user: "",
  email: "",
  organization: "",
  phone: "",
  department: "",
  role: "",
  token: "",
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "teacherAuth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.id = action.payload.id;
      state.user = action.payload.user;
      state.email = action.payload.email;
      state.organization = action.payload.organization;
      state.department = action.payload.department;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
