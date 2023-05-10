import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: [],
  refresh: false,
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    setRefreshState: (state, action) => {
      state.refresh = action.payload;
    },
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    addClass: (state, action) => {
      state.classes.push(action.payload);
    },
    updateClassState: (state, action) => {
      const { id, name } = action.payload;
      const index = state.classes.findIndex((c) => c.id === id);
      state.classes[index].name = name;
    },
    deleteClassState: (state, action) => {
      const { id } = action.payload;
      const index = state.classes.findIndex((c) => c.id === id);
      state.classes.splice(index, 1);
    },
    setStudentsState: (state, action) => {
      const { id, students } = action.payload;
      const index = state.classes.findIndex((c) => c.id === id);
      state.classes[index].students = students;
    },
    addStudentState: (state, action) => {
      const { id, student } = action.payload;
      const index = state.classes.findIndex((c) => c.id === id);
      state.classes[index].students.push(student);
    },
    removeStudentState: (state, action) => {
      const { id, sid } = action.payload;
      const index = state.classes.findIndex((c) => c.id === id);
      const studentIndex = state.classes[index].students.findIndex(
        (s) => s.id === sid
      );
      state.classes[index].students.splice(studentIndex, 1);
    },
  },
});

export const {
  setRefreshState,
  setClasses,
  addClass,
  updateClassState,
  deleteClassState,
  setStudentsState,
  addStudentState,
  removeStudentState,
} = classesSlice.actions;

export default classesSlice.reducer;
