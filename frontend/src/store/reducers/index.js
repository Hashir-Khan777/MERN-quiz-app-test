import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./auth.reducer";
import SubjectReducer from "./subject.reducer";
import QuestionReducer from "./question.reducer";
import ToastReducer from "./toast.reducer";

export default combineReducers({
  AuthReducer,
  ToastReducer,
  SubjectReducer,
  QuestionReducer,
});
