import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListBox } from "@/shared/components/listbox/index";
import { useState } from "react";

type Item = {
  name: string;
  age: number;
};

function ExampleListBox() {
  const items = [
    { name: "Jon Doe", age: 12 },
    { name: "Jane Doe", age: 32 },
  ];

  const [selectedItem, setSelectedItem] = useState<Item | undefined>();

  return (
    <ListBox<Item>
      onChange={(value) => {
        setSelectedItem(value);
      }}
    >
      <div data-testid="listbox-container">
        <ListBox.SelectedItem>
          {selectedItem ? selectedItem.name : "Select a person"}
        </ListBox.SelectedItem>

        <ListBox.ToggleButton />

        <ListBox.Content>
          {items.map((item, i) => (
            <div key={i} data-testid="item">
              <ListBox.Item value={item} data-testid={`item-${item.name}`}>
                {item.name}
              </ListBox.Item>
            </div>
          ))}
        </ListBox.Content>
      </div>
    </ListBox>
  );
}

describe("ListBox Component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the ListBox with default content", () => {
    render(<ExampleListBox />);

    expect(screen.getByTestId("listbox-container")).toBeInTheDocument();
    expect(screen.getByText("Select a person")).toBeInTheDocument();

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();
  });

  it("opens the listbox when clicking the toggle button", async () => {
    render(<ExampleListBox />);

    expect(screen.queryByText("Jon Doe")).not.toBeInTheDocument();

    const toggleButton = screen.getByRole("button");
    await user.click(toggleButton);

    expect(screen.getByText("Jon Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("opens the listbox when clicking the selected item area", async () => {
    render(<ExampleListBox />);

    expect(screen.queryByText("Jon Doe")).not.toBeInTheDocument();

    const selectedItemArea = screen.getByText("Select a person");
    await user.click(selectedItemArea);

    expect(screen.getByText("Jon Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("selects an item when clicking on it", async () => {
    render(<ExampleListBox />);

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Jane Doe"));

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jon Doe")).not.toBeInTheDocument();
  });

  it("closes the listbox when clicking outside", async () => {
    render(
      <div>
        <div data-testid="outside-element">Outside Element</div>
        <ExampleListBox />
      </div>
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Jon Doe")).toBeInTheDocument();

    await user.click(screen.getByTestId("outside-element"));
    expect(screen.queryByText("Jon Doe")).not.toBeInTheDocument();
  });

  it("closes the listbox when pressing Escape key", async () => {
    render(<ExampleListBox />);

    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Jon Doe")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Jon Doe")).not.toBeInTheDocument();
  });

  it("toggles the listbox state when clicking the toggle button multiple times", async () => {
    render(<ExampleListBox />);

    const toggleButton = screen.getByRole("button");

    await user.click(toggleButton);
    expect(screen.getByText("Jon Doe")).toBeInTheDocument();

    await user.click(toggleButton);
    expect(screen.queryByText("Jon Doe")).not.toBeInTheDocument();

    await user.click(toggleButton);
    expect(screen.getByText("Jon Doe")).toBeInTheDocument();
  });

  it("ensures list can contain elements", async () => {
    render(<ExampleListBox />);

    await user.click(screen.getByRole("button"));

    const listItems = screen.getAllByTestId("item");
    expect(listItems).toHaveLength(2);

    expect(screen.getByText("Jon Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("verifies an element can be selected and changes the selected text", async () => {
    render(<ExampleListBox />);

    expect(screen.getByText("Select a person")).toBeInTheDocument();

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Jon Doe"));

    expect(screen.getByText("Jon Doe")).toBeInTheDocument();
    expect(screen.queryByText("Select a person")).not.toBeInTheDocument();
  });
});
