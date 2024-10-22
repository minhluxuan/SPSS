import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DatabaseModule } from 'src/database/database.module';
import { DocumentRepository } from './document.repository';
import { ResponseModule } from '../response/response.module';

@Module({
    imports: [DatabaseModule, ResponseModule],
    controllers: [DocumentController],
    providers:[DocumentRepository ,DocumentService]
})
export class DocumentModule {}
