import { Injectable } from "@nestjs/common";
import { DocumentRepository } from "./document.repository";

@Injectable()
export class DocumentService {
    constructor(private readonly documentRepository: DocumentRepository) {}

    async createDocument(data: { name: string; mimeType: string; numPages: number }){
        try {
            // Pass the received data to the repository method
            return await this.documentRepository.createDocument(data);
        } catch (error) {
            console.error('Error in DocumentService:', error);
            throw new Error('Could not create document in service');
        }
    }
}