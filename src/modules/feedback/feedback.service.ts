import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FeedbackRepository, SPSPOnFeedbackRepository } from "./feedback.repository";
import { CreateFeedbackDto, CreateSPSPOnFeedbackDto } from "./feedback.dto";
import { Response } from "../response/response.entity";

@Injectable()
export class FeedbackService {
    constructor(
        private readonly feedbackRepository: FeedbackRepository,
        private readonly response: Response
    ) { }

    async getFeedbackById(id: string) {
        try {
            const feedback = await this.feedbackRepository.getFeedbackById(id);
            if (!feedback) {
                this.response.initResponse(false, "Could not get Feedback by Id.", null);
                throw new HttpException(this.response, HttpStatus.BAD_REQUEST);
            }
            this.response.initResponse(true, "Get Feedback by Id successfully.", { feedback });
            return this.response;
        } catch (error) {
            if (!(error instanceof HttpException)) {
                this.response.initResponse(false, "An unexpected error occurred.", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            throw error;
        }
    }

    async getFeedbacksByPage(pageNumber: number, pageSize: number) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const feedbacks = await this.feedbackRepository.getFeedbacksByPage(pageSize, offset);
            if (!feedbacks) {
                this.response.initResponse(false, "Could not get Feedback by Page.", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            this.response.initResponse(true, "Get Feedback by Page successfully.", feedbacks);
            return this.response;
        } catch (error) {
            throw error;
        }
    }

    async createFeedback(data: CreateFeedbackDto) {
        try {
            const user = await this.feedbackRepository.findUser(data.customerId)
            if (!user) {
                this.response.initResponse(false, "Could not create Feedback (Customer is not in database).", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const feedback = await this.feedbackRepository.createFeedback(data);
            if (!feedback) {
                this.response.initResponse(false, "Could not create Feedback.", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            this.response.initResponse(true, "Create Feedback successfully.", feedback)
            return this.response;
        } catch (error) {
            throw error;
        }
    }

    async updateFeedback(id: string, data: CreateFeedbackDto) {
        try {
            const availableFeedback = await this.feedbackRepository.getFeedbackById(id)
            if (!availableFeedback) {
                this.response.initResponse(false, "Could not update Feedback (Invalid Id).", null);
                throw new HttpException(this.response, HttpStatus.BAD_REQUEST);
            }
            const user = await this.feedbackRepository.findUser(data.customerId)
            if (!user) {
                this.response.initResponse(false, "Could not create Feedback (Customer is not in database).", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const updatedFeedback = await this.feedbackRepository.updateFeedback(availableFeedback, data);
            this.response.initResponse(true, "Update Feedback successfully.", updatedFeedback);
            return this.response;
        } catch (error) {
            throw error;
        }
    }

    async deleteFeedback(id: string) {
        try {
            const feedback = await this.feedbackRepository.getFeedbackById(id);
            if (!feedback) {
                this.response.initResponse(false, "Feedback not found.", null);
                throw new HttpException(this.response, HttpStatus.NOT_FOUND);
            }
            await this.feedbackRepository.deleteFeedback(id);
            this.response.initResponse(true, "Feedback deleted successfully.", null);
            return this.response;
        } catch (error) {
            throw error;
        }
    }
}

@Injectable()
export class SPSPOnFeedbackService {
    constructor(
        private readonly spspOnFeedbackRepository: SPSPOnFeedbackRepository,
        private readonly response: Response
    ) { }

    async getSPSPOnFeedbackById(id: string) {
        try {
            const spspOnFeedback = await this.spspOnFeedbackRepository.getSPSPOnFeedbackById(id);
            if (!spspOnFeedback) {
                this.response.initResponse(false, "Could not get SPSPOnFeedback by Id.", null);
                throw new HttpException(this.response, HttpStatus.BAD_REQUEST);
            }
            this.response.initResponse(true, "Get SPSPOnFeedback by Id successfully.", { spspOnFeedback });
            return this.response;
        } catch (error) {
            if (!(error instanceof HttpException)) {
                this.response.initResponse(false, "An unexpected error occurred.", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            throw error;
        }
    }

    async getSPSPOnFeedbacksByPage(pageNumber: number, pageSize: number) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const spspOnFeedbacks = await this.spspOnFeedbackRepository.getSPSPOnFeedbacksByPage(pageSize, offset);
            if (!spspOnFeedbacks) {
                this.response.initResponse(false, "Could not get SPSPOnFeedback by Page.", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            this.response.initResponse(true, "Get SPSPOnFeedback by Page successfully.", spspOnFeedbacks);
            return this.response;
        } catch (error) {
            throw error;
        }
    }

    async createSPSPOnFeedback(data: CreateSPSPOnFeedbackDto) {
        try {
            const user = await this.spspOnFeedbackRepository.findUser(data.customerId)
            if (!user) {
                this.response.initResponse(false, "Could not create SPSPOnFeedback (Customer is not in database).", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const spspOnFeedback = await this.spspOnFeedbackRepository.createSPSPOnFeedback(data);
            if (!spspOnFeedback) {
                this.response.initResponse(false, "Could not create SPSPOnFeedback.", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            this.response.initResponse(true, "Create SPSPOnFeedback successfully.", spspOnFeedback)
            return this.response;
        } catch (error) {
            throw error;
        }
    }

    async updateSPSPOnFeedback(id: string, data: CreateSPSPOnFeedbackDto) {
        try {
            const availableSPSPOnFeedback = await this.spspOnFeedbackRepository.getSPSPOnFeedbackById(id)
            if (!availableSPSPOnFeedback) {
                this.response.initResponse(false, "Could not update SPSPOnFeedback (Invalid Id).", null);
                throw new HttpException(this.response, HttpStatus.BAD_REQUEST);
            }
            const user = await this.spspOnFeedbackRepository.findUser(data.customerId)
            if (!user) {
                this.response.initResponse(false, "Could not create SPSPOnFeedback (Customer is not in database).", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const updatedSPSPOnFeedback = await this.spspOnFeedbackRepository.updateSPSPOnFeedback(availableSPSPOnFeedback, data);
            this.response.initResponse(true, "Update SPSPOnFeedback successfully.", updatedSPSPOnFeedback);
            return this.response;
        } catch (error) {
            throw error;
        }
    }

    async deleteSPSPOnFeedback(id: string) {
        try {
            const spspOnFeedback = await this.spspOnFeedbackRepository.getSPSPOnFeedbackById(id);
            if (!spspOnFeedback) {
                this.response.initResponse(false, "SPSPOnFeedback not found.", null);
                throw new HttpException(this.response, HttpStatus.NOT_FOUND);
            }
            await this.spspOnFeedbackRepository.deleteSPSPOnFeedback(id);
            this.response.initResponse(true, "SPSPOnFeedback deleted successfully.", null);
            return this.response;
        } catch (error) {
            throw error;
        }
    }
}