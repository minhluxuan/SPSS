import { PURCHASING_PAGES_ORDER_REPOSITORY, SPSO_REPOSITORY, CUSTOMER_REPOSITORY} from "src/common/contants";
import { Customer } from "../user/customer.entity";
import { SPSO } from "../user/spso.entity";
import { PurchasingPagesOrder } from "./purchasing_pages_order.entity";

export const purchasingPagesOrderProvider = [{
   provide: PURCHASING_PAGES_ORDER_REPOSITORY,
   useValue: PurchasingPagesOrder
},{provide: CUSTOMER_REPOSITORY,
   useValue: Customer
   }, {
   provide: SPSO_REPOSITORY,
   useValue: SPSO
}]