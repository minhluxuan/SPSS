import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ResponseModule } from '../response/response.module';
import { CustomerFeedbackController} from './controllers/customer_feedback.controller';
import { JwtModule } from '@nestjs/jwt';
import { CUSTOMER_FEEDBACK_REPOSITORY, CUSTOMER_REPOSITORY, SPSO_FEEDBACK_REPOSITORY, SPSO_REPOSITORY } from 'src/common/contants';
import { Customer } from '../user/customer.entity';
import { SPSO } from '../user/spso.entity';
import { AuthService } from '../user/services/auth.service';
import { Feedback } from './entities/feedback.entity';
import { CustomerFeedbackService } from './services/customer_feedback.service';
import { SpsoFeedbackController } from './controllers/spso_feedback.controller';
import { SpsoFeedbackService } from './services/spso_feedback.service';
import { SPSPOnFeedback } from './entities/spso_on_feedback.entity';

@Module({
    imports: [DatabaseModule, JwtModule.register({
        secret: process.env.JWT_ACCESS_KEY,
        signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    }), ResponseModule],
    controllers: [CustomerFeedbackController,SpsoFeedbackController],
    providers: [{ provide: SPSO_FEEDBACK_REPOSITORY, useValue: SPSPOnFeedback }, { provide: CUSTOMER_FEEDBACK_REPOSITORY, useValue: Feedback }, { provide: CUSTOMER_REPOSITORY, useValue: Customer }, { provide: SPSO_REPOSITORY, useValue: SPSO }, CustomerFeedbackService, SpsoFeedbackService, AuthService]
})
export class FeedbackModule { }