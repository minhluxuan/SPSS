import { BadRequestException, ConflictException, Inject,Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { PrintingOrder } from "../printing_order.entity";
import { PaperOrientation, PaperSize, PrintingStatus, PurchasingStatus, ORDER_REPOSITORY, DOCUMENT_REPOSITORY, PRINTER_REPOSITORY, CUSTOMER_REPOSITORY } from "src/common/contants"; 
import { CreateOrderDto } from "../dtos/create_order.dto";
import { UpdateOrderDto } from "../dtos/update_order.dto";
import { UUID } from "crypto";
import { Document } from "src/modules/document/document.entity";
import { Printer } from "src/modules/printer/printer.entity";
import { SearchPayload } from "src/common/interfaces/search_payload.interface";
import { findByCriteria } from "src/common/utils/find_by_criteria.util";
import { Customer } from "src/modules/user/customer.entity";

@Injectable()
export class PrintingOrderService{
    constructor (
        @Inject(ORDER_REPOSITORY) 
        private readonly printingOrderModel : typeof PrintingOrder,
        @Inject(DOCUMENT_REPOSITORY) private readonly documentRepository: typeof Document,
        @Inject(PRINTER_REPOSITORY) private readonly printerRepository: typeof Printer,
        @Inject(CUSTOMER_REPOSITORY) private readonly customerRepository: typeof Customer
    ) {}

    async create(createOrderDto: CreateOrderDto, customerId: UUID): Promise <PrintingOrder>{
        const existedCustomer = await this.customerRepository.findByPk(customerId);

        if (!existedCustomer) {
            throw new ConflictException('Người dùng không tồn tại');
        }

        const existedDocument = await this.documentRepository.findByPk(createOrderDto.documentId, { attributes: ['id', 'numPages']});

        if (!existedDocument) {
            throw new BadRequestException('Document does not exist');
        }

        const existedPrinter = await this.printerRepository.findByPk(createOrderDto.printerId, { attributes: ['id']})

        if (!existedPrinter) {
            throw new BadRequestException('Printer does not exist')
        }

        if (existedCustomer.extraPages < existedDocument.numPages * (2 / createOrderDto.numFaces)) {
            throw new BadRequestException('Your extra pages is not enough. Please purchase more.')
        }

        const createdPrintingOrder = await this.printingOrderModel.create({
            ...createOrderDto,
            customerId,
            purchasingStatus: PurchasingStatus.PAID
        });

        console.log(existedCustomer.extraPages);
        console.log(existedDocument.numPages);
        console.log(createOrderDto.numFaces);

        console.log(existedCustomer.extraPages - existedDocument.numPages * (2 / createOrderDto.numFaces));

        await this.customerRepository.update({
            extraPages: existedCustomer.extraPages - existedDocument.numPages * (2 / createOrderDto.numFaces)
        }, {
            where: { id: customerId }
        });

        return createdPrintingOrder;
    }

    async confirmStatus(id: UUID, status: PrintingStatus) {
        console.log(status);
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
    
    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<PrintingOrder> {
        const order = await this.printingOrderModel.findByPk(id);
        if (!order) {
            throw new NotFoundException('Order does not exist');
        }

        if (order.printingStatus !== PrintingStatus.PENDING || order.purchasingStatus === PurchasingStatus.PENDING) {
            throw new BadRequestException('Printing order is not allowed to update at this moment');
        }

        order.numFaces = updateOrderDto.numFaces ?? order.numFaces;
        order.size = updateOrderDto.size ?? order.size;
        order.orientation = updateOrderDto.orientation ?? order.orientation;
        const savedOrder = await order.save();

        if (savedOrder) {
            return savedOrder;
        } else {
            return null;
        }
    }

    async findById(id: string): Promise<PrintingOrder> {
        const order = await this.printingOrderModel.findByPk(id, {
            include: [
                { model: Customer }
            ]
        });
        return order;
    }

    async searchByCustomer(payload: SearchPayload, customerId: UUID) {
        if (!Array.isArray(payload.criteria)) {
            payload.criteria = []
        }

        payload.criteria.push({
            field: 'customerId',
            operator: '=',
            value: customerId
        });

        return await findByCriteria(payload.criteria, PrintingOrder, payload.addition, {
            option: 'manual',
            includeOption: []
        }, null);
    }

    async search(payload: SearchPayload) {
        if (!Array.isArray(payload.criteria)) {
            payload.criteria = []
        }

        return await findByCriteria(payload.criteria, PrintingOrder, payload.addition, {
            option: 'manual',
            includeOption: []
        }, null);
    }

    async destroy(id: UUID) {
        const order = await this.printingOrderModel.findByPk(id);
        
        if (order) {
            throw new NotFoundException('Order does not exist');
        }

        await this.printingOrderModel.destroy({
            where: { id }
        });
    }
}