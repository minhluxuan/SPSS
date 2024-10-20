import { Inject,Injectable, NotAcceptableException } from "@nestjs/common";
import { PrintingOrder } from "../printing_order.entity";
import { PaperOrientation, PaperSize, PrintingStatus, PurchasingStatus, ORDER_REPOSITORY } from "src/common/contants"; 
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
        try {
            const newOrder = await this.printingOrderModel.create(orderData);
            return newOrder;
        }catch(error){
            console.error('Error creating the order:', error);
            return null; // Save failed
        }
    }

    //System Service only
    async updateOrderStatus(id: string, printingStatus: PrintingStatus, purchasingStatus: PurchasingStatus): Promise<PrintingOrder> {
        const order = await this.printingOrderModel.findByPk(id);
        if (!order) {
            throw new Error('Order not found');
        }
    
        // Update only status
        order.printingStatus = printingStatus ?? order.printingStatus;
        order.purchasingStatus = purchasingStatus ?? order.purchasingStatus;
    
        try {
            const savedOrder = await order.save();

            if (savedOrder) {
                return savedOrder; // Successfully updated
            } else {
                return null; // Save failed
            }
        } catch (error) {
            console.error('Error saving the order:', error);
            return null; // Save failed
        }
    }
    

    //User Service only
    async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<PrintingOrder> {
        const order = await this.printingOrderModel.findByPk(id);
        if (!order) {
            throw new Error('Order not found');
        }
        //Only updated if purchasing status and printing status is pending
        if (order.printingStatus === PrintingStatus.PENDING && order.purchasingStatus === PurchasingStatus.PENDING) {
            // Allow the user to update
            order.numFaces = updateOrderDto.numFaces ?? order.numFaces;
            order.size = updateOrderDto.size ?? order.size;
            order.orientation = updateOrderDto.orientation ?? order.orientation;
            try {
                const savedOrder = await order.save();

                if (savedOrder) {
                    return savedOrder; // Successfully updated
                } else {
                    return null; // Save failed
                }
            } catch (error) {
                console.error('Error saving the order:', error);
                return null; // Save failed
            }
        } else {
            console.log("Only updated if purchasing status and printing status is pending");
            return null;
        }
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

    async deleteOrder(id: string): Promise<boolean> {
        const order = await this.printingOrderModel.findByPk(id);
        if (!order) {
            console.log('Order not found');
            return false;
        }
        try{
            await order.destroy();
            return true;
        }catch(error){
            return false;
        }
    }
}