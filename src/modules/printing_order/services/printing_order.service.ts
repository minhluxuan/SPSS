import { Inject,Injectable, NotAcceptableException } from "@nestjs/common";
import { PrintingOrder } from "../printing_order.entity";
import { PaperOrientation, PaperSize, PrintingStatus, ORDER_REPOSITORY } from "src/common/contants"; 
import { CreateOrderDto } from "../dtos/create_order.dto";
import { UpdateOrderDto } from "../dtos/update_order.dto";
@Injectable()
export class PrintingOrderService{
    constructor (
        @Inject(ORDER_REPOSITORY) 
        private readonly printingOrderModel : typeof PrintingOrder
    ) {}

    async createOrder(createOrderDto: CreateOrderDto ): Promise <PrintingOrder>{
        const orderData = {
            ...createOrderDto,
        }
        const newOrder = await this.printingOrderModel.create(orderData);
        return newOrder;
    }

    async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<PrintingOrder> {
        const order = await this.printingOrderModel.findByPk(id);
        if (!order) {
            throw new Error('Order not found');
        }
        // Update the existing order with the new data
        
        return order.update(updateOrderDto);;
    }

    async findAllOrders(): Promise<PrintingOrder[]> {
        return this.printingOrderModel.findAll();
    }

    async findOrderById(id: string): Promise<PrintingOrder> {
        const order = await this.printingOrderModel.findByPk(id);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }

    async deleteOrder(id: string): Promise<void> {
        const order = await this.printingOrderModel.findByPk(id);
        if (!order) {
            throw new Error('Order not found');
        }
        await order.destroy();
    }

}