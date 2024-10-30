import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DatabaseModule } from 'src/database/database.module';
import { ResponseModule } from '../response/response.module';
import { JwtModule } from '@nestjs/jwt';
import { Document } from './document.entity';
import { AuthService } from '../user/services/auth.service';
import { CUSTOMER_REPOSITORY, SPSO_REPOSITORY } from 'src/common/contants';
import { Customer } from '../user/customer.entity';
import { SPSO } from '../user/spso.entity';

@Module({
    imports: [DatabaseModule, JwtModule.register({
        secret: process.env.JWT_ACCESS_KEY,
        signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    }), ResponseModule],
    controllers: [DocumentController],
    providers: [{ provide: 'DOCUMENT_REPOSITORY', useValue: Document }, { provide: CUSTOMER_REPOSITORY, useValue: Customer }, { provide: SPSO_REPOSITORY, useValue: SPSO }, DocumentService, AuthService]
})
export class DocumentModule { }
