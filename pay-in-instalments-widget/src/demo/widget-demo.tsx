import { EventBus } from "@/widget/event-bus";
import { EventBusProvider } from "@/widget/event-bus/event-bus-context";
import { Widget } from "@/widget/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const eventBus = new EventBus();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EventBusProvider eventBusClient={eventBus}>
      <Widget />
    </EventBusProvider>
  </StrictMode>
);
