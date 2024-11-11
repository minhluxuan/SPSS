import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query, Req, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { CreateDocumentDto } from "./document.dto";
import { Response } from "../response/response.entity";
import { JwtAuthGuard } from "src/common/guards/authenticate.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CustomParseFilePipe } from "src/common/pipes/custome_parse_file.pipe";
import { UUID } from "crypto";
import { Role } from "src/common/contants";
import { SearchPayload } from "src/common/interfaces/search_payload.interface";
import { AuthorizeGuard } from "src/common/guards/authorize.guard";

@UseGuards(JwtAuthGuard)
@Controller('document')
export class DocumentController {
    constructor(
        private readonly documentService: DocumentService,
        private readonly response: Response
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('search')
    async searchDocument(
        @Res() res,
        @Req() req,
        @Body() payload: SearchPayload
    ) {
        try {
            let documents = [];

            if (req.user.role == Role.CUSTOMER) {
                documents = await this.documentService.searchByCustomer(req.user.id, payload);
            }
            else {
                documents = await this.documentService.searchBySPSO(payload);
            }

            this.response.initResponse(true, "Search documents successfully", documents);
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
            const document = await this.documentService.getById(id);
            this.response.initResponse(true, "Get file successfully", document);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @UseGuards(JwtAuthGuard, AuthorizeGuard)
    @Roles(Role.CUSTOMER)
    @UseInterceptors(FilesInterceptor("file"))
    @Post('upload')
    async upload(
        @Res() res,
        @Req() req,
        @UploadedFiles(new CustomParseFilePipe({
            maxSize: 50000000,
            fileTypes: ['application/pdf']
        })) files: Express.Multer.File[]
    ) {
        try {
            console.log(req.user.role);
            const createdDocuments = await this.documentService.upload(files, req.user.id);
            this.response.initResponse(true, "Create successfully", createdDocuments);
            return res.status(HttpStatus.CREATED).json(this.response);
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.BAD_REQUEST).json(this.response);
            }

            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor("file"))
    @Get('download/:id')
    async download (
        @Res() res,
        @Param('id') id: UUID
    ) {
        try {
            const file = await this.documentService.download(id);
            file.getStream().pipe(res);   
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            }

            console.log(error);
            this.response.initResponse(false, "Internal server error", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Delete('delete/:id')
    async deleteDocument(@Param('id') id: string, @Res() res, @Req() req) {
        try {
            await this.documentService.remove(id);
            this.response.initResponse(true, "Delete document successfully", null);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            }

            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
}