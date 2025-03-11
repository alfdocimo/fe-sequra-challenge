import { widgetClassnamePrefix } from "@/shared/utils/widget-classname-prefix";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import "./index.css";

const baseClassName = widgetClassnamePrefix("modal");

export const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={baseClassName} onClick={onClose}>
      <div
        className={`${baseClassName}__content`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          className={`${baseClassName}__content__close-btn`}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.body
  );
};

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);
