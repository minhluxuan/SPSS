import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards, UsePipes } from "@nestjs/common";
import { SpsoFeedbackService } from "../services/spso_feedback.service";
import { JwtAuthGuard } from "src/common/guards/authenticate.guard";
import { Response } from "../../response/response.entity";
import { Role } from "src/common/contants";
import { CreateSpsoFeedbackDto } from "../dtos/create_spso_feedback.dto";
import { UUID } from "crypto";
import { AuthorizeGuard } from "src/common/guards/authorize.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { ValidateInputPipe } from "src/common/pipes/validate.pipe";
import { UpdateFeedbackResponseDto } from "../dtos/update_response.dto";
import { SearchPayload } from "src/common/interfaces/search_payload.interface";

@Controller('feedback_response')
export class SpsoFeedbackController {
    constructor(
        private readonly spsoFeedbackService: SpsoFeedbackService,
        private readonly response: Response
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('search_by_feedback_id_and_spso_id')
    async searchByPk(@Res() res, @Req() req, @Query('feedbackId') feedbackId: UUID, @Query('spsoId') spsoId?: UUID) {
        try {
            let feedback = null;
            if (req.user.role === Role.CUSTOMER) {
                feedback = await this.spsoFeedbackService.getByFeedbackIdAndSpsoIdAndCustomerId(feedbackId, spsoId, req.user.id);
            }
            else {
                feedback = await this.spsoFeedbackService.getByFeedbackIdAndSpsoId(feedbackId, req.user.id);
            }

            this.response.initResponse(true, "Get successfully", feedback);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('search')
    async search(@Res() res, @Req() req, @Body() payload: SearchPayload) {
        try {
            let feebacks = [];
            if (req.user.role === Role.CUSTOMER) {
                feebacks = await this.spsoFeedbackService.searchByCustomer(payload, req.user.id);
            }
            else {
                feebacks = await this.spsoFeedbackService.searchBySpso(payload, req.user.id);
            }

            this.response.initResponse(true, 'Search feedbacks successfully', feebacks);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @UseGuards(JwtAuthGuard, AuthorizeGuard)
    @Roles(Role.SPSO)
    @UsePipes(ValidateInputPipe)
    @Post('create')
    async create(@Body() dto: CreateSpsoFeedbackDto, @Res() res, @Req() req) {
        try {
            const customerFeedback = await this.spsoFeedbackService.create(dto, req.user.id);
            this.response.initResponse(true, "Create feedback response successfully", customerFeedback);
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

    @UseGuards(JwtAuthGuard, AuthorizeGuard)
    @Roles(Role.SPSO)
    @Put('update/:feedbackId')
    async update(@Param('feedbackId') feedbackId: UUID, @Body() dto: UpdateFeedbackResponseDto, @Res() res, @Req() req) {
        try {
            const updatedResponse = await this.spsoFeedbackService.update(dto, feedbackId, req.user.id);
            this.response.initResponse(true, "Update response successfully", updatedResponse);
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

    @UseGuards(JwtAuthGuard, AuthorizeGuard)
    @Roles(Role.SPSO)
    @Delete('delete/:feedbackId')
    async delete(@Param('feedbackId') feedbackId: UUID, @Res() res, @Req() req) {
        try {
            await this.spsoFeedbackService.destroy(feedbackId, req.user.id);
            this.response.initResponse(true, "Delete successfully", null);
            return res.status(HttpStatus.NO_CONTENT).json(this.response);
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
}