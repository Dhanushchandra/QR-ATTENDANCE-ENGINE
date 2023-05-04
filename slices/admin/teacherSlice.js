import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [],
};

const teacherSlice = createSlice({
  name: "adminTeacher",
  initialState,
  reducers: {
    setAllTeachers: (state, action) => {
      state.teachers = action.payload;
    },
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
    updateTeacherState: (state, action) => {
      const index = state.teachers.findIndex(
        (teacher) => teacher.id === action.payload.id
      );
      state.teachers[index] = action.payload;
    },
    deleteTeacherState: (state, action) => {
      const teacherId = action.payload.id; // get the teacher id from the action payload
      state.teachers = state.teachers.filter(
        (teacher) => teacher.id !== teacherId // filter out the teacher with the matching id
      );
    },
  },
});

export const {
  setAllTeachers,
  addTeacher,
  updateTeacherState,
  deleteTeacherState,
} = teacherSlice.actions;

export default teacherSlice.reducer;
