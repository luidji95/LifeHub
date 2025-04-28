import { useState } from "react";
import Login from "./Login/login";
import Registration from "./Registration/registration";
import Dashboard from "../Dashboard/dashboard";

export default function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <>
      {isLogin ? (
        <Login
          switchToRegister={() => setIsLogin(false)}
          setIsLoggedIn={setIsLoggedIn} // <<<<<< OVO!
        />
      ) : (
        <Registration switchToLogin={() => setIsLogin(true)} />
      )}
    </>
  );
}
