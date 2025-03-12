import { apiClient } from "@/shared/api/api-client";
import { EventData } from "@/entities/events/model";

const COULD_NOT_SEND_EVENT_ERROR = new Error("Could not send event");

export const eventsApi = {
  sendEvent: (eventData: EventData) => {
    try {
      apiClient.post<unknown, EventData>("/events", {
        contenxt: eventData.contenxt
          ? `pay-in-instalments-widget-events-${eventData.contenxt}`
          : `pay-in-instalments-widget-events`,
        type: eventData.type,
        ...eventData,
      });
    } catch {
      throw COULD_NOT_SEND_EVENT_ERROR;
    }
  },
};
