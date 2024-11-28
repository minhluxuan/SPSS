import { Controller, HttpStatus, Post, Body, Get, Param, Patch, Delete, Put, Res, Query, UseGuards, Req, BadRequestException, NotFoundException, UsePipes } from '@nestjs/common';
import { PrintingOrderService } from '../services/printing_order.service';
import { Response } from "src/modules/response/response.entity";
import { CreateOrderDto } from '../dtos/create_order.dto';
import { UpdateOrderDto } from '../dtos/update_order.dto';
import { PrintingStatus, PurchasingStatus, Role} from '../../../common/contants/index';
import { JwtAuthGuard } from 'src/common/guards/authenticate.guard';
import { AuthorizeGuard } from 'src/common/guards/authorize.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UUID } from 'crypto';
import { SearchPayload } from 'src/common/interfaces/search_payload.interface';
import { GetReportDto } from '../dtos/get_report.dto';
import { ValidateInputPipe } from 'src/common/pipes/validate.pipe';
@Controller('printing_order')
export class PrintingOrderController {
    constructor(
        private readonly response : Response,
        private readonly printingOrderService: PrintingOrderService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('search')
    async search(
        @Req() req,
        @Res() res,
        @Body() payload: SearchPayload
    ) {
        try {
            let orders = [];
            if (req.user.role === Role.CUSTOMER) {
                orders = await this.printingOrderService.searchByCustomer(payload, req.user.id);
            }
            else {
                orders = await this.printingOrderService.search(payload);
            }

            this.response.initResponse(true, 'Search orders successfully', orders);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.error('Error searching for orders:', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Error searching for orders' });
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('search/:id')
    async findById(@Param('id') id: string, @Res() res) {
        try {
            const order = await this.printingOrderService.findById(id);
            this.response.initResponse(true, "Find successfully", order);
            return res.status(HttpStatus.OK).json(this.response);
        } catch(error) {
            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Req() req, @Body() CreateOrderDto: CreateOrderDto, @Res() res) {
        try {
            const order = await this.printingOrderService.create(CreateOrderDto, req.user.id);
            this.response.initResponse(true, "Create order successfully", order);
            return res.status(HttpStatus.OK).json(this.response);
        } catch(error) {
            if (error instanceof BadRequestException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.BAD_REQUEST).json(this.response);
            }

            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @UseGuards(JwtAuthGuard, AuthorizeGuard)
    @Roles(Role.SPSO)
    @Get('confirm_status')
    async confirmStatus(@Query('id') id: UUID, @Query('status') status: PrintingStatus, @Res() res) {
        try {
            const updatedOrder = await this.printingOrderService.confirmStatus(id, status);
            this.response.initResponse(true, 'Confirm order status successfully', updatedOrder);
            return res.status(HttpStatus.CREATED).json(this.response);
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            }

            if (error instanceof BadRequestException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.BAD_REQUEST).json(this.response);
            }

            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('udpate/:id')
    async updateOrder(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
        @Res() res
    ) {
        try {
            const update = await this.printingOrderService.update(id, updateOrderDto);
            this.response.initResponse(true, "Update printing order successfully", update);
            return res.status(HttpStatus.OK).json(this.response);
        } catch(error) {
            if (error instanceof NotFoundException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            }

            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Delete('delete/:id')
    async deleteOrder(@Param('id') id: UUID, @Res() res) {
        try {
            await this.printingOrderService.destroy(id);
            this.response.initResponse(true, 'Delete printing order successfully', null);
            return res.status(HttpStatus.OK).json(this.response);
        } catch(error) {
            if (error instanceof NotFoundException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            }

            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @UsePipes(ValidateInputPipe)
    @UsePipes(ValidateInputPipe)
    @Post('report')
    async getReport(@Body() dto: GetReportDto, @Res() res) {
        try {
            const report = await this.printingOrderService.getPrinterReport(dto.printerId, { day: dto.day, month: dto.month } );
            this.response.initResponse(true, 'Get report successfully', report);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            }

            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
}