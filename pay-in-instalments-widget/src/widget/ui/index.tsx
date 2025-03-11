import { widgetClassnamePrefix } from "@/shared/utils/widget-classname-prefix";
import "./index.css";
import { SelectInstalmentsOptions } from "@/widget/ui/select-instalments-options/index";
import { useState } from "react";

import { MoreInfoDialog } from "@/widget/ui/more-info-dialog";

const baseClassName = widgetClassnamePrefix("widget-container");

export const Widget = () => {
  const [showMoreInfoDialog, setShowMoreInfoDialog] = useState(false);

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
          instalmentFee={"123 euros"} // TODO: Get from context
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
