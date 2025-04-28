type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "link"; // dodajemo "link" da podržimo link-button stil
  className?: string;
  disabled?: boolean;
};

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) => {
  const baseClass =
    variant === "primary" ? "login-button registration-button" : "link-button";

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
