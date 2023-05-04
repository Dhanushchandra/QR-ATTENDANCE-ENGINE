import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
};

const studentSlice = createSlice({
  name: "adminStudent",
  initialState,
  reducers: {
    setAllStudents: (state, action) => {
      state.students = action.payload;
    },
  },
});

export const { setAllStudents } = studentSlice.actions;

export default studentSlice.reducer;
