import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PurchasingPagesOrder } from "./purchasing_pages_order.entity";
import { PURCHASING_PAGES_ORDER_REPOSITORY } from "src/common/contants";

@Injectable()
export class PurchasingPagesOrderService{
   constructor(@Inject(PURCHASING_PAGES_ORDER_REPOSITORY) private readonly purchasingPagesOrderRepository: 
   typeof PurchasingPagesOrder) {}

   //Create
   async create(data : PurchasingPagesOrder){
      await this.purchasingPagesOrderRepository.create(data)
   }
   //Read
   async findAll(){
      const ordersArr = this.purchasingPagesOrderRepository.findAll()
      if(!ordersArr) throw new NotFoundException(`No purchasing order was found`)
      return ordersArr
   }
   async findOne(id: string){
      const order =  this.purchasingPagesOrderRepository.findByPk(id)
      if(!order) throw new NotFoundException(`Purchasing order with id ${id} not found`)
      return order
   }
   //Update
   async update(id: string, data: PurchasingPagesOrder){
      const order = await this.purchasingPagesOrderRepository.findByPk(id);
      if(!order){
         throw new NotFoundException(`Purchasing order with id ${id} not found`);
      }
      return this.purchasingPagesOrderRepository.update(data, { where: { id } });
   }
   //Delete
   async delete(id: string){
      const order = await this.purchasingPagesOrderRepository.findByPk(id);
      if (!order) {
        throw new NotFoundException(`Purchasing order with id ${id} not found`);
      }
      return this.purchasingPagesOrderRepository.destroy({ where: { id } });
   }
}