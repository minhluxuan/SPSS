import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Feedback } from './feedback.entity';
import { SEQUELIZE } from 'src/common/contants';
import { Sequelize } from 'sequelize';
import { Customer } from '../user/customer.entity';
import { SPSPOnFeedback } from './spso_on_feedback.entity';

@Injectable()
export class FeedbackRepository {
    private feedbackModel: typeof Feedback;
    private customerModel: typeof Customer

    constructor(
        @Inject(SEQUELIZE)
        private readonly sequelize: Sequelize,
    ) {
        this.feedbackModel = this.sequelize.model('Feedback') as typeof Feedback;
        this.customerModel = this.sequelize.model('Customer') as typeof Customer;
    }

    async getFeedbackById(id: string): Promise<Feedback | null> {
        try {
            return await this.feedbackModel.findByPk(id)
        } catch (error) {
            console.error('Error at FeedbackRepository.getFeedbackById', error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getFeedbacksByPage(pageSize: number, offset: number): Promise<Feedback[]> {
        try {
            return await this.feedbackModel.findAll(
                {
                    limit: pageSize,
                    offset: offset
                }
            )
        } catch (error) {
            console.error('Error at FeedbackRepository.getFeedbacksByPage', error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createFeedback(data: Partial<Feedback>): Promise<Feedback> {
        try {
            return await this.feedbackModel.create(data);
        } catch (error) {
            console.error('Error at FeedbackRepository.createFeedback', error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateFeedback(availableFeedback: Feedback, data: Partial<Feedback>): Promise<Feedback> {
        try {
            availableFeedback.update(data);
            return availableFeedback;
        } catch (error) {
            console.error('Error at FeedbackRepository.updateFeedback', error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteFeedback(id: string): Promise<void> {
        try {
            await this.feedbackModel.destroy({ where: { id } });
        } catch (error) {
            console.error('Error at FeedbackRepository.deleteFeedback', error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findUser(id: string): Promise<any> {
        try {
            return this.customerModel.findByPk(id)
        } catch (error) {
            console.error('Error at FeedbackRepository.findUser', error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

@Injectable()
export class SPSPOnFeedbackRepository {
  private spspOnFeedbackModel: typeof SPSPOnFeedback;
  private customerModel: typeof Customer

  constructor(
    @Inject(SEQUELIZE)
    private readonly sequelize: Sequelize,
  ) {
    this.spspOnFeedbackModel = this.sequelize.model('SPSPOnFeedback') as typeof SPSPOnFeedback;
    this.customerModel = this.sequelize.model('Customer') as typeof Customer;
  }

  async getSPSPOnFeedbackById(id: string): Promise<SPSPOnFeedback | null> {
    try {
      return await this.spspOnFeedbackModel.findByPk(id)
    } catch (error) {
      console.error('Error at SPSPOnFeedbackRepository.getSPSPOnFeedbackById', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSPSPOnFeedbacksByPage(pageSize: number, offset: number): Promise<SPSPOnFeedback[]> {
    try {
      return await this.spspOnFeedbackModel.findAll(
        {
          limit: pageSize,
          offset: offset
        }
      )
    } catch (error) {
      console.error('Error at SPSPOnFeedbackRepository.getSPSPOnFeedbacksByPage', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createSPSPOnFeedback(data: Partial<SPSPOnFeedback>): Promise<SPSPOnFeedback> {
    try {
      return await this.spspOnFeedbackModel.create(data);
    } catch (error) {
      console.error('Error at SPSPOnFeedbackRepository.createSPSPOnFeedback', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateSPSPOnFeedback(availableSPSPOnFeedback: SPSPOnFeedback, data: Partial<SPSPOnFeedback>): Promise<SPSPOnFeedback> {
    try {
      availableSPSPOnFeedback.update(data);
      return availableSPSPOnFeedback;
    } catch (error) {
      console.error('Error at SPSPOnFeedbackRepository.updateSPSPOnFeedback', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteSPSPOnFeedback(id: string): Promise<void> {
    try {
      await this.spspOnFeedbackModel.destroy({ where: { id } });
    } catch (error) {
      console.error('Error at SPSPOnFeedbackRepository.deleteSPSPOnFeedback', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUser(id:string): Promise<any> {
    try {
      return this.customerModel.findByPk(id)
    } catch (error) {
      console.error('Error at SPSPOnFeedbackRepository.findUser', error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}