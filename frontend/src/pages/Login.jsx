import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue to your dashboard</p>

        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn-primary">Sign In</button>
        </form>

        <p className="auth-footer">
          New user?{" "}
          <Link to="/register" className="link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;