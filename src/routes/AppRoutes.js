import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import SignUp from "../views/SignUp";

const AppRoutes = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        Home
      </Route>
      <Route path="/login" element={<Login />}>
        Login
      </Route>
      <Route path="/signUp" element={<SignUp />}>
        Sign Up
      </Route>
    </Routes>
  );
};

export default AppRoutes;
