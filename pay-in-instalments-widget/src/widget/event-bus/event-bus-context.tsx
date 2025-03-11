import { createContext, ReactNode, useContext, useMemo } from "react";
import { EventBus } from "@/widget/event-bus/index";

type EventBusContextType = {
  eventBusClient: EventBus;
};

const EventBusContext = createContext<EventBusContextType>(null);

export const EventBusProvider = ({
  children,
  eventBusClient,
}: {
  eventBusClient: EventBus;
  children: ReactNode;
}) => {
  return (
    <EventBusContext.Provider
      value={useMemo(() => ({ eventBusClient }), [eventBusClient])}
    >
      {children}
    </EventBusContext.Provider>
  );
};

export const useEventBus = () => {
  const eventBusContext = useContext(EventBusContext);

  if (!eventBusContext) {
    throw new Error("useEventBus must be used within EventBusProvider");
  }
  return eventBusContext as EventBusContextType;
};
