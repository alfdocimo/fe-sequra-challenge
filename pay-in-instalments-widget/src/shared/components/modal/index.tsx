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
          ✖
        </button>
      </div>
    </div>,
    document.body
  );
};
