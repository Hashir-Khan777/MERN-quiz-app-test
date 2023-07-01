import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { showToast } from "../reducers/toast.reducer";

const cookies = new Cookies();

const addResult = createAsyncThunk(
  "result/add",
  async (resultForm, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/result`,
        resultForm.data,
        {
          headers: { Authorization: `Bearer ${cookies.get("_user")}` },
        }
      );
      resultForm.navigate(
        `/result/${resultForm.data.subject}/${resultForm.data.student}`,
        {
          replace: true,
        }
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

const getResults = createAsyncThunk(
  "result/get",
  async (resultForm, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/result`,
        {
          headers: { Authorization: `Bearer ${cookies.get("_admin")}` },
        }
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

const getOneResult = createAsyncThunk(
  "result/get/one",
  async (resultForm, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/result/${resultForm.subject}/${resultForm.student}`,
        {
          headers: { Authorization: `Bearer ${cookies.get("_user")}` },
        }
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

export { addResult, getResults, getOneResult };
