import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  university: "",
  department: "",
  srn: "",
  token: "",
  role: "",
};

const authSlice = createSlice({
  name: "studentAuth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.university = action.payload.university;
      state.department = action.payload.department;
      state.srn = action.payload.srn;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
