import { createSlice } from "@reduxjs/toolkit";
import { Result } from "../actions";

const initialState = {
  loading: false,
  results: [],
  result: {},
};

export default createSlice({
  name: "subject",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(Result.addResult.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Result.addResult.fulfilled, (state, { payload }) => {
      state.results = [...state.results, payload];
      state.result = payload;
      state.loading = false;
    });
    builder.addCase(Result.addResult.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(Result.getOneResult.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Result.getOneResult.fulfilled, (state, { payload }) => {
      state.result = payload;
      state.loading = false;
    });
    builder.addCase(Result.getOneResult.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(Result.getResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Result.getResults.fulfilled, (state, { payload }) => {
      state.results = payload;
      state.loading = false;
    });
    builder.addCase(Result.getResults.rejected, (state) => {
      state.loading = false;
    });
  },
}).reducer;
