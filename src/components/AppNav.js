import React from "react";
import { Link } from "react-router-dom";

const AppNav = (props) => {
  return (
    <nav className="navMenu">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signUp">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
