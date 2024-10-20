import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Document } from "./document.entity";

@Injectable()
export class DocumentRepository {
    constructor(
        @Inject('DocumentModel')
        private readonly documentModel: typeof Document,
    ) {}

    async createDocument(data: Partial<Document>): Promise<Document> {
        try {
            // Call the Sequelize create method to insert the new document into the database
            return await this.documentModel.create(data);
        } catch (error) {
            console.error('Error creating document:', error);
            throw new Error('Could not create document');
        }
    }
}