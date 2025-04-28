import { useState } from "react";
import "./auth.css";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login clicked", email, password);
    // Ovde cu kasnije dodati supabase login
  };

  return (
    <div className="container">
      <img className="logo" src="/your-logo.png" alt="LifeHub logo" />
      <h1 className="title">Sign in to LifeHub</h1>

      <form onSubmit={handleSignIn}>
        <input
          className="input"
          type="email"
          placeholder="Username or email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <a href="#" className="forgot-password">
          Forgot password?
        </a>

        <button type="submit" className="button">
          Sign In
        </button>
      </form>

      <div className="footer">
        New to LifeHub? <a href="#">Create an account</a>
      </div>
    </div>
  );
}
