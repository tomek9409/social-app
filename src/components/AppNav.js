import React from "react";
import "./AppNav.css";
import { Link } from "react-router-dom";
import axios from "axios";

const AppNav = (props) => {
  const handleLoggout = (e) => {
    e.preventDefault();

    axios
      .post("https://akademia108.pl/api/social-app/user/logout")
      .then((res) => {
        if (res.data.message) {
          props.setUser(null);
          localStorage.setItem("user", null);
        }
      })
      .catch((error) => {
        props.setUser(null);
        localStorage.setItem("user", null);
        console.error(error);
      });
  };

  return (
    <nav className="navMenu">
      <ul>
        <li>
          <Link className="btn" to="/">
            Home
          </Link>
        </li>
        {!props.user && (
          <li>
            <Link className="btn" to="/login">
              Login
            </Link>
          </li>
        )}
        {!props.user && (
          <li>
            <Link className="btn" to="/signup">
              Signup
            </Link>
          </li>
        )}
        {props.user && (
          <li>
            <Link className="btn" to="/" onClick={handleLoggout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default AppNav;
