import { createRoot } from "react-dom/client";
import { Widget } from "@/widget/ui/index";
import { EventBus } from "@/widget/event-bus";
import { EventBusProvider } from "./widget/event-bus/event-bus-context";

export class PayInInstalmentsWidget {
  private root: ReturnType<typeof createRoot> | null = null;
  private eventBus: EventBus;

  constructor() {
    this.eventBus = new EventBus();
  }
  mount(element: HTMLElement) {
    if (!element)
      throw new Error(
        "Element to mount the widget is null or undefined, have you provided the correct element?"
      );
    this.root = createRoot(element);
    this.root.render(
      <EventBusProvider eventBusClient={this.eventBus}>
        <Widget />
      </EventBusProvider>
    );
  }

  events(): EventBus {
    return this.eventBus;
  }
}

window.PayInInstalmentsWidget = PayInInstalmentsWidget;

declare global {
  interface Window {
    PayInInstalmentsWidget: new () => PayInInstalmentsWidget;
  }
}
