import { useState, useContext } from "react";
import Login from "./Login/login";
import Registration from "./Registration/registration";
import Dashboard from "../Dashboard/dashboard";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Authentication() {
  const [isLogin, setIsLogin] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (loading) return <p>Loading...</p>;

  if (user && isLoggedIn) return <Dashboard />;

  return (
    <div className="auth-wrapper">
      {isLogin ? (
        <Login switchToRegister={() => setIsLogin(false)} />
      ) : (
        <Registration switchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}
