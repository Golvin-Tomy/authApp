import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      alert("Reset link sent to email (placeholder)");
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-3">Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn btn-warning w-100" type="submit">
            Verify
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account? <Link to="/">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
