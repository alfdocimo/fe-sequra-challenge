import { InstalmentPlan } from "@/entities/credit-agreements/model";
import { eventsApi } from "@/entities/events/api";
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

        eventsApi.sendEvent({
          context:
            "pay-in-instalments-widget-events-select-instalments-options",
          type: "selected.instalment.changed",
          from: selectedInstalmentPlan,
          to: value,
        });
      }}
    >
      <ListBox.SelectedItem>
        {selectedInstalmentPlan ? (
          <span data-testid="instalment-option-selected-item">
            {mapInstalmentOptionDataToPaymentPerMonth({
              instalmentPlan: selectedInstalmentPlan,
            })}
          </span>
        ) : (
          <span data-testid="instalment-option-default">
            Selecciona una opción
          </span>
        )}
        <ListBox.ToggleButton />
      </ListBox.SelectedItem>
      <ListBox.Content>
        {instalmentPlansByPrice?.map((instalmentOptionData, i) => {
          return (
            <div key={i} data-testid={`instalment-option-${i}`}>
              <ListBox.Item value={instalmentOptionData}>
                {mapInstalmentOptionDataToPaymentPerMonth({
                  instalmentPlan: instalmentOptionData,
                })}
              </ListBox.Item>
            </div>
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
