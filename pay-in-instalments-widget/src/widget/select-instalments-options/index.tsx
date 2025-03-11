import { creditAgreementsApi } from "@/entities/credit-agreements/api";
import { InstalmentPlan } from "@/entities/credit-agreements/model";
import { ListBox } from "@/shared/components/listbox";
import { useFetch } from "@/shared/utils/use-fetch";
import { useState } from "react";

export function SelectInstalmentsOptions() {
  const { data: instalmentsOptionsData, isLoading } = useFetch(() =>
    creditAgreementsApi.get({ totalWithTax: 1000 })
  );

  const [selectedInstalmentOption, setSelectedInstalmentOption] = useState<
    InstalmentPlan | undefined
  >();

  //TODO: Enhance UX by displaying a loading state here
  if (isLoading) return null;

  return (
    <ListBox<InstalmentPlan>
      onChange={(value) => {
        setSelectedInstalmentOption(value);
      }}
    >
      <ListBox.SelectedItem>
        {selectedInstalmentOption
          ? mapInstalmentOptionDataToPaymentPerMonth({
              instalmentPlan: selectedInstalmentOption,
            })
          : "Selecciona una opcion"}
        <ListBox.ToggleButton />
      </ListBox.SelectedItem>
      <ListBox.Content>
        {instalmentsOptionsData?.map((instalmentOptionData, i) => {
          return (
            <ListBox.Item key={i} value={instalmentOptionData}>
              {mapInstalmentOptionDataToPaymentPerMonth({
                instalmentPlan: instalmentOptionData,
              })}
            </ListBox.Item>
          );
        })}
      </ListBox.Content>
    </ListBox>
  );
}

const mapInstalmentOptionDataToPaymentPerMonth = ({
  instalmentPlan,
}: {
  instalmentPlan: InstalmentPlan;
}) => {
  return `${instalmentPlan.instalment_count} cuotas de ${instalmentPlan.instalment_total.string}/mes`;
};
