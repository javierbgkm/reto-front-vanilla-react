let listHistory = [[]];
let head = -1;
let selected = [];
let isInputVisible = false;

const listElement = document.getElementById("string-list");
const undoButton = document.getElementById("undo-button");
const redoButton = document.getElementById("redo-button");
const deleteButton = document.getElementById("delete-button");
const addButton = document.getElementById("add-button");
const promptContainer = document.getElementById("prompt-container");
const promptInput = document.getElementById("prompt-input");
const promptAddButton = document.getElementById("prompt-add");
const promptCancelButton = document.getElementById("prompt-cancel");

const currentList = () => listHistory.at(head) ?? [];

const commitNewList = (newList) => {
  const base = head === -1 ? listHistory : listHistory.slice(0, listHistory.length + head + 1);
  const newHistory = [...base, newList];
  listHistory = newHistory;
  head = -1;
  selected = [];
  render();
};

const addString = (str) => {
  if (!str) return;
  commitNewList([...currentList(), str]);
  hideInput();
};

const deleteSelectedStrings = () => {
  if (!selected.length) return;
  const newList = currentList().filter((_, index) => !selected.includes(index));
  commitNewList(newList);
};

const undo = () => {
  const min = -listHistory.length;
  if (head > min) {
    head -= 1;
    selected = [];
    render();
  }
};

const redo = () => {
  if (head < -1) {
    head += 1;
    selected = [];
    render();
  }
};

const toggleSelect = (index) => {
  selected = selected.includes(index) ? selected.filter((i) => i !== index) : [...selected, index];
  renderList();
  updateButtons();
};

const isSelected = (index) => selected.includes(index);

const showInputModal = () => {
  isInputVisible = true;
  renderPrompt();
};

const hideInput = () => {
  isInputVisible = false;
  renderPrompt();
};

const deleteOnDoubleClick = (index) => {
  const newList = currentList().filter((_, idx) => idx !== index);
  commitNewList(newList);
};

const generateClassName = (index) => "string-list-container__item" + (isSelected(index) ? " string-list-container__item--selected" : "");

const renderList = () => {
  listElement.innerHTML = "";
  currentList().forEach((item, index) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.className = generateClassName(index);
    div.addEventListener("click", () => toggleSelect(index));
    div.addEventListener("dblclick", () => deleteOnDoubleClick(index));
    listElement.appendChild(div);
  });
};

const updateButtons = () => {
  undoButton.disabled = head === -listHistory.length;
  redoButton.disabled = head === -1;
  deleteButton.disabled = !selected.length;
  undoButton.classList.toggle("disabled", undoButton.disabled);
  redoButton.classList.toggle("disabled", redoButton.disabled);
  deleteButton.classList.toggle("disabled", deleteButton.disabled);
};

const updatePromptButtons = () => {
  const hasContent = !!promptInput.value;
  promptAddButton.disabled = !hasContent;
  promptAddButton.classList.toggle("disabled", !hasContent);
};

const renderPrompt = () => {
  if (isInputVisible) {
    promptContainer.style.display = "flex";
    promptInput.focus();
  } else {
    promptContainer.style.display = "none";
    promptInput.value = "";
  }
  updatePromptButtons();
};

const render = () => {
  renderList();
  updateButtons();
  renderPrompt();
};

undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);
deleteButton.addEventListener("click", deleteSelectedStrings);
addButton.addEventListener("click", showInputModal);
promptAddButton.addEventListener("click", () => addString(promptInput.value));
promptCancelButton.addEventListener("click", hideInput);
promptInput.addEventListener("input", updatePromptButtons);

render();
