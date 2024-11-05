import { Inject, Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { PurchasingPagesOrder } from "./purchasing_pages_order.entity";
import { PURCHASING_PAGES_ORDER_REPOSITORY } from "src/common/contants";
import { CreatePPODto } from './dtos/createPPO.Dto';
import { UpdatePPODto } from './dtos/updatePPO.Dto';
import { UUID } from "crypto";
import { SearchPayload } from "src/common/interfaces/search_payload.interface";
import { findByCriteria } from "src/common/utils/find_by_criteria.util";
import { Customer } from "../user/customer.entity";
import { NotFoundError } from "rxjs";

@Injectable()
export class PurchasingPagesOrderService{
	constructor(@Inject(PURCHASING_PAGES_ORDER_REPOSITORY) private readonly purchasingPagesOrderRepository: 
	typeof PurchasingPagesOrder) {}

	async create(dto : CreatePPODto, customerId: UUID) {
		const cost = (dto.numPages * 1000) / 3;
		
		return await this.purchasingPagesOrderRepository.create({
			...dto,
			cost,
			customerId
		});
	}

	async search(payload: SearchPayload, customerId: UUID) {
		if (customerId) {
			payload.criteria.push({
				field: 'customerId',
				operator: '=',
				value: customerId
			});
		}

		return await findByCriteria(payload.criteria, PurchasingPagesOrder, payload.addition, {
			option: 'manual',
			includeOption: []
		}, null);
	}
	
	async findById(id: UUID){
		return await this.purchasingPagesOrderRepository.findByPk(id, { include: [{ model: Customer }]});
	}

	async update(id: string, dto: UpdatePPODto) {
		const order = await this.purchasingPagesOrderRepository.findByPk(id);
		if(order && order.status == 'PENDING'){
			throw new ConflictException('Puchasing Page Order is not Pending')
		}
		return await this.purchasingPagesOrderRepository.update(dto, { where: { id } })
	}

	async destroy(id: string) {
		const existedPPO = await this.purchasingPagesOrderRepository.findByPk(id, { attributes: ['id'] });
		if (!existedPPO) {
			throw new NotFoundException('Order does not exist');
		}

		await this.purchasingPagesOrderRepository.destroy({ where: { id } })
	}
}