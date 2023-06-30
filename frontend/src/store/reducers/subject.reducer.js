import { createSlice } from "@reduxjs/toolkit";
import { Subject } from "../actions";

const initialState = {
  loading: false,
  subjects: [],
  subject: {},
};

export default createSlice({
  name: "subject",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(Subject.addSubject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Subject.addSubject.fulfilled, (state, { payload }) => {
      state.subjects = [...state.subjects, payload];
      state.loading = false;
    });
    builder.addCase(Subject.addSubject.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(Subject.getSubjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Subject.getSubjects.fulfilled, (state, { payload }) => {
      state.subjects = payload;
      state.loading = false;
    });
    builder.addCase(Subject.getSubjects.rejected, (state) => {
      state.loading = false;
    });
  },
}).reducer;
