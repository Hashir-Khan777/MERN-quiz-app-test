import { createSlice } from "@reduxjs/toolkit";
import { Question } from "../actions";

const initialState = {
  loading: false,
  questions: [],
};

export default createSlice({
  name: "question",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(Question.addQueston.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Question.addQueston.fulfilled, (state, { payload }) => {
      state.questions = [...state.questions, payload];
      state.loading = false;
    });
    builder.addCase(Question.addQueston.rejected, (state) => {
      state.loading = false;
    });
  },
}).reducer;
