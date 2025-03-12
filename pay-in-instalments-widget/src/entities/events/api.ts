import { apiClient } from "@/shared/api/api-client";
import { EventData } from "@/entities/events/model";

const COULD_NOT_SEND_EVENT_ERROR = new Error("Could not send event");

export const eventsApi = {
  sendEvent: (eventData: EventData) => {
    try {
      apiClient.post<unknown, EventData>("/events", {
        context: eventData.context
          ? `pay-in-instalments-widget-events-${eventData.context}`
          : `pay-in-instalments-widget-events`,
        type: eventData.type,
        ...eventData,
      });
    } catch {
      throw COULD_NOT_SEND_EVENT_ERROR;
    }
  },
};
