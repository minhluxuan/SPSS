import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateDocumentDto } from "./document.dto";
import { Document } from "./document.entity";
import { CustomerService } from "../user/services/customer.service";
import { UUID } from "crypto";

@Injectable()
export class DocumentService {
    constructor(
        @Inject('DOCUMENT_REPOSITORY')
        private readonly documentModel: typeof Document
    ) { }

    async getAllDocuments(): Promise<Document[]> {
        return this.documentModel.findAll();
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

    async getDocumentById(id: string) {
        return await this.documentModel.findByPk(id)
    }

    async getDocumentByIdAndCustomerId(id: string, customerId: UUID) {
        return await this.documentModel.findOne({where:{id, customerId}})
    }

    async getDocumentsByPage(pageNumber: number, pageSize: number) {
        const offset = (pageNumber - 1) * pageSize
        return await this.documentModel.findAll(
            {
                limit: pageSize,
                offset: offset
            }
        )
    }

    async createDocument(data: CreateDocumentDto, id: UUID) {
        return await this.documentModel.create({ ...data, customerId: id });
    }

    async updateDocument(id: string, data: CreateDocumentDto) {
        return await this.documentModel.update(data, { where: { id } })
    }

    async deleteDocument(id: string) {
        return await this.documentModel.destroy({ where: { id } })
    }
}