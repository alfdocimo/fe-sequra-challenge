import { createRoot } from "react-dom/client";
import { Widget } from "@/widget/index";

export class PayInInstalmentsWidget {
  private root: ReturnType<typeof createRoot> | null = null;

  constructor() {
    console.log("init!");
  }
  mount(element: HTMLElement) {
    if (!element)
      throw new Error(
        "Element to mount the widget is null or undefined, have you provided the correct element?"
      );
    this.root = createRoot(element);
    this.root.render(<Widget />);
  }
}

window.PayInInstalmentsWidget = PayInInstalmentsWidget;

declare global {
  interface Window {
    PayInInstalmentsWidget: new () => PayInInstalmentsWidget;
  }
}
