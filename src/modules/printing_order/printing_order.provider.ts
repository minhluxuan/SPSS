import { ORDER_REPOSITORY } from "src/common/contants";
import { PrintingOrder } from "./printing_order.entity";

export const PrintingOrderProvider = [
    {
        provide: ORDER_REPOSITORY,
        useValue: PrintingOrder
    }
]