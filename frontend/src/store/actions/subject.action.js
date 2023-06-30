import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { showToast } from "../reducers/toast.reducer";

const cookies = new Cookies();

const addSubject = createAsyncThunk(
  "subject/add",
  async (subjectForm, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/subject`,
        subjectForm.data,
        {
          headers: { Authorization: `Bearer ${cookies.get("_admin")}` },
        }
      );
      dispatch(
        showToast({
          type: "success",
          message: "Subject has been created",
        })
      );
      subjectForm.onClose();
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

const getSubjects = createAsyncThunk(
  "subject/get",
  async (subjectForm, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/subject`,
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

const getOneSubjects = createAsyncThunk(
  "subject/get/one",
  async (subjectForm, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/subject/${subjectForm._id}`,
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

export { addSubject, getSubjects, getOneSubjects };
