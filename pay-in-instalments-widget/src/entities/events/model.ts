type EventTypes =
  | "update.price"
  | "mount.price.not.provided"
  | "mount.element.not.provided"
  | "selected.instalment.changed"
  | "close.dialog"
  | "open.dialog"
  | "no.instalment.provided.hover.more.info.btn";

type ContextTypes =
  | "root" //regarding widget mounting/lifecycle
  | "select-instalments-options"
  | "more-info-dialog";

export type EventData = {
  contenxt:
    | `pay-in-instalments-widget-events`
    | `pay-in-instalments-widget-events-${ContextTypes}`; // Required property as stated
  type: EventTypes; // Required property as stated
  [key: string]: unknown; // Additional properties
};
