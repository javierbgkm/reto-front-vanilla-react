import { FaRedo, FaUndo } from "react-icons/fa";
import "./CustomButton.css";

export const CustomButton = ({ text, icon, disabled, primary, ...args }) => {
  let content;

  switch (icon?.toLowerCase()) {
    case "undo":
      content = <FaUndo />;
      break;
    case "redo":
      content = <FaRedo />;
      break;
    default:
      content = text;
  }

  const buttonClassName = `custom-button ${primary ? "primary" : ""} ${disabled ? "disabled" : ""}`;

  return (
    <button {...args} disabled={disabled} className={buttonClassName}>
      {content}
    </button>
  );
};
