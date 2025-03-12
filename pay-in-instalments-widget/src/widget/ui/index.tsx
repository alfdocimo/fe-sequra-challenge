import { widgetClassnamePrefix } from "@/shared/utils/widget-classname-prefix";
import "./index.css";
import { SelectInstalmentsOptions } from "@/widget/ui/components/select-instalments-options/index";
import { useState } from "react";

import { MoreInfoDialog } from "@/widget/ui/components/more-info-dialog";
import { useSelectedInstalmentPlan } from "@/widget/ui/context/selected-instalment-plan-context";

const baseClassName = widgetClassnamePrefix("widget-container");

export const Widget = () => {
  const [showMoreInfoDialog, setShowMoreInfoDialog] = useState(false);
  const { selectedInstalmentPlan } = useSelectedInstalmentPlan();

  return (
    <div className={baseClassName}>
      <div className={`${baseClassName}__header-info`}>
        <span>Pagalo en</span>
        <button
          onClick={() => {
            setShowMoreInfoDialog(true);
          }}
          className={`${baseClassName}__header-info__more-info-btn`}
        >
          Mas info
        </button>
        <MoreInfoDialog
          instalmentFee={selectedInstalmentPlan?.instalment_fee.string ?? "N/A"}
          isOpen={showMoreInfoDialog}
          onClose={() => {
            setShowMoreInfoDialog(false);
          }}
        />
      </div>
      <SelectInstalmentsOptions />
    </div>
  );
};
