import { apiClient } from "@/shared/api/api-client";
import { EventData } from "@/entities/events/model";

export const eventsApi = {
  sendEvent: (eventData: EventData) => {
    return apiClient.post<undefined, EventData>("/events", {
      contenxt: eventData.contenxt,
      type: eventData.type,
      ...eventData,
    });
  },
};
