import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import SignUp from "../views/SignUp";

const AppRoutes = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Home user={props.user} />}>
        Home
      </Route>
      <Route
        path="/login"
        element={<Login user={props.user} setUser={props.setUser} />}
      >
        Login
      </Route>
      <Route path="/signUp" element={<SignUp />}>
        Sign Up
      </Route>
    </Routes>
  );
};

export default AppRoutes;
