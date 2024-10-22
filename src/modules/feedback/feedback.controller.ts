import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { FeedbackService, SPSPOnFeedbackService } from "./feedback.service";
import { CreateFeedbackDto, CreateSPSPOnFeedbackDto } from "./feedback.dto";

@Controller('feedback')
export class FeedbackController{
    constructor(
        private readonly feedbackService:FeedbackService
    ){}
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getFeedbackById(@Param('id') id: string) {
        return await this.feedbackService.getFeedbackById(id);
    }

    @Get('page/:pageNumber')
    @HttpCode(HttpStatus.OK)
    async getFeedbacksByPage(@Param('pageNumber') pageNumber: number) {
        const pageSize = 5;
        return await this.feedbackService.getFeedbacksByPage(pageNumber, pageSize);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createFeedback(@Body() data: CreateFeedbackDto) {
        return await this.feedbackService.createFeedback(data);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateFeedback(@Param('id') id:string, @Body() data: CreateFeedbackDto) {
        return await this.feedbackService.updateFeedback(id, data);
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteFeedback(@Param('id') id:string) {
        return await this.feedbackService.deleteFeedback(id);
    }
}



@Controller('spsponfeedback')
export class SPSPOnFeedbackController{
    constructor(
        private readonly spspOnFeedbackService: SPSPOnFeedbackService,
    ) { }
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getSPSPOnFeedbackById(@Param('id') id: string) {
        return await this.spspOnFeedbackService.getSPSPOnFeedbackById(id);
    }

    @Get('page/:pageNumber')
    @HttpCode(HttpStatus.OK)
    async getSPSPOnFeedbacksByPage(@Param('pageNumber') pageNumber: number) {
        const pageSize = 5;
        return await this.spspOnFeedbackService.getSPSPOnFeedbacksByPage(pageNumber, pageSize);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createSPSPOnFeedback(@Body() data: CreateSPSPOnFeedbackDto) {
        return await this.spspOnFeedbackService.createSPSPOnFeedback(data);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async updateSPSPOnFeedback(@Param('id') id:string, @Body() data: CreateSPSPOnFeedbackDto) {
        return await this.spspOnFeedbackService.updateSPSPOnFeedback(id, data);
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteSPSPOnFeedback(@Param('id') id:string) {
        return await this.spspOnFeedbackService.deleteSPSPOnFeedback(id);
    }
}