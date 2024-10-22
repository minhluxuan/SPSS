import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { CreateDocumentDto } from "./document.dto";

@Controller('document')
export class DocumentController {
    constructor(
        private readonly documentService: DocumentService,
    ) { }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getDocumentById(@Param('id') id: string) {
        return await this.documentService.getDocumentById(id);
    }

    @Get('page/:pageNumber')
    @HttpCode(HttpStatus.OK)
    async getDocumentsByPage(@Param('pageNumber') pageNumber: number) {
        const pageSize = 5;
        return await this.documentService.getDocumentsByPage(pageNumber, pageSize);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createDocument(@Body() data: CreateDocumentDto) {
        return await this.documentService.createDocument(data);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateDocument(@Param('id') id:string, @Body() data: CreateDocumentDto) {
        return await this.documentService.updateDocument(id, data);
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteDocument(@Param('id') id:string) {
        return await this.documentService.deleteDocument(id);
    }
}