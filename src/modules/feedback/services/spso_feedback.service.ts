import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SPSPOnFeedback } from "../entities/spso_on_feedback.entity";
import { UUID } from "crypto";
import { CreateSpsoFeedbackDto } from "../dtos/create_spso_feedback.dto";
import { CUSTOMER_FEEDBACK_REPOSITORY, CUSTOMER_REPOSITORY, SPSO_FEEDBACK_REPOSITORY } from "src/common/contants";
import { CustomerService } from "src/modules/user/services/customer.service";
import { Customer } from "src/modules/user/customer.entity";
import { Feedback } from "../entities/feedback.entity";
import { UpdateFeedbackResponseDto } from "../dtos/update_response.dto";
import { findByCriteria } from "src/common/utils/find_by_criteria.util";
import { SearchPayload } from "src/common/interfaces/search_payload.interface";

@Injectable()
export class SpsoFeedbackService {
    constructor(
        @Inject(SPSO_FEEDBACK_REPOSITORY)
        private readonly spsoFeedbackModel: typeof SPSPOnFeedback,
        @Inject(CUSTOMER_FEEDBACK_REPOSITORY) private readonly customerFeedbackRepository: typeof Feedback
    ) {}

    async getByFeedbackIdAndSpsoId(feedbackId: UUID, spsoId: UUID) {
        return await this.spsoFeedbackModel.findOne({
            where: {
                feedbackId, spsoId
            }
        });
    }

    async getByFeedbackIdAndSpsoIdAndCustomerId(feedbackId: UUID, spsoId: UUID, customerId: UUID) {
        return await this.spsoFeedbackModel.findOne({
            where: {
                feedbackId,
                spsoId
            },
            include: [
                {
                    model: Feedback,
                    where: {
                        customerId
                    }
                }
            ]
        });
    }

    async searchBySpso(payload: SearchPayload, spsoId: UUID) {
        if (!payload.criteria) {
            payload.criteria = [];
        }

        payload.criteria.push({
            field: 'spsoId',
            operator: '=',
            value: spsoId
        });

        return findByCriteria(payload.criteria, SPSPOnFeedback, payload.addition, {
            option: 'manual',
            includeOption: []
        }, null);
    }

    async searchByCustomer(payload: SearchPayload, customerId: UUID) {
        if (!payload.criteria) {
            payload.criteria = [];
        }

        payload.criteria.push({
            field: 'feedback.customerId',
            operator: '=',
            value: customerId
        });

        return findByCriteria(payload.criteria, SPSPOnFeedback, payload.addition, {
            option: 'manual',
            includeOption: [{
                model: Feedback
            }]
        }, null);
    }

    async create(dto: CreateSpsoFeedbackDto, spsoId: UUID) {
        const existedFeedback = await this.customerFeedbackRepository.findByPk(dto.feedbackId, { attributes: ['id'] })

        if (!existedFeedback) {
            throw new BadRequestException('Feedback does not exist');
        }
        
        const existedResponse = await this.spsoFeedbackModel.findOne({
            where: {
                feedbackId: dto.feedbackId,
                spsoId
            }
        });

        if (existedResponse) {
            throw new BadRequestException('You have responsed to this feedback. Please update your content instead');
        }

        return await this.spsoFeedbackModel.create({ ...dto, spsoId, feedbackId: dto.feedbackId });
    }

    async update(dto: UpdateFeedbackResponseDto, feedbackId: UUID, spsoId: UUID) {
        const existedSpsoFeedback = await this.spsoFeedbackModel.findOne({
            where: {
                feedbackId,
                spsoId
            }
        });

        if (!existedSpsoFeedback) {
            throw new BadRequestException('Feedback response does not exist');
        }

        await this.spsoFeedbackModel.update(dto, { where: { feedbackId, spsoId } });

        return await this.spsoFeedbackModel.findOne({ where: { feedbackId, spsoId }});
    }

    async destroy(feedbackId: UUID, spsoId: UUID) {
        const existedSpsoFeedback = await this.spsoFeedbackModel.findOne({
            where: {
                feedbackId,
                spsoId
            }
        });

        if (!existedSpsoFeedback) {
            throw new BadRequestException('Feedback response does not exist');
        }

        return await this.spsoFeedbackModel.destroy({ where: { feedbackId, spsoId } });
    }
}