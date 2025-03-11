import { widgetClassnamePrefix } from "@/shared/utils/widget-classname-prefix";
import "./index.css";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from "react";

const baseClassName = widgetClassnamePrefix("listbox");

type ListBoxContextType<ListBoxType> = {
  selected: ListBoxType | undefined;
  setSelected: (value: ListBoxType) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const ListBoxContext = createContext<ListBoxContextType<unknown> | null>(null);

function useListBoxContext<ListBoxType>() {
  const context = useContext(ListBoxContext);
  if (!context) {
    throw new Error("ListBox components must be used within a ListBox");
  }
  return context as ListBoxContextType<ListBoxType>;
}

export function ListBox<ListBoxType>({
  children,
  onChange,
  defaultValue,
}: {
  children: ReactNode;
  onChange: (value: ListBoxType) => void;
  defaultValue?: ListBoxType;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ListBoxType | undefined>(
    defaultValue
  );
  const listboxRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      listboxRef.current &&
      !listboxRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEscKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleEscKeyDown);
    return () => {
      document.removeEventListener("keyup", handleEscKeyDown);
    };
  }, []);

  const handleSetSelected = useCallback(
    (value: ListBoxType) => {
      setSelected(value);
      onChange(value);
    },
    [onChange]
  );

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      selected,
      setSelected: handleSetSelected,
    }),
    [isOpen, selected, handleSetSelected]
  );

  return (
    <ListBoxContext.Provider value={contextValue}>
      <div ref={listboxRef} className={baseClassName}>
        {children}
      </div>
    </ListBoxContext.Provider>
  );
}

function SelectedItem({ children }: { children: ReactNode }) {
  const { setIsOpen } = useListBoxContext();
  return (
    <div
      onClick={() => {
        setIsOpen(true);
      }}
      className={`${baseClassName}__selected-item`}
    >
      {children}
    </div>
  );
}

function ToggleButton() {
  const { isOpen, setIsOpen } = useListBoxContext();

  return (
    <button
      className={`${baseClassName}__toggle-button`}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
    >
      <span>{isOpen ? "▲" : "▼"}</span>
    </button>
  );
}

function Content({ children }: { children: ReactNode }) {
  const { isOpen } = useListBoxContext();

  if (!isOpen) return null;

  return <div className={`${baseClassName}__content`}>{children}</div>;
}

function Item<ListBoxType>({
  children,
  value,
}: {
  children: ReactNode;
  value: ListBoxType;
}) {
  const { setIsOpen, setSelected } = useListBoxContext<ListBoxType>();

  return (
    <div
      className={`${baseClassName}__item`}
      onClick={() => {
        setSelected(value);
        setIsOpen(false);
      }}
    >
      {children}
    </div>
  );
}

ListBox.Item = Item;
ListBox.Content = Content;
ListBox.SelectedItem = SelectedItem;
ListBox.ToggleButton = ToggleButton;
