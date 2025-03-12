import { InstalmentPlan } from "@/entities/credit-agreements/model";
import { ListBox } from "@/shared/components/listbox";
import { useInstalmentPlansByPrice } from "@/widget/ui/context/instalment-plans-by-price-context";
import { useSelectedInstalmentPlan } from "@/widget/ui/context/selected-instalment-plan-context";

export function SelectInstalmentsOptions() {
  const { instalmentPlansByPrice } = useInstalmentPlansByPrice();
  const { selectedInstalmentPlan, setSelectedInstalmentPlan } =
    useSelectedInstalmentPlan();

  //TODO: Enhance UX by displaying a loading state here
  if (!instalmentPlansByPrice) return null;

  return (
    <ListBox<InstalmentPlan>
      onChange={(value) => {
        setSelectedInstalmentPlan(value);
      }}
    >
      <ListBox.SelectedItem>
        {selectedInstalmentPlan
          ? mapInstalmentOptionDataToPaymentPerMonth({
              instalmentPlan: selectedInstalmentPlan,
            })
          : "Selecciona una opcion"}
        <ListBox.ToggleButton />
      </ListBox.SelectedItem>
      <ListBox.Content>
        {instalmentPlansByPrice?.map((instalmentOptionData, i) => {
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
