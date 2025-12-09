import { useState } from "react";
import { CustomButton } from "../CustomButton/CustomButton";
import { Prompt } from "../Prompt/Prompt";
import "./StringList.css";

export const StringList = ({ title, description }) => {
  const [listHistory, setListHistory] = useState([[]]);
  const [head, setHead] = useState(-1);
  const [selected, setSelected] = useState([]);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const currentList = listHistory.at(head) ?? [];

  const commitNewList = (newList) => {
    const base = head === -1 ? listHistory : listHistory.slice(0, listHistory.length + head + 1);

    const newHistory = [...base, newList];
    setListHistory(newHistory);
    setHead(-1);
    setSelected([]);
  };

  const addString = (str) => {
    if (!str) return;
    commitNewList([...currentList, str]);
    setIsInputVisible(false);
  };

  const deleteSelectedStrings = () => {
    if (!selected.length) return;
    const newList = currentList.filter((_, index) => !selected.includes(index));
    commitNewList(newList);
  };

  const undo = () => {
    const min = -listHistory.length;
    if (head > min) {
      setHead(head - 1);
      setSelected([]);
    }
  };

  const redo = () => {
    if (head < -1) {
      setHead(head + 1);
      setSelected([]);
    }
  };

  const toggleSelect = (index) => {
    setSelected((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const isSelected = (index) => selected.includes(index);

  const showInputModal = () => setIsInputVisible(true);

  const deleteOnDoubleClick = (index) => {
    const newList = currentList.filter((_, idx) => idx !== index);
    commitNewList(newList);
  };

  const generateClassName = (index) =>
    "string-list-container__item" + (isSelected(index) ? " string-list-container__item--selected" : "");

  return (
    <div className="string-list-container">
      <div className="string-list-container__title">{title}</div>
      <div className="string-list-container__description">{description}</div>
      <div className="string-list-container__list">
        {currentList.map((item, index) => (
          <div
            key={index}
            onDoubleClick={() => deleteOnDoubleClick(index)}
            className={generateClassName(index)}
            onClick={() => toggleSelect(index)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="string-list-container__actions">
        <div className="string-list-container__actions__history-buttons">
          <CustomButton title="Undo" icon="undo" onClick={undo} disabled={head === -listHistory.length} />
          <CustomButton title="Redo" icon="redo" onClick={redo} disabled={head === -1} />
        </div>
        <div className="string-list-container__actions__edition-buttons">
          <CustomButton text="DELETE" onClick={deleteSelectedStrings} disabled={!selected.length} />
          <CustomButton text="ADD" onClick={showInputModal} primary />
        </div>
      </div>
      <Prompt
        visible={isInputVisible}
        message="Add item to list"
        placeholder="Type the text here..."
        onInput={addString}
        onCancel={() => {
          setIsInputVisible(false);
        }}
      />
    </div>
  );
};
