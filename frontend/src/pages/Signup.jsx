import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      localStorage.setItem("token", res.data.token);

      const userName = res.data.user?.name || form.name;
      const userEmail = res.data.user?.email || form.email;

      localStorage.setItem(
        "user",
        JSON.stringify({ name: userName, email: userEmail })
      );

      if (res.data.user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed: " + err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-3">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-2"
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-2"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-2"
            name="confirmPassword"
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            required
          />

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label">Show Password</label>
          </div>

          <button className="btn btn-success w-100 mb-2" type="submit">
            Sign Up
          </button>

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              const { name, email, sub: googleId } = decoded;

              try {
                const res = await axios.post(
                  "http://localhost:5000/api/auth/google-login",
                  {
                    name,
                    email,
                    googleId,
                  }
                );
                localStorage.setItem("token", res.data.token);

                const userName = res.data.user?.name || name;
                const userEmail = res.data.user?.email || email;

                localStorage.setItem(
                  "user",
                  JSON.stringify({ name: userName, email: userEmail })
                );

                if (res.data.user.isAdmin) {
                  navigate("/admin");
                } else {
                  navigate("/dashboard");
                }
              } catch (err) {
                alert("Google login failed");
              }
            }}
            onError={() => {
              alert("Google Login Failed");
            }}
          />
        </form>

        <p className="text-center mt-2">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
