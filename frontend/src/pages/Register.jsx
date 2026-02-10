import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Get Started</h2>
        <p className="auth-subtitle">Create your account today</p>

        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button className="btn-primary" style={{ backgroundColor: '#10b981' }}>
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;