import { ReactNode } from "react";
import "./iconButton.css";
type IconButtonProps = {
  icon: ReactNode;
  text: string;
  onClick: () => void;
  className?: string;
};

export default function IconButton({
  icon,
  text,
  onClick,
  className = "",
}: IconButtonProps) {
  return (
    <button className={`icon-button ${className}`} onClick={onClick}>
      <span className="icon">{icon}</span>
      {text}
    </button>
  );
}
