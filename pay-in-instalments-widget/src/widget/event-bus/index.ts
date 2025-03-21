type EventMap = {
  "price.update": { amount: number };
  "price.change": { from: number; to: number };
};

type EventList = keyof EventMap;

type EventFunction<SelectedEvent extends EventList> = (
  data: EventMap[SelectedEvent]
) => void;

export class EventBus {
  private handlers: Map<EventList, Set<EventFunction<EventList>>> = new Map();
  subscribe<SelectedEvent extends EventList>(
    event: SelectedEvent,
    fn: EventFunction<SelectedEvent>
  ) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(fn);

    return () => this.unsubscribe(event, fn);
  }

  unsubscribe<SelectedEvent extends EventList>(
    event: SelectedEvent,
    fn: EventFunction<SelectedEvent>
  ) {
    this.handlers.get(event)?.delete(fn);
  }

  emit<SelectedEvent extends EventList>(
    event: SelectedEvent,
    data: EventMap[SelectedEvent]
  ) {
    this.handlers.get(event)?.forEach((fn) => fn(data));
  }
}
