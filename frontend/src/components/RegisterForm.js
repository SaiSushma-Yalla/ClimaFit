import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); // clear message on new input
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // 🔍 Add this line to debug what is being sent to the backend
  console.log("Registering:", formData.username, formData.password);

  try {
    await axios.post("http://localhost:8085/api/auth/register", formData);
    setMessage("Registration successful! Please login.");
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      setMessage(`Registration failed: ${err.response.data.message}`);
    } else {
      setMessage("Registration failed. Try again.");
    }
  }
  setLoading(false);
};


  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        /><br/>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br/>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RegisterForm;
