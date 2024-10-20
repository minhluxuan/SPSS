import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocumentRepository } from './document.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from './document.entity';
import { DatabaseModule } from 'src/database/database.module';
export const DocumentProvider = [
    {
        provide: 'DocumentModel',
        useValue: Document
    }
]
@Module({
    imports: [DatabaseModule],
    controllers: [DocumentController],
    providers:[...DocumentProvider ,DocumentService]
})
export class DocumentModule {}
