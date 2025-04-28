type InputProps = {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
};

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  required = false,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`login-input registration-input ${className}`}
    />
  );
};

export default Input;
