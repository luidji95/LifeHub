import { useState } from "react";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import { useValidation } from "../../hooks/useValidation";
import { loginSchema } from "../../Validation/authSheme";
import { supabase } from "../../supabaseClient";
import "./login.css";
import { useDispatch, UseDispatch } from "react-redux";
import { saveUser } from "../../store/userSlice";
import { AppDispatch } from "../../store/store";

interface Props {
  switchToRegister: () => void;
  setIsLoggedIn: (value: boolean) => void;
}

export default function Login({ switchToRegister, setIsLoggedIn }: Props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const [serverError, setServerError] = useState<string | null>(null);
  const { validate, errors } = useValidation(loginSchema);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate(formData);
    if (!isValid) return;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setServerError(error.message);
    } else {
      setServerError(null);

      if (data.user) {
        dispatch(
          saveUser({
            id: data.user.id,
            email: data.user.email || "",
            username: data.user.user_metadata?.username || null,
          })
        );
      }

      alert("Successfully logged in!");
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="login-container">
      <img className="logo" src="/lifehub-logo.png" alt="LifeHub logo" />
      <h1 className="login-title">Sign in to LifeHub</h1>

      <form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        {(errors || serverError) && (
          <p style={{ color: "red" }}>{errors || serverError}</p>
        )}

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </form>

      <p className="login-footer">
        New to LifeHub?{" "}
        <button className="link-button" onClick={switchToRegister}>
          Create an account
        </button>
      </p>
    </div>
  );
}
