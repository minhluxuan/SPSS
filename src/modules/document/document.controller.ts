import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { CreateDocumentDto } from "./document.dto";
import { Response } from "../response/response.entity";
import { JwtAuthGuard } from "src/common/guards/authenticate.guard";

@UseGuards(JwtAuthGuard)
@Controller('document')
export class DocumentController {
    constructor(
        private readonly documentService: DocumentService,
        private readonly response: Response
    ) { }

    @Get('')
    async getAllDocuments(@Res() res) {
        try {
            const document = await this.documentService.getAllDocuments();
            if (!document) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Get all successfully", document);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Get('search')
    async searchDocument(
        @Res() res,
        @Req() req,
        @Query('name') name?: string,
        @Query('mimeType') mimeType?: string,
        @Query('numPages') numPages?: number
    ) {
        try {
            const document = await this.documentService.searchDocuments(name, mimeType, numPages);
            if (!document) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Get all successfully", document);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Get(':id')
    async getDocumentById(@Res() res, @Req() req, @Param('id') id: string) {
        try {
            const document = await this.documentService.getDocumentById(id);
            if (!document) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Get successfully", document);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }


    @Post('')
    async createDocument(@Body() data: CreateDocumentDto, @Res() res, @Req() req) {
        try {
            const document = await this.documentService.createDocument(data, req.user.id);
            if (!document) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Create successfully", document);
            return res.status(HttpStatus.CREATED).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Put(':documentId')
    async updateDocument(@Param('documentId') id: string, @Body() data: CreateDocumentDto, @Res() res, @Req() req) {
        try {
            if (!await this.documentService.getDocumentByIdAndCustomerId(id, req.user.id)) {
                throw new ForbiddenException("User is not allowed to access this resource or Resourse doesn't exist");
            }

            const document = await this.documentService.updateDocument(id, data);
            if (!document) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }

            this.response.initResponse(true, "Update successfully", document);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Delete(':id')
    async deleteDocument(@Param('id') id: string, @Res() res, @Req() req) {
        try {
            if (!await this.documentService.getDocumentByIdAndCustomerId(id, req.user.id)) {
                throw new ForbiddenException("User is not allowed to access this resource or Resourse doesn't exist");
            }
            const document = await this.documentService.deleteDocument(id);
            if (!document) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Delete successfully", null);
            return res.status(HttpStatus.NO_CONTENT).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
}