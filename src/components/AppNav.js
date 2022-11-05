import React from "react";
import "./AppNav.css";
import { Link } from "react-router-dom";

const AppNav = (props) => {
  return (
    <nav className="navMenu">
      <ul>
        <li>
          <Link className="btn" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="btn" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="btn" to="/signUp">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
