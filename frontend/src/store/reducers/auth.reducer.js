import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Auth } from "../actions";

const initialState = {
  loading: false,
  imageLoading: false,
  data: {},
  user: {},
};

export default createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(Auth.updateImage.pending, (state) => {
      state.imageLoading = true;
    });
    builder.addCase(Auth.updateImage.fulfilled, (state) => {
      state.imageLoading = false;
    });
    builder.addCase(Auth.updateImage.rejected, (state) => {
      state.imageLoading = false;
    });
    builder.addCase(Auth.verifyUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(Auth.logout.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    });
    builder.addMatcher(
      isAnyOf(
        Auth.login.fulfilled,
        Auth.register.fulfilled,
        Auth.adminLogin.fulfilled
      ),
      (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(
        Auth.login.pending,
        Auth.register.pending,
        Auth.verifyUser.pending,
        Auth.adminLogin.pending
      ),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        Auth.login.rejected,
        Auth.register.rejected,
        Auth.adminLogin.rejected,
        Auth.verifyUser.rejected
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
}).reducer;
