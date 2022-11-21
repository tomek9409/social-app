import "./SignUp.css";
import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [signUpMessage, setSignUpMessage] = useState("");
  const [signUpDone, setSignUpDone] = useState(false);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const validate = () => {
    let validationErrors = {
      username: false,
      email: false,
      password: false,
      repeatPassword: false,
    };

    if (formData.username.trim().length < 4) {
      validationErrors.username = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: "Username should have at least 4 characters",
        };
      });
    } else if (!/^[^\s]*$/.test(formData.username.trim())) {
      validationErrors.username = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: "Username shouldn't have empty characters",
        };
      });
    } else {
      validationErrors.username = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: "",
        };
      });
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      validationErrors.email = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          email: "There is no valid email",
        };
      });
    } else {
      validationErrors.email = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          email: "",
        };
      });
    }

    if (formData.password.trim().length < 6) {
      validationErrors.password = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Password should have at least 6 characters",
        };
      });
    } else if (!/^[^\s]*$/.test(formData.password.trim())) {
      validationErrors.password = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Password shouldn't have empty characters",
        };
      });
    } else if (
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())
    ) {
      validationErrors.password = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Password must contain one of the charts: ! # @ $ %",
        };
      });
    } else {
      validationErrors.password = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "",
        };
      });
    }

    if (formData.password.trim() !== formData.repeatPassword.trim()) {
      validationErrors.repeatPassword = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          repeatPassword: "Passwords should be the same",
        };
      });
    } else {
      validationErrors.repeatPassword = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          repeatPassword: "",
        };
      });
    }

    return (
      !validationErrors.username &&
      !validationErrors.email &&
      !validationErrors.password &&
      !validationErrors.repeatPassword
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    axios
      .post("https://akademia108.pl/api/social-app/user/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log(res.data);

        let resData = res.data;

        if (resData.signedup) {
          setSignUpMessage("Account created");
          setSignUpDone(true);
        } else {
          if (resData.message.username) {
            setSignUpMessage(resData.message.username[0]);
          } else if (resData.message.email) {
            setSignUpMessage(resData.message.email[0]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signUp">
      {props.user && <Navigate to="/" />}
      <form onSubmit={handleSubmit}>
        {signUpMessage && <h2>{signUpMessage}</h2>}
        <label>Username: </label>
        <input type="text" name="username" onChange={handleInputChange} />
        {errors.username && <p>{errors.username}</p>}
        <label>Email: </label>
        <input type="email" name="email" onChange={handleInputChange} />
        {errors.email && <p>{errors.email}</p>}
        <label>Password: </label>
        <input type="password" name="password" onChange={handleInputChange} />
        {errors.password && <p>{errors.password}</p>}
        <label>Reapeat password: </label>
        <input
          type="password"
          name="repeatPassword"
          onChange={handleInputChange}
        />
        {errors.repeatPassword && <p>{errors.repeatPassword}</p>}
        {!signUpDone && (
          <button className="btn" disabled={signUpDone}>
            Sign Up
          </button>
        )}
      </form>

      {signUpDone && (
        <div className="goLogin">
          <Link to="/login" className="btn">
            Go to login
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignUp;
