import AppRoutes from "./routes/AppRoutes";
import AppNav from "./components/AppNav";
import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + (user ? user.jwt_token : "");
  axios.defaults.headers.post["Content-Type"] = "application/json";

  return (
    <div className="App">
      <AppNav />
      <AppRoutes />
    </div>
  );
}

export default App;
