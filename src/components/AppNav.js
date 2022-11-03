import React from "react";
import "./AppNav.css";
import { Link } from "react-router-dom";

const AppNav = (props) => {
  return (
    <nav className="navMenu">
      <ul>
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="link" to="/signUp">
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
