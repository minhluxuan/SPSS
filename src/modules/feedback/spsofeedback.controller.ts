import { Body, Controller, Delete, ForbiddenException, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { SpsoFeedbackService } from "./spsofeedback.service";
import { JwtAuthGuard } from "src/common/guards/authenticate.guard";
import { Response } from "../response/response.entity";
import { Role } from "src/common/contants";
import { CreateSpsoFeedbackDto } from "./spsofeedback.dto";
import { UUID } from "crypto";
@UseGuards(JwtAuthGuard)
@Controller('spsoFeedback')
export class SpsoFeedbackController {
    constructor(
        private readonly spsoFeedbackService: SpsoFeedbackService,
        private readonly response: Response
    ) { }

    @Get('')
    async getAllSpsoFeedbacks(@Res() res, @Req() req) {
        try {
            const spsoFeedback = await this.spsoFeedbackService.getAllSpsoFeedbacks();
            if (!spsoFeedback) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Get all successfully", spsoFeedback);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Get('results')
    async getSpsoFeedbackBySpsoIdFeedbackId(@Res() res, @Req() req, @Query('spsoId') spsoId?: string, @Query('feedbackId') feedbackId?: string) {
        try {
            const spsoFeedback = await this.spsoFeedbackService.getSpsoFeedbackBySpsoIdFeedbackId(spsoId, feedbackId);
            if (!spsoFeedback) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Get successfully", spsoFeedback);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }


    @Post('')
    async createSpsoFeedback(@Body() data: CreateSpsoFeedbackDto, @Res() res, @Req() req, @Query('feedbackId') customerFeedbackId:UUID) {
        try {
            if (req.user.role !== Role.SPSO) {throw new ForbiddenException("User's role is not allowed to use this.")}
            const customerFeedback = await this.spsoFeedbackService.createSpsoFeedback(data, req.user.id, customerFeedbackId);
            if (!customerFeedback) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Create successfully", customerFeedback);
            return res.status(HttpStatus.CREATED).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Put('')
    async updateSpsoFeedback(@Body() data: CreateSpsoFeedbackDto, @Res() res, @Req() req, @Query('feedbackId') customerFeedbackId:UUID) {
        try {
            if (req.user.role !== Role.SPSO) {throw new ForbiddenException("User's role is not allowed to use this.")}
            const customerFeedback = await this.spsoFeedbackService.updateSpsoFeedback(data, req.user.id, customerFeedbackId);
            if (!customerFeedback) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Create successfully", customerFeedback);
            return res.status(HttpStatus.CREATED).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Delete('')
    async deleteSpsoFeedback(@Param('id') id: string, @Res() res, @Req() req, @Query('feedbackId') customerFeedbackId:UUID) {
        try {
            if (req.user.role !== Role.SPSO) {throw new ForbiddenException("User's role is not allowed to use this.")}
            const spsoFeedback = await this.spsoFeedbackService.deleteSpsoFeedback(req.user.id, customerFeedbackId);
            if (!spsoFeedback) {
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