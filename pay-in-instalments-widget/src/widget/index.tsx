import { widgetClassnamePrefix } from "@/shared/utils/widget-classname-prefix";
import "./index.css";
import { SelectInstalmentsOptions } from "@/widget/select-instalments-options/index";

const baseClassName = widgetClassnamePrefix("widget-container");

export const Widget = () => {
  return (
    <div className={baseClassName}>
      <div className={`${baseClassName}__header-info`}>
        <span>Pagalo en</span>
        <button className={`${baseClassName}__header-info__more-info-btn`}>
          Mas info
        </button>
      </div>
      <SelectInstalmentsOptions />
    </div>
  );
};
