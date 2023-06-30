import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { showToast } from "../reducers/toast.reducer";

const cookies = new Cookies();

const addQueston = createAsyncThunk(
  "question/add",
  async (questionForm, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/question`,
        questionForm.data,
        {
          headers: { Authorization: `Bearer ${cookies.get("_admin")}` },
        }
      );
      dispatch(
        showToast({
          type: "success",
          message: "Question has been added",
        })
      );
      questionForm.onClose();
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

export { addQueston };
