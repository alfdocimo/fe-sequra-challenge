import { InstalmentPlan } from "@/entities/credit-agreements/model";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type SelectedInstalmentPlanType = {
  selectedInstalmentPlan: InstalmentPlan;
  setSelectedInstalmentPlan: (instalmentPlan: InstalmentPlan) => void;
};

const SelectedInstalmentPlan = createContext<SelectedInstalmentPlanType>(null);

export const SelectedInstalmentPlanProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedInstalmentPlan, setSelectedInstalmentPlan] =
    useState<InstalmentPlan>();
  return (
    <SelectedInstalmentPlan.Provider
      value={useMemo(
        () => ({ selectedInstalmentPlan, setSelectedInstalmentPlan }),
        [selectedInstalmentPlan, setSelectedInstalmentPlan]
      )}
    >
      {children}
    </SelectedInstalmentPlan.Provider>
  );
};

export const useSelectedInstalmentPlan = () => {
  const selectedInstalmentPlan = useContext(SelectedInstalmentPlan);

  if (!selectedInstalmentPlan) {
    throw new Error(
      "useSelectedInstalmentPlan must be used within SelectedInstalmentPlanProvider"
    );
  }
  return selectedInstalmentPlan as SelectedInstalmentPlanType;
};
