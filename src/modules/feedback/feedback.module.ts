import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ResponseModule } from '../response/response.module';
import { FeedbackController, SPSPOnFeedbackController } from './feedback.controller';
import { FeedbackRepository, SPSPOnFeedbackRepository } from './feedback.repository';
import { FeedbackService, SPSPOnFeedbackService } from './feedback.service';

@Module({
    imports: [DatabaseModule, ResponseModule],
    controllers: [FeedbackController, SPSPOnFeedbackController],
    providers: [FeedbackRepository, FeedbackService, SPSPOnFeedbackRepository, SPSPOnFeedbackService]
})
export class FeedbackModule { }
