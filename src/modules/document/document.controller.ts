import { Body, Controller, Post } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { catchError } from "rxjs";
import { error } from "console";

@Controller()
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @Post()
    async createDocument(@Body() createDocumentDto: { name: string; mimeType: string; numPages: number }){
        try {
            // Pass the received data to the service method
            return await this.documentService.createDocument(createDocumentDto);
        } catch (error) {
            console.error('Error in DocumentController:', error);
            throw new Error('Could not create document in controller');
        }
    }   
}