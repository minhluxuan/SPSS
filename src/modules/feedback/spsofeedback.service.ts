import { Inject, Injectable } from "@nestjs/common";
import { SPSPOnFeedback } from "./spso_on_feedback.entity";
import { UUID } from "crypto";
import { CreateSpsoFeedbackDto } from "./spsofeedback.dto";

@Injectable()
export class SpsoFeedbackService {
    constructor(
        @Inject('SPSOFEEDBACK_REPOSITORY')
        private readonly spsoFeedbackModel: typeof SPSPOnFeedback
    ) { }

    async getAllSpsoFeedbacks() {
        return await this.spsoFeedbackModel.findAll();
    }

    async getSpsoFeedbackBySpsoIdFeedbackId(spsoId?: string, feedbackId?: string) {
        const whereClause: any = {};
    
        if (spsoId) {
            whereClause.spsoId = spsoId;
        }
        if (feedbackId) {
            whereClause.feedbackId = feedbackId;
        }
    
        return await this.spsoFeedbackModel.findOne({
            where: whereClause,
        });
    }

    async createSpsoFeedback(data:CreateSpsoFeedbackDto, id:UUID, customerFeedbackId:UUID) {
        return await this.spsoFeedbackModel.create({ spsoId:id, feedbackId:customerFeedbackId, ...data});
    }

    async updateSpsoFeedback(data:CreateSpsoFeedbackDto, id:UUID, customerFeedbackId:UUID) {
        return await this.spsoFeedbackModel.update(data, { where: { spsoId:id, feedbackId:customerFeedbackId } })
    }

    async deleteSpsoFeedback(id:UUID, customerFeedbackId:UUID) {
        return await this.spsoFeedbackModel.destroy({ where: { spsoId:id, feedbackId:customerFeedbackId } })
    }
}