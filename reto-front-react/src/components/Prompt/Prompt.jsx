import { useState } from "react";
import { CustomButton } from "../CustomButton/CustomButton";
import "./Prompt.css";

export const Prompt = ({ visible, message, placeholder, onInput, onCancel }) => {
  const [inputContent, setInputContent] = useState("");

  const onInputChange = (e) => {
    setInputContent(e.currentTarget?.value);
  };

  const onClickAdd = () => {
    onInput(inputContent);
    setInputContent("");
  };

  return visible ? (
    <div className="prompt-container">
      <div className="prompt-overlay" />
      <div className="prompt">
        <div className="prompt__message">{message}</div>
        <input className="prompt__input" type="text" autoFocus placeholder={placeholder} onChange={onInputChange} />
        <div className="prompt__buttons-container">
          <CustomButton primary text={"Add"} disabled={!inputContent} onClick={onClickAdd} />
          <CustomButton text={"Cancel"} onClick={onCancel} />
        </div>
      </div>
    </div>
  ) : null;
};
