import { Controller, HttpStatus, Post, Body, Get, Param, Patch, Delete, Put, Res, Query, UseGuards, Req, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrintingOrderService } from '../services/printing_order.service';
import { Response } from "src/modules/response/response.entity";
import { CreateOrderDto } from '../dtos/create_order.dto';
import { UpdateOrderDto } from '../dtos/update_order.dto';
import { PrintingStatus, PurchasingStatus, Role} from '../../../common/contants/index';
import { JwtAuthGuard } from 'src/common/guards/authenticate.guard';
import { AuthorizeGuard } from 'src/common/guards/authorize.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UUID } from 'crypto';
@Controller('printing_order')
export class PrintingOrderController {
    constructor(
        private readonly response : Response,
        private readonly printingOrderService: PrintingOrderService
    ) {}

    @Get()
    async findAllOrders(@Res() res) {
        try {
            const order = await this.printingOrderService.findAllOrders();
            if (!order){
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Find all successfully", order);
            return res.status(HttpStatus.OK).json(this.response);
        } catch(error) {
            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
    // Search by query printingStatus or purchasingStatus
    @Get('search')
    async searchOrders(
        @Res() res,
        @Query('printingStatus') printingStatus?: PrintingStatus,
        @Query('purchasingStatus') purchasingStatus?: PurchasingStatus, 
    ) {
        try {
            const orders = await this.printingOrderService.searchOrders(printingStatus, purchasingStatus);
            return res.status(200).json(orders);
        } catch (error) {
            console.error('Error searching for orders:', error);
            return res.status(500).json({ success: false, message: 'Error searching for orders' });
        }
    }

    // GET /printing-orders/:id
    @Get(':id')
    async findOrderById(@Param('id') id: string, @Res() res) {
        try {
            const order = await this.printingOrderService.findOrderById(id);
            if (!order){
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
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
    async confirmDone(@Query('id') id: UUID, @Query('status') status: PrintingStatus, @Res() res) {
        try {
            const updatedOrder = await this.printingOrderService.confirmStatus(id, status);
            this.response.initResponse(true, 'Xác nhận trạng thái đơn hàng thành công', updatedOrder);
            return res.status(HttpStatus.CREATED).json(this.response);
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

    @Put(':id')
    async updateOrder(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
        @Res() res
    ) {
        try {
            const update = await this.printingOrderService.updateOrder(id, updateOrderDto);
            if (update == null){
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            } else if (update) {
                this.response.initResponse(true, "Update successfully", update);
                return res.status(HttpStatus.OK).json(this.response);
            }
        } catch(error) {
            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Delete(':id')
    async deleteOrder(@Param('id') id: string, @Res() res) {
        try {
            const del = await this.printingOrderService.deleteOrder(id);
            if (del == false){
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            if (del == true){
                this.response.initResponse(true, "Delete successfully", del);
                return res.status(HttpStatus.OK).json(this.response);
            }
        } catch(error) {
            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

}