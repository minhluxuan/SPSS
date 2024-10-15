import { Controller, HttpStatus, Post, Body, Get, Param, Patch, Delete, Put, Res } from '@nestjs/common';
import { PrintingOrderService } from '../services/printing_order.service';
import { Response } from "src/modules/response/response.entity";
import { CreateOrderDto } from '../dtos/create_order.dto';
import { UpdateOrderDto } from '../dtos/update_order.dto';
@Controller('printing-order')
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

    @Post()
    async createOrder(@Body() CreateOrderDto: CreateOrderDto, @Res() res) {
        try {
            const order = await this.printingOrderService.createOrder(CreateOrderDto);
            if (!order){
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Create successfully", order);
            return res.status(HttpStatus.OK).json(this.response);
        } catch(error) {
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
            const update = this.printingOrderService.updateOrder(id, updateOrderDto);
            if (!update){
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Update successfully", update);
            return res.status(HttpStatus.OK).json(this.response);
        } catch(error) {
            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Delete(':id')
    async deleteOrder(@Param('id') id: string, @Res() res) {
        try {
            const del = this.printingOrderService.deleteOrder(id);
            if (!del){
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }
            this.response.initResponse(true, "Delete successfully", del);
            return res.status(HttpStatus.OK).json(this.response);
        } catch(error) {
            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

}