import { CUSTOMER_REPOSITORY, SPSO_REPOSITORY } from "src/common/contants";
import { Customer } from "./customer.entity";
import { SPSO } from "./spso.entity";

export const userProvider = [{
    provide: CUSTOMER_REPOSITORY,
    useValue: Customer
}, {
    provide: SPSO_REPOSITORY,
    useValue: SPSO
}]