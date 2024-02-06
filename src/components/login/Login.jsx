import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  if (isAuthenticated) {
    return <Redirect to="/profile" />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/sessions/login/",
        {
          method: "POST",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        onLogin(data.user);
        navigate("/products");
      } else {
        console.log("Error during login:", data.message);
      }
    } catch (error) {
      console.log("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="container-login">
      <div className="login">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-form">
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="login-form">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn-login">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
