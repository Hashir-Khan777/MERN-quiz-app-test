import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  AdminDashboard,
  AdminLogin,
  AdminResults,
  Home,
  Login,
  Quiz,
  Register,
  Result,
} from "../pages";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const PrivateRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

const AdminRoute = ({ children, admin }) => {
  if (!admin) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

const AppRouter = () => {
  const user = cookies.get("_user");
  const admin = cookies.get("_admin");

  return (
    <Routes>
      <Route caseSensitive path="/" element={<Login />} />
      <Route caseSensitive path="/admin">
        <Route caseSensitive path="login" element={<AdminLogin />} />
        <Route
          caseSensitive
          path="dashboard"
          element={
            <AdminRoute admin={admin}>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          caseSensitive
          path="results"
          element={
            <AdminRoute admin={admin}>
              <AdminResults />
            </AdminRoute>
          }
        />
      </Route>
      <Route caseSensitive path="/register" element={<Register />} />
      <Route
        caseSensitive
        path="/quiz"
        element={
          <PrivateRoute user={user}>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        caseSensitive
        path="/quiz/:subject/:subjectId"
        element={
          <PrivateRoute user={user}>
            <Quiz />
          </PrivateRoute>
        }
      />
      <Route
        caseSensitive
        path="/result/:subject/:student"
        element={
          <PrivateRoute user={user}>
            <Result />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
