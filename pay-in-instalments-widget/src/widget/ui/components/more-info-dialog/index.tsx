import { Modal } from "@/shared/components/modal";
import { widgetClassnamePrefix } from "@/shared/utils/widget-classname-prefix";
import "./index.css";
const baseClassName = widgetClassnamePrefix("more-info-dialog");

export function MoreInfoDialog({
  isOpen,
  onClose,
  instalmentFee,
}: {
  isOpen: boolean;
  onClose: () => void;
  instalmentFee: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={baseClassName}>
        <div className={`${baseClassName}__header`}>
          <span className={`${baseClassName}__header__title`}>seQura</span>
          <span className={`${baseClassName}__header__subtitle`}>
            Fracciona tu pago
          </span>
        </div>
        <div className={`${baseClassName}__content`}>
          <ul className={`${baseClassName}__content__list`}>
            <li>
              <div className={`${baseClassName}__content__list__list-item`}>
                <span>Fracciona tu pago solo con un coste fijo por cuota</span>
                <img src="https://placehold.co/60" alt="placeholder-image" />
              </div>
            </li>
            <li>
              <div className={`${baseClassName}__content__list__list-item`}>
                <span>Ahora solo pagas la primera cuota</span>
                <img src="https://placehold.co/60" alt="placeholder-image" />
              </div>
            </li>
            <li>
              <div className={`${baseClassName}__content__list__list-item`}>
                <span>
                  El resto de pagos se cargarán automáticamente en tu tarjeta
                </span>
                <img src="https://placehold.co/60" alt="placeholder-image" />
              </div>
            </li>
          </ul>
        </div>
        <footer className={`${baseClassName}__footer`}>
          <span>
            Además, en el importe mostrado ya se incluye la cuota única mensual
            de {instalmentFee}, por lo que no tendrás ninguna sorpresa
          </span>
        </footer>
      </div>
    </Modal>
  );
}
