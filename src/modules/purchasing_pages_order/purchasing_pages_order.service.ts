import { Inject, Injectable, ConflictException } from "@nestjs/common";
import { PurchasingPagesOrder } from "./purchasing_pages_order.entity";
import { PURCHASING_PAGES_ORDER_REPOSITORY } from "src/common/contants";
import { CreatePPODto } from './dtos/createPPO.Dto';
import { UpdatePPODto } from './dtos/updatePPO.Dto';

@Injectable()
export class PurchasingPagesOrderService{
   constructor(@Inject(PURCHASING_PAGES_ORDER_REPOSITORY) private readonly purchasingPagesOrderRepository: 
   typeof PurchasingPagesOrder) {}

   //Create
   async create(data : CreatePPODto){
      await this.purchasingPagesOrderRepository.create(data)
   }

   //Read
   async findAll(){
      const ordersArr = await this.purchasingPagesOrderRepository.findAll()
      return ordersArr
   }
   async findOne(id: string){
      const order =  await this.purchasingPagesOrderRepository.findByPk(id)
      return order
   }

   //Update
   async update(id: string, data: UpdatePPODto){
      const order = await this.purchasingPagesOrderRepository.findByPk(id)
      if(order&&order.status == 'PENDING'){
         throw new ConflictException('Puchasing Page Order is not Pending')
      }
      return await this.purchasingPagesOrderRepository.update(data, { where: { id } })
       
   }

   //Delete
   async delete(id: string){
      return this.purchasingPagesOrderRepository.destroy({ where: { id } })
   }
}