import { ListBox } from "@/shared/components/listbox";
import { useState } from "react";

type ItemType = { text: string; value: string };

export function SelectInstalmentsOptions() {
  const [selectedItem, setSelectedItem] = useState<ItemType | undefined>();
  const items = [
    { text: "Option 1", value: "opt1" },
    { text: "Option 2", value: "opt2" },
    { text: "Option 3", value: "opt3" },
  ];

  return (
    <ListBox<ItemType>
      onChange={(value) => {
        setSelectedItem(value);
      }}
    >
      <ListBox.SelectedItem>
        {selectedItem ? selectedItem.text : "Select an option..."}
        <ListBox.ToggleButton />
      </ListBox.SelectedItem>
      <ListBox.Content>
        {items.map((item) => (
          <ListBox.Item key={item.value} value={item}>
            {item.text}
          </ListBox.Item>
        ))}
      </ListBox.Content>
    </ListBox>
  );
}
