import { createRoot } from "react-dom/client";
import { Widget } from "@/widget/ui/index";
import { EventBus } from "@/widget/event-bus";
import { EventBusProvider } from "./widget/ui/context/event-bus-context";
import { invariant } from "@/shared/utils/invariant";
import { PriceProvider } from "@/widget/ui/context/price-context";
import { InstalmentPlansByPriceProvider } from "@/widget/ui/context/instalment-plans-by-price-context";
import { SelectedInstalmentPlanProvider } from "@/widget/ui/context/selected-instalment-plan-context";
import { eventsApi } from "@/entities/events/api";

export class PayInInstalmentsWidget {
  #eventBus: EventBus;

  constructor() {
    this.#eventBus = new EventBus();
  }
  mount(element: HTMLElement, price: number) {
    invariant(
      !!element,
      "Element to mount the widget is null or undefined. Have you provided the correct element?"
    );
    this.#sendEventIfMountElementNotProvided(element);

    invariant(
      !!price,
      "A [price] must be specified to start the widget. Have you provided a correct price?"
    );
    this.#sendEventIfInitialPriceNotProvided(price);

    createRoot(element).render(
      <EventBusProvider eventBusClient={this.#eventBus}>
        <SelectedInstalmentPlanProvider>
          <PriceProvider price={price}>
            <InstalmentPlansByPriceProvider>
              <Widget />
            </InstalmentPlansByPriceProvider>
          </PriceProvider>
        </SelectedInstalmentPlanProvider>
      </EventBusProvider>
    );
  }

  get events(): EventBus {
    return this.#eventBus;
  }

  #sendEventIfMountElementNotProvided(element: HTMLElement) {
    if (!element) {
      eventsApi.sendEvent({
        contenxt: "pay-in-instalments-widget-events-root",
        type: "mount.element.not.provided",
      });
    }
  }

  #sendEventIfInitialPriceNotProvided(price: number) {
    if (!price) {
      eventsApi.sendEvent({
        contenxt: "pay-in-instalments-widget-events-root",
        type: "mount.price.not.provided",
      });
    }
  }
}

window.PayInInstalmentsWidget = PayInInstalmentsWidget;

declare global {
  interface Window {
    PayInInstalmentsWidget: new () => PayInInstalmentsWidget;
  }
}
