import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DocumentRepository } from "./document.repository";
import { CreateDocumentDto } from "./document.dto";
import { Response } from "../response/response.entity";

@Injectable()
export class DocumentService {
    constructor(
        private readonly documentRepository: DocumentRepository,
        private readonly response: Response
    ) { }

    async getDocumentById(id: string) {
        try {
            const document = await this.documentRepository.getDocumentById(id);
            if (!document) {
                this.response.initResponse(false, "Could not get Document by Id.", null);
                throw new HttpException(this.response, HttpStatus.BAD_REQUEST);
            }
            this.response.initResponse(true, "Get Document by Id successfully.", { document });
            return this.response;
        } catch (error) {
            if (!(error instanceof HttpException)) {
                this.response.initResponse(false, "An unexpected error occurred.", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            throw error;
        }
    }

    async getDocumentsByPage(pageNumber: number, pageSize: number) {
        try {
            const offset = (pageNumber - 1) * pageSize;
            const documents = await this.documentRepository.getDocumentsByPage(pageSize, offset);
            if (!documents) {
                this.response.initResponse(false, "Could not get Document by Page.", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            this.response.initResponse(true, "Get Document by Page successfully.", documents);
            return this.response;
        } catch (error) {
            throw error;
        }
    }

    async createDocument(data: CreateDocumentDto) {
        try {
            const user = await this.documentRepository.findUser(data.customerId)
            if (!user) {
                this.response.initResponse(false, "Could not create Document (Customer is not in database).", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const document = await this.documentRepository.createDocument(data);
            if (!document) {
                this.response.initResponse(false, "Could not create Document.", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            this.response.initResponse(true, "Create Document successfully.", document)
            return this.response;
        } catch (error) {
            throw error;
        }
    }

    async updateDocument(id: string, data: CreateDocumentDto) {
        try {
            const availableDocument = await this.documentRepository.getDocumentById(id)
            if (!availableDocument) {
                this.response.initResponse(false, "Could not update Document (Invalid Id).", null);
                throw new HttpException(this.response, HttpStatus.BAD_REQUEST);
            }
            const user = await this.documentRepository.findUser(data.customerId)
            if (!user) {
                this.response.initResponse(false, "Could not create Document (Customer is not in database).", null);
                throw new HttpException(this.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const updatedDocument = await this.documentRepository.updateDocument(availableDocument, data);
            this.response.initResponse(true, "Update Document successfully.", updatedDocument);
            return this.response;
        } catch (error) {
            throw error;
        }
    }

    async deleteDocument(id: string) {
        try {
            const document = await this.documentRepository.getDocumentById(id);
            if (!document) {
                this.response.initResponse(false, "Document not found.", null);
                throw new HttpException(this.response, HttpStatus.NOT_FOUND);
            }
            await this.documentRepository.deleteDocument(id);
            this.response.initResponse(true, "Document deleted successfully.", null);
            return this.response;
        } catch (error) {
            throw error;
        }
    }
}