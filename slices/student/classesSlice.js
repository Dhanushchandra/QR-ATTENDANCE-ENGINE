const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  classes: [],
};

const classesSlice = createSlice({
  name: "studentClasses",
  initialState,
  reducers: {
    setClassesState: (state, action) => {
      state.classes = action.payload.classes;
    },
  },
});

export const { setClassesState } = classesSlice.actions;

export default classesSlice.reducer;
