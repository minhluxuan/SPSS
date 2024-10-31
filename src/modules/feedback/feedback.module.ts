import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ResponseModule } from '../response/response.module';
import { CustomerFeedbackController} from './customerfeedback.controller';
import { JwtModule } from '@nestjs/jwt';
import { CUSTOMER_REPOSITORY, SPSO_REPOSITORY } from 'src/common/contants';
import { Customer } from '../user/customer.entity';
import { SPSO } from '../user/spso.entity';
import { AuthService } from '../user/services/auth.service';
import { Feedback } from './feedback.entity';
import { CustomerFeedbackService } from './customerfeedback.service';
import { SpsoFeedbackController } from './spsofeedback.controller';
import { SpsoFeedbackService } from './spsofeedback.service';
import { SPSPOnFeedback } from './spso_on_feedback.entity';

@Module({
    imports: [DatabaseModule, JwtModule.register({
        secret: process.env.JWT_ACCESS_KEY,
        signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    }), ResponseModule],
    controllers: [CustomerFeedbackController,SpsoFeedbackController],
    providers: [{ provide: 'SPSOFEEDBACK_REPOSITORY', useValue: SPSPOnFeedback }, { provide: 'CUSTOMERFEEDBACK_REPOSITORY', useValue: Feedback }, { provide: CUSTOMER_REPOSITORY, useValue: Customer }, { provide: SPSO_REPOSITORY, useValue: SPSO }, CustomerFeedbackService, SpsoFeedbackService, AuthService]
})
export class FeedbackModule { }