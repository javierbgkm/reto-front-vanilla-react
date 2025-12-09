import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StringList } from "./StringList";

const TITLE = "Funny title";
const DESCRIPTION = "Annoying description";

const renderComponent = () => render(<StringList title={TITLE} description={DESCRIPTION} />);

const addItemThroughPrompt = async (value) => {
  fireEvent.click(screen.getByText("ADD"));
  const promptInput = screen.getByPlaceholderText("Type the text here...");
  const addButton = screen.getByRole("button", { name: "Add" });

  expect(addButton).toBeDisabled();

  fireEvent.change(promptInput, { target: { value } });
  expect(addButton).not.toBeDisabled();

  fireEvent.click(addButton);
  await waitFor(() => expect(screen.getByText(value)).toBeInTheDocument());
};

describe("StringList", () => {
  it("renders provided title and description", () => {
    renderComponent();

    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });

  it("adds an item only after providing text through the prompt", async () => {
    renderComponent();

    await addItemThroughPrompt("First task");

    expect(screen.queryByText("Add item to list")).not.toBeInTheDocument();
    expect(screen.getByText("First task")).toBeInTheDocument();
  });

  it("enables deletion when an item is selected and removes it from the list", async () => {
    renderComponent();
    await addItemThroughPrompt("Hey, fellas!!!");
    await addItemThroughPrompt("no more imagination");

    const deleteButton = screen.getByText("DELETE");
    expect(deleteButton).toBeDisabled();

    fireEvent.click(screen.getByText("Hey, fellas!!!"));
    expect(deleteButton).not.toBeDisabled();

    fireEvent.click(deleteButton);
    await waitFor(() => expect(screen.queryByText("Hey, fellas!!!")).not.toBeInTheDocument());
    expect(screen.getByText("no more imagination")).toBeInTheDocument();
    expect(deleteButton).toBeDisabled();
  });

  it("supports undo and redo to travel through the list history", async () => {
    renderComponent();
    await addItemThroughPrompt("Hey, fellas!!!");
    await addItemThroughPrompt("no more imagination");

    const undoButton = screen.getByTitle("Undo");
    const redoButton = screen.getByTitle("Redo");

    expect(undoButton).not.toBeDisabled();
    expect(redoButton).toBeDisabled();

    fireEvent.click(undoButton);
    await waitFor(() => expect(screen.queryByText("no more imagination")).not.toBeInTheDocument());
    expect(screen.getByText("Hey, fellas!!!")).toBeInTheDocument();
    expect(redoButton).not.toBeDisabled();

    fireEvent.click(undoButton);
    await waitFor(() => expect(screen.queryByText("Hey, fellas!!!")).not.toBeInTheDocument());
    expect(undoButton).toBeDisabled();

    fireEvent.click(redoButton);
    await waitFor(() => expect(screen.getByText("Hey, fellas!!!")).toBeInTheDocument());
    expect(undoButton).not.toBeDisabled();
  });
});
