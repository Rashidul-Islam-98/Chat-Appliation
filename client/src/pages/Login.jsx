import React, { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import server from "../server";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/login`, { email });
      loginUser(response.data.user);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Easy Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;