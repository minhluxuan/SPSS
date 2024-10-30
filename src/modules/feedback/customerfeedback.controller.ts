import { Body, Controller, Delete, ForbiddenException, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { CustomerFeedbackService } from "./customerfeedback.service";
import { CreateCustomerFeedbackDto } from "./customerfeedback.dto";
import { JwtAuthGuard } from "src/common/guards/authenticate.guard";
import { Response } from "../response/response.entity";

@UseGuards(JwtAuthGuard)
@Controller('customerFeedback')
export class CustomerFeedbackController {
    constructor(
        private readonly customerFeedbackService: CustomerFeedbackService,
        private readonly response: Response
    ) { }

    @Get('')
    async getAllCustomerFeedbacks(@Res() res) {
        try {
            const customerFeedback = await this.customerFeedbackService.getAllCustomerFeedbacks();
            if (!customerFeedback) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Get all successfully", customerFeedback);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }


    @Get(':id')
    async getCustomerFeedbackById(@Res() res, @Req() req, @Param('id') id: string) {
        try {
            const customerFeedback = await this.customerFeedbackService.getCustomerFeedbackById(id);
            if (!customerFeedback) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Get successfully", customerFeedback);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }


    @Post('')
    async createCustomerFeedback(@Body() data: CreateCustomerFeedbackDto, @Res() res, @Req() req) {
        try {
            const customerFeedback = await this.customerFeedbackService.createCustomerFeedback(data, req.user.id);
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

    @Put(':customerFeedbackId')
    async updateCustomerFeedback(@Param('customerFeedbackId') id: string, @Body() data: CreateCustomerFeedbackDto, @Res() res, @Req() req) {
        try {
            if (!await this.customerFeedbackService.getCustomerFeedbackByIdAndCustomerId(id, req.user.id)) {
                throw new ForbiddenException("User is not allowed to access this resource or Resourse doesn't exist");
            }

            const customerFeedback = await this.customerFeedbackService.updateCustomerFeedback(id, data);
            if (!customerFeedback) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }

            this.response.initResponse(true, "Update successfully", customerFeedback);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Delete(':id')
    async deleteCustomerFeedback(@Param('id') id: string, @Res() res, @Req() req) {
        try {
            if (!await this.customerFeedbackService.getCustomerFeedbackByIdAndCustomerId(id, req.user.id)) {
                throw new ForbiddenException("User is not allowed to access this resource or Resourse doesn't exist");
            }
            const customerFeedback = await this.customerFeedbackService.deleteCustomerFeedback(id);
            if (!customerFeedback) {
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