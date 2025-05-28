import { useState } from "react";
import Login from "./Login/login";
import Registration from "./Registration/registration";
import Dashboard from "../Dashboard/dashboard";

export default function Authentication() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="auth-wrapper">
      {isLogin ? (
        <Login
          switchToRegister={() => setIsLogin(false)}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <Registration switchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}
