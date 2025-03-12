import { EventBus } from "@/widget/event-bus";
import { EventBusProvider } from "@/widget/ui/context/event-bus-context";
import { PriceProvider } from "@/widget/ui/context/price-context";
import { InstalmentPlansByPriceProvider } from "@/widget/ui/context/instalment-plans-by-price-context";
import { SelectedInstalmentPlanProvider } from "@/widget/ui/context/selected-instalment-plan-context";
import { Widget } from "@/widget/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const eventBus = new EventBus();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EventBusProvider eventBusClient={eventBus}>
      <SelectedInstalmentPlanProvider>
        <PriceProvider price={1000}>
          <InstalmentPlansByPriceProvider>
            <Widget />
          </InstalmentPlansByPriceProvider>
        </PriceProvider>
      </SelectedInstalmentPlanProvider>
    </EventBusProvider>
  </StrictMode>
);
