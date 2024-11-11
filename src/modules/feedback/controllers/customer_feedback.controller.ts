import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards, UsePipes } from "@nestjs/common";
import { CustomerFeedbackService } from "../services/customer_feedback.service";
import { CreateCustomerFeedbackDto } from "../dtos/customer_feedback.dto";
import { JwtAuthGuard } from "src/common/guards/authenticate.guard";
import { Response } from "../../response/response.entity";
import { Role } from "src/common/contants";
import { AuthorizeGuard } from "src/common/guards/authorize.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UUID } from "crypto";
import { SearchPayload } from "src/common/interfaces/search_payload.interface";
import { ValidateInputPipe } from "src/common/pipes/validate.pipe";

@Controller('feedback')
export class CustomerFeedbackController {
    constructor(
        private readonly customerFeedbackService: CustomerFeedbackService,
        private readonly response: Response
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('search/:id')
    async searchById(@Res() res, @Req() req, @Param('id') id: UUID) {
        try {
            let feedback = null;
            if (req.user.role === Role.CUSTOMER) {
                feedback = await this.customerFeedbackService.getByIdAndCustomerId(id, req.user.id);
            }
            else {
                feedback = await this.customerFeedbackService.getById(id);
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
                feebacks = await this.customerFeedbackService.searchByCustomer(payload, req.user.id);
            }
            else {
                feebacks = await this.customerFeedbackService.search(payload);
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
    @Roles(Role.CUSTOMER)
    @UsePipes(ValidateInputPipe)
    @Post('create')
    async create(@Body() dto: CreateCustomerFeedbackDto, @Res() res, @Req() req) {
        try {
            const customerFeedback = await this.customerFeedbackService.create(dto, req.user.id);
            this.response.initResponse(true, "Create feedback successfully", customerFeedback);
            return res.status(HttpStatus.CREATED).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @UseGuards(JwtAuthGuard, AuthorizeGuard)
    @Roles(Role.CUSTOMER)
    @UsePipes(ValidateInputPipe)
    @Put('update/:id')
    async update(@Param('id') id: UUID, @Body() dto: CreateCustomerFeedbackDto, @Res() res, @Req() req) {
        try {
            const customerFeedback = await this.customerFeedbackService.update(id, req.user.id, dto);
            this.response.initResponse(true, "Update successfully", customerFeedback);
            return res.status(HttpStatus.OK).json(this.response);
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
    @Delete('delete/:id')
    async destroy(@Param('id') id: UUID, @Res() res, @Req() req) {
        try {
            if (req.user.role === Role.CUSTOMER) {
                await this.customerFeedbackService.destroyByIdAndCustomerId(id, req.user.id);
            }
            else {
                await this.customerFeedbackService.destroy(id);
            }
            
            this.response.initResponse(true, "Delete feedback successfully", null);
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