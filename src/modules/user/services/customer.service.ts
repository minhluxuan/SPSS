import { Inject, Injectable } from "@nestjs/common";
import { CUSTOMER_REPOSITORY } from "src/common/contants";
import { UUID } from "crypto";
import { Customer } from "../customer.entity";

@Injectable()
export class CustomerService {
    constructor(@Inject(CUSTOMER_REPOSITORY) private readonly customerRepository: typeof Customer) {}

    async updateLastLogin(id: UUID) {
        return this.customerRepository.update({
            lastLogin: new Date()
        }, { where: { id }});
    }

    async findOneById(id: UUID) {
        const spso = await this.customerRepository.findByPk(id);
        if (spso) {
            delete spso.dataValues.password;
            return spso.dataValues;
        }

        return null;
    }
}