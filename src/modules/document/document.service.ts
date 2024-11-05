import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateDocumentDto } from "./document.dto";
import { Document } from "./document.entity";
import { CustomerService } from "../user/services/customer.service";
import { UUID } from "crypto";
import { StorageService } from "../storage/storage.service";
import * as path from "path";
import * as pdfParse from 'pdf-parse';
import { SearchPayload } from "src/common/interfaces/search_payload.interface";
import { findByCriteria } from "src/common/utils/find_by_criteria.util";
import { Customer } from "../user/customer.entity";
import { DOCUMENT_REPOSITORY } from "src/common/contants";

@Injectable()
export class DocumentService {
    constructor(
        @Inject(DOCUMENT_REPOSITORY)
        private readonly documentModel: typeof Document,
        private readonly storageService: StorageService
    ) {}

    async getAllDocuments(): Promise<Document[]> {
        return this.documentModel.findAll();
    }

    async searchByCustomer(customerId: UUID, payload: SearchPayload) {
        if (!payload.criteria) {
            payload.criteria = []
        }

        payload.criteria.push({
            field: 'customerId',
            operator: '=',
            value: customerId
        });

        return await findByCriteria(payload.criteria, Document, payload.addition, {
            option: 'manual',
            includeOption: []
        }, null);
    }

    async searchBySPSO(payload: SearchPayload) {
        return await findByCriteria(payload.criteria, Document, payload.addition, {
            option: 'manual',
            includeOption: [
                { 
                    model: Customer,
                    attributes: ['id', 'username', 'email', 'firstName', 'lastName']
                }
            ]
        }, null);
    }

    async searchDocuments(
        name?: string,
        mimeType?: string,
        numPages?: number
    ): Promise<Document[]> {
        const whereClause: any = {};

        if (name) {
            whereClause['name'] = name;
        }

        if (mimeType) {
            whereClause['mimeType'] = mimeType;
        }

        if (numPages) {
            whereClause['numPages'] = numPages;
        }

        return this.documentModel.findAll({
            where: whereClause
        });
    }

    async getById(id: string) {
        return await this.documentModel.findByPk(id,
        { 
            include: [ 
                { 
                    model: Customer, 
                    attributes: ['id', 'username', 'email', 'firstName', 'lastName']
                }]
        })
    }

    async getDocumentByIdAndCustomerId(id: string, customerId: UUID) {
        return await this.documentModel.findOne({where:{id, customerId}})
    }

    async upload(files: Express.Multer.File[], customerId: UUID) {
        if (!files || files.length == 0) {
            throw new BadRequestException('File không được để trống');
        }

        const createdDocuments = [];

        for (const file of files) {
            const baseUploadsDir = process.env.BASE_UPLOADS_DIR || 'src/modules/storage/uploads';
            const pathName = path.join(baseUploadsDir);
            const fileName = this.storageService.generateFileName(file.originalname);
            const filePath = path.join(pathName, fileName);
            this.storageService.save(filePath, file);
            const pdfData = await pdfParse(file.buffer);
            const numPages = pdfData.numpages;

            const createdDocument = await this.documentModel.create({
                customerId,
                mimeType: file.mimetype,
                numPages,
                name: file.originalname,
                path: filePath
            });

            createdDocuments.push(createdDocument);
        }

        return createdDocuments;
    }

    async download(id: UUID) {
        const existedFile = await this.documentModel.findByPk(id);

        if (!existedFile || !existedFile.path) {
            throw new NotFoundException('File không tồn tại');
        }

        return this.storageService.getFileByPath(existedFile.path);
    }

    async updateDocument(id: string, data: CreateDocumentDto) {
        return await this.documentModel.update(data, { where: { id } })
    }

    async remove(id: string) {
        const existedDocument = await this.documentModel.findByPk(id);

        if (!existedDocument) {
            throw new NotFoundException('Tài liệu không tồn tại');
        }

        await this.storageService.remove(existedDocument.path);

        await this.documentModel.destroy({ where: { id } });
    }
}