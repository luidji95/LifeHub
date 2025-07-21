import { useState } from "react";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import { useValidation } from "../../hooks/useValidation";
import { loginSchema } from "../../Validation/authSheme";
import { supabase } from "../../supabaseClient";
import "./login.css";
import { useDispatch } from "react-redux";
import { saveUser } from "../../store/userSlice";
import { AppDispatch } from "../../store/store";

interface Props {
  switchToRegister: () => void;
}

export default function Login({ switchToRegister }: Props) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState<string | null>(null);
  const { validate, errors } = useValidation(loginSchema);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(formData)) return;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) return setServerError(error.message);
    if (!data.user)
      return setServerError("User not found. Please confirm your email.");

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError) return setServerError(profileError.message);
    if (!profile) return setServerError("Profile not found. Try again later.");

    dispatch(
      saveUser({
        id: profile.id,
        email: profile.email,
        username: profile.username,
        firstName: profile.first_name,
        lastName: profile.last_name,
        avatarUrl: profile.avatar_url,
        bio: profile.bio,
      })
    );
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
