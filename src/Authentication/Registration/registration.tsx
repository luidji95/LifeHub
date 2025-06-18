import { useState } from "react";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import { useValidation } from "../../hooks/useValidation";
import { registrationSchema } from "../../Validation/authSheme";
import { supabase } from "../../supabaseClient";
import "./registration.css";

interface Props {
  switchToLogin: () => void;
}

export default function Registration({ switchToLogin }: Props) {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const { validate, errors } = useValidation(registrationSchema);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate(formData);
    if (!isValid) return;

    if (formData.password !== formData.confirmPass) {
      setServerError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          firstName: formData.firstName,
          lastName: formData.secondName,
          username: formData.username,
        },
      },
    });

    if (error) {
      setServerError(error.message);
    } else {
      setServerError(null);
      alert("Successfully registered! Please check your email.");
      switchToLogin();
    }
  };

  return (
    <div className="registration-container">
      <img className="logo" src="/lifehub-logo.png" alt="LifeHub logo" />
      <h1 className="registration-title">Create your LifeHub account</h1>

      <form onSubmit={handleRegister}>
        <Input
          className="registration-input"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
        />
        <Input
          className="registration-input"
          type="text"
          placeholder="Last Name"
          value={formData.secondName}
          onChange={(e) =>
            setFormData({ ...formData, secondName: e.target.value })
          }
          required
        />
        <Input
          className="registration-input"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <Input
          className="registration-input"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          className="registration-input"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <Input
          className="registration-input"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPass}
          onChange={(e) =>
            setFormData({ ...formData, confirmPass: e.target.value })
          }
          required
        />

        {(errors || serverError) && (
          <p style={{ color: "red" }}>{errors || serverError}</p>
        )}

        <Button type="submit" variant="primary">
          Register
        </Button>
      </form>

      <p className="registration-footer">
        Already have an account?{" "}
        <Button
          type="button"
          variant="secondary"
          onClick={switchToLogin}
          className="link-button"
        >
          Sign in
        </Button>
      </p>
    </div>
  );
}
