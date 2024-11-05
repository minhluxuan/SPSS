import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateCustomerFeedbackDto } from "../dtos/customer_feedback.dto";
import { Feedback } from "../entities/feedback.entity";
import { UUID } from "crypto";
import { CUSTOMER_FEEDBACK_REPOSITORY } from "src/common/contants";
import { SearchPayload } from "src/common/interfaces/search_payload.interface";
import { findByCriteria } from "src/common/utils/find_by_criteria.util";

@Injectable()
export class CustomerFeedbackService {
    constructor(
        @Inject(CUSTOMER_FEEDBACK_REPOSITORY)
        private readonly customerFeedbackModel: typeof Feedback
    ) {}

    async getById(id: string) {
        return await this.customerFeedbackModel.findByPk(id);
    }

    async getByIdAndCustomerId(id: UUID, customerId: UUID) {
        return await this.customerFeedbackModel.findOne({ where: { id, customerId }});
    }

    async search(payload: SearchPayload) {
        if (!payload.criteria) {
            payload.criteria = [];
        }

        return findByCriteria(payload.criteria, Feedback, payload.addition, {
            option: 'manual',
            includeOption: []
        }, null);
    }

    async searchByCustomer(payload: SearchPayload, customerId: UUID) {
        if (!payload.criteria) {
            payload.criteria = [];
        }

        payload.criteria.push({
            field: 'customerId',
            operator: '=',
            value: customerId
        });

        return findByCriteria(payload.criteria, Feedback, payload.addition, {
            option: 'manual',
            includeOption: []
        }, null);
    }

    async create(data: CreateCustomerFeedbackDto, customerId: UUID) {
        return await this.customerFeedbackModel.create({ ...data, customerId });
    }

    async update(id: UUID, customerId: UUID, data: CreateCustomerFeedbackDto) {
        const existedFeedback = await this.customerFeedbackModel.findOne({
            where: {
                id,
                customerId
            },
            attributes: ['id']
        });

        if (!existedFeedback) {
            throw new BadRequestException('Feedback does not exist');
        }

        await this.customerFeedbackModel.update(data, { where: { id } });
        return await this.customerFeedbackModel.findByPk(id);
    }

    async destroyByIdAndCustomerId(id: UUID, customerId: UUID) {
        const existedFeedback = await this.customerFeedbackModel.findOne({
            where: {
                id,
                customerId
            },
            attributes: ['id']
        });

        if (!existedFeedback) {
            throw new BadRequestException('Feedback does not exist');
        }

        return await this.customerFeedbackModel.destroy({ where: { id } });
    }

    async destroy(id: string) {
        return await this.customerFeedbackModel.destroy({ where: { id } });
    }
}