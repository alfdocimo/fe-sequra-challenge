type EventMap = {
  price_update: { amount: number };
};

type EventList = keyof EventMap;
type EventFunction = (data: EventMap[EventList]) => void;

export class EventBus {
  private handlers: Map<EventList, Set<EventFunction>> = new Map();

  subscribe(event: EventList, fn: EventFunction) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(fn);

    return () => this.unsubscribe(event, fn);
  }

  unsubscribe(event: EventList, fn: EventFunction) {
    this.handlers.get(event)?.delete(fn);
  }

  emit(event: EventList, data: EventMap[EventList]) {
    this.handlers.get(event)?.forEach((fn) => fn(data));
  }
}
