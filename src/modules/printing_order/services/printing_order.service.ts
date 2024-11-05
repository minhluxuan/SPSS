import { BadRequestException, Inject,Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { PrintingOrder } from "../printing_order.entity";
import { PaperOrientation, PaperSize, PrintingStatus, PurchasingStatus, ORDER_REPOSITORY, DOCUMENT_REPOSITORY, PRINTER_REPOSITORY } from "src/common/contants"; 
import { CreateOrderDto } from "../dtos/create_order.dto";
import { UpdateOrderDto } from "../dtos/update_order.dto";
import { UUID } from "crypto";
import { Document } from "src/modules/document/document.entity";
import { Printer } from "src/modules/printer/printer.entity";

@Injectable()
export class PrintingOrderService{
    constructor (
        @Inject(ORDER_REPOSITORY) 
        private readonly printingOrderModel : typeof PrintingOrder,
        @Inject(DOCUMENT_REPOSITORY) private readonly documentRepository: typeof Document,
        @Inject(PRINTER_REPOSITORY) private readonly printerRepository: typeof Printer
    ) {}

    async create(createOrderDto: CreateOrderDto, customerId: UUID): Promise <PrintingOrder>{
        const existedDocument = await this.documentRepository.findByPk(createOrderDto.documentId, { attributes: ['id']});

        if (!existedDocument) {
            throw new BadRequestException('Document does not exist');
        }

        const existedPrinter = await this.printerRepository.findByPk(createOrderDto.printerId, { attributes: ['id']})

        if (!existedPrinter) {
            throw new BadRequestException('Printer does not exist')
        }

        return await this.printingOrderModel.create({
            ...createOrderDto,
            customerId
        });
    }

    async confirmStatus(id: UUID, status: PrintingStatus) {
        const existedOrder = await this.printingOrderModel.findByPk(id);

        if (!existedOrder) {
            throw new NotFoundException('Order does not exist');
        }
        
        if (status === PrintingStatus.CANCELLED && existedOrder.printingStatus !== PrintingStatus.PENDING) {
            throw new BadRequestException('Previous state must be PENDING');
        }
        else if (status === PrintingStatus.FAILED && existedOrder.printingStatus !== PrintingStatus.PROCESSING) {
            throw new BadRequestException('Previous state must be PROCESSING');
        }
        else if (status === PrintingStatus.PROCESSING && existedOrder.printingStatus !== PrintingStatus.PENDING) {
            throw new BadRequestException('Previous state must be PENDING');
        }
        else if (status === PrintingStatus.SUCCESS && existedOrder.printingStatus !== PrintingStatus.PROCESSING) {
            throw new BadRequestException('Previous state must be PROCESSING');
        }
        
        existedOrder.printingStatus = status;
        return await existedOrder.save();
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
            console.log("Only be updated if purchasing status and printing status is pending");
            return null;
        }
    }

    // SERVICE TIM KIEM

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

    async searchOrders(
        printingStatus?: PrintingStatus,
        purchasingStatus?: PurchasingStatus
    ): Promise<PrintingOrder[]> {
        const whereClause: any = {};

        if (printingStatus) {
            whereClause['printingStatus'] = printingStatus;
        }

        if (purchasingStatus) {
            whereClause['purchasingStatus'] = purchasingStatus;
        }

        return this.printingOrderModel.findAll({
            where: whereClause
        });
    }
    ////

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