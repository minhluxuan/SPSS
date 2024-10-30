import { Inject, Injectable } from "@nestjs/common";
import { CreateCustomerFeedbackDto } from "./customerfeedback.dto";
import { Feedback } from "./feedback.entity";
import { UUID } from "crypto";

@Injectable()
export class CustomerFeedbackService {
    constructor(
        @Inject('CUSTOMERFEEDBACK_REPOSITORY')
        private readonly customerFeedbackModel: typeof Feedback
    ) { }

    async getAllCustomerFeedbacks(): Promise<Feedback[]> {
        return this.customerFeedbackModel.findAll();
    }


    async getCustomerFeedbackById(id: string) {
        return await this.customerFeedbackModel.findByPk(id)
    }

    async getCustomerFeedbackByIdAndCustomerId(id: string, customerId: UUID) {
        return await this.customerFeedbackModel.findOne({where:{id, customerId}})
    }

    async createCustomerFeedback(data: CreateCustomerFeedbackDto, id: UUID) {
        return await this.customerFeedbackModel.create({ ...data, customerId: id });
    }

    async updateCustomerFeedback(id: string, data: CreateCustomerFeedbackDto) {
        return await this.customerFeedbackModel.update(data, { where: { id } })
    }

    async deleteCustomerFeedback(id: string) {
        return await this.customerFeedbackModel.destroy({ where: { id } })
    }
}