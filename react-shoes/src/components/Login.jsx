import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { auth } from "../Firebase.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/homepage");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="warp">
      <div className="Form-Login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <a href="/signup" className="create-account-link">
            Create an Account
          </a>
          <button type="submit" className="login-button">
            Login
          </button>
          <img src="/images/shoes.png" alt="logo" className="logo-login" />
        </form>
      </div>
    </div>
  );
}
