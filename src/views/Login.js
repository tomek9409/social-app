import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const [loginMessage, setLoginMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://akademia108.pl/api/social-app/user/login", {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        if (Array.isArray(res.data.username)) {
          setLoginMessage(res.data.username[0]);
        } else if (res.data.password) {
          setLoginMessage(res.data.password[0]);
        } else if (res.data.error) {
          setLoginMessage("Błąd logowania");
        } else {
          setLoginMessage("");
          props.setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label>Login: </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button className="btn">Log in</button>
      </form>
    </div>
  );
};
export default Login;
