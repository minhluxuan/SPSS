import { PURCHASING_PAGES_ORDER_REPOSITORY } from "src/common/contants";
import { PurchasingPagesOrder } from "./purchasing_pages_order.entity";

export const purchasingPagesOrderProvider = {
   provide: PURCHASING_PAGES_ORDER_REPOSITORY,
   useValue: PurchasingPagesOrder
}