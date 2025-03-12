import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePrice } from "@/widget/ui/context/price-context";
import { creditAgreementsApi } from "@/entities/credit-agreements/api";
import { InstalmentPlans } from "@/entities/credit-agreements/model";
import { useEventBus } from "@/widget/ui/context/event-bus-context";
import { useSelectedInstalmentPlan } from "@/widget/ui/context/selected-instalment-plan-context";
import { eventsApi } from "@/entities/events/api";

type InstalmentPlansByPriceType = {
  instalmentPlansByPrice: InstalmentPlans;
};

const InstalmentPlansByPrice = createContext<InstalmentPlansByPriceType>(null);

export const InstalmentPlansByPriceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [instalmentPlansByPrice, setInstalmentPlansByPrice] =
    useState<InstalmentPlans>();
  const { price } = usePrice();
  const { eventBusClient } = useEventBus();
  const { setSelectedInstalmentPlan } = useSelectedInstalmentPlan();

  useEffect(() => {
    creditAgreementsApi.get({ totalWithTax: price }).then((instalmentPlans) => {
      setInstalmentPlansByPrice(instalmentPlans);
    });
    // use this effect for first time mounting only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updatePriceSubscription = eventBusClient.subscribe(
      "price_update",
      (data) => {
        creditAgreementsApi
          .get({ totalWithTax: data.amount })
          .then((instalmentPlans) => {
            setInstalmentPlansByPrice(instalmentPlans);
          });

        setSelectedInstalmentPlan(null);
        eventsApi.sendEvent({
          context: "pay-in-instalments-widget-events",
          type: "update.price",
          from: price,
          to: data.amount,
        });
      }
    );

    return () => {
      eventBusClient.unsubscribe("price_update", updatePriceSubscription);
    };

    // Exclude from deps, as subscribe method will take care of updating the state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InstalmentPlansByPrice.Provider
      value={useMemo(
        () => ({ instalmentPlansByPrice }),
        [instalmentPlansByPrice]
      )}
    >
      {children}
    </InstalmentPlansByPrice.Provider>
  );
};

export const useInstalmentPlansByPrice = () => {
  const instalmentPlansByPrice = useContext(InstalmentPlansByPrice);

  if (!instalmentPlansByPrice) {
    throw new Error(
      "useInstalmentPlansByPrice must be used within InstalmentPlansByPriceProvider"
    );
  }
  return instalmentPlansByPrice as InstalmentPlansByPriceType;
};
