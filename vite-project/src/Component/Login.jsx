import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error message when user starts typing
    setErrors({ ...errors, [name]: "" });
    console.log(formData);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.username || !emailRegex.test(formData.username)) {
      errors.username = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Retrieve existing form data from local storage
        const existingFormData =
          JSON.parse(localStorage.getItem("formData")) || [];

        // Find the user with the provided email
        const user = existingFormData.find(
          (data) => data.username === formData.username
        );

        if (!user) {
          alert("User not found!");
          return;
        }

        // Check if the password matches
        if (user.password !== formData.password) {
          alert("Incorrect password!");
          return;
        }

        alert("Login successful!");

        localStorage.setItem(
          "user",
          JSON.stringify({ name: user.name, email: user.username })
        );

        window.location.href = "/home";

        // Clear the form data
        setFormData({
          username: "",
          password: "",
        });

        // Redirect the user to another page after successful login
        // history.push('/dashboard');
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="login-top">
      <div className="login-inner-top">
        <div className="login-title">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="user-input">
            <input
              type="text"
              placeholder="Email"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="user-input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="user-login">
            <button type="submit">Login</button>
          </div>
        </form>
        <div style={{ marginBlockStart: "1rem" }}>
          New Here ? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
