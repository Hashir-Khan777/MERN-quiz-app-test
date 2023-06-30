import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { showToast } from "../reducers/toast.reducer";

const date = new Date();
const cookies = new Cookies();

const login = createAsyncThunk(
  "auth/login",
  async (loginForm, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/auth/login`,
        loginForm
      );
      const expires = new Date(date.setDate(date.getDate() + 30));
      cookies.set("_user", data.token, {
        path: "/",
        secure: true,
        expires,
      });
      dispatch(
        showToast({
          type: "success",
          message: "Login successfully",
        })
      );
      return data;
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message: err.response.data.message
            ? err.response.data.message
            : err.message,
        })
      );
      return rejectWithValue(
        err.response.data.message ? err.response.data.message : err.message
      );
    }
  }
);

const adminLogin = createAsyncThunk(
  "auth/login/admin",
  async (loginForm, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/auth/admin/login`,
        loginForm
      );
      const expires = new Date(date.setDate(date.getDate() + 30));
      cookies.set("_admin", data.token, {
        path: "/",
        secure: true,
        expires,
      });
      dispatch(
        showToast({
          type: "success",
          message: "Login successfully",
        })
      );
      return data;
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message: err.response.data.message
            ? err.response.data.message
            : err.message,
        })
      );
      return rejectWithValue(
        err.response.data.message ? err.response.data.message : err.message
      );
    }
  }
);

const register = createAsyncThunk(
  "auth/register",
  async (registerForm, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/auth/register`,
        registerForm
      );
      const expires = new Date(date.setHours(date.getHours() + 1));
      cookies.set("_user", data.token, {
        path: "/",
        secure: true,
        expires,
      });
      dispatch(
        showToast({
          type: "success",
          message: "Your account has been created",
        })
      );
      return data;
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message: err.response.data.message
            ? err.response.data.message
            : err.message,
        })
      );
      return rejectWithValue(
        err.response.data.message ? err.response.data.message : err.message
      );
    }
  }
);

const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/auth/verify/user`,
        {
          headers: { Authorization: `Bearer ${cookies.get("_user")}` },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response.data.message ? err.response.data.message : err.message
      );
    }
  }
);

const updateImage = createAsyncThunk(
  "update/image",
  async (profileForm, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/auth/upload/image`,
        profileForm.data
      );
      profileForm.func("image", data.image);
      return data;
    } catch (err) {
      dispatch(
        showToast({
          type: "error",
          message: err.response.data.message
            ? err.response.data.message
            : err.message,
        })
      );
      return rejectWithValue(
        err.response.data.message ? err.response.data.message : err.message
      );
    }
  }
);

const logout = createAsyncThunk("auth/logout", (obj, { dispatch }) => {
  cookies.remove("_user", {
    path: "/",
    secure: true,
  });
  dispatch(
    showToast({
      type: "success",
      message: "Logout successfully",
    })
  );
  return {};
});

export { login, adminLogin, register, verifyUser, updateImage, logout };
