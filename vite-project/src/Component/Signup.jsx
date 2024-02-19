import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error message when user starts typing
    setErrors({ ...errors, [name]: "" });
    console.log(formData);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    console.log(formData);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Name validation
    if (!formData.name) {
      errors.name = "Please enter your name";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.username || !emailRegex.test(formData.username)) {
      errors.username = "Please enter a valid email address";
      isValid = false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      errors.password = "Make Strong Password";
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

        // Check if the email already exists
        const emailExists = existingFormData.some(
          (data) => data.username === formData.username
        );

        if (emailExists) {
          alert("Email already exists!");
          return;
        }

        // Push new form data into the existing array
        existingFormData.push(formData);

        window.location.href = "/login";

        // Save the updated array back into local storage
        localStorage.setItem("formData", JSON.stringify(existingFormData));

        // Optionally, you can also redirect the user to another page after successful signup
        // history.push('/success');
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="login-top">
      <div className="login-inner-top">
        <div className="login-title">
          <h1>Signup</h1>
        </div>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="user-input">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p style={{ width: "20rem" }} className="error">
                {errors.name}
              </p>
            )}
          </div>
          <div className="user-input">
            <input
              type="text"
              placeholder="Email"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div
                style={{ color: "red", maxWidth: "100%", textAlign: "left" }}
              >
                {" "}
                <p className="error">{errors.username}</p>
              </div>
            )}
          </div>
          <div className="user-input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div
                style={{ color: "red", maxWidth: "20rem", textAlign: "center" }}
              >
                {" "}
                <p className="error">{errors.password}</p>
              </div>
            )}
          </div>
          <div
            className="user-input"
            style={{ display: "flex", gap: "1rem" }}
          ></div>
          <div className="user-login">
            <button type="submit">Signup</button>
          </div>
        </form>
        <div style={{ marginBlockStart: "1rem" }}>
          Already a user ? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
