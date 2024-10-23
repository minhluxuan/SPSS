import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res, HttpStatus } from '@nestjs/common';
import { PurchasingPagesOrderService } from './purchasing_pages_order.service';
import { PurchasingPagesOrder } from './purchasing_pages_order.entity';

@Controller('purchasing_pages_oder')
export class PurchasingPagesOrderController {
   constructor(private readonly PPOService : PurchasingPagesOrderService){}

   @Post()
   async createPPO(@Body() data: PurchasingPagesOrder, @Res() res){
      try{
         await this.PPOService.create(data)
         return res.status(HttpStatus.CREATED).json({message : 'Successfully created purchasing page order'})
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Create purchasing page order unsuccessfully`, ERROR: `${err}`})
      }
   }

   @Get()
   async getAllPPO(@Res() res){
      try{
         const allPPO = await this.PPOService.findAll()
         if(!allPPO) return res.status(HttpStatus.NOT_FOUND).json({message: 'No purchasing page order was found'})
         return res.status(HttpStatus.OK).json(allPPO)
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Get purchasing page orders unsuccessfully`, ERROR: `${err}`})
      }
   }
   @Get(':id')
   async getPPO(@Param('id') id: string, @Res() res){
      try{
         const PPO = await this.PPOService.findOne(id)
         if(!PPO) return res.status(HttpStatus.NOT_FOUND).json({message: `Purchasing page order with id ${id} not found`})
         return res.status(HttpStatus.OK).json(PPO)
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Get purchasing page order unsuccessfully`, ERROR: `${err}`})
      }
   }
   
   @Patch(':id')
   async updatePPO(@Param('id') id: string, @Body() data: PurchasingPagesOrder, @Res() res){
      try{
         const update =  await this.PPOService.update(id, data)
         if(!update[0])  return res.status(HttpStatus.NOT_FOUND).json({message: `Purchasing page order with id ${id} not found`})
         return res.status(HttpStatus.OK).json({message: 'Purchasing page order updated successfully'})
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Updated purchasing page order unsuccessfully`, ERROR: `${err}`})
      }
   }

   @Delete(":id")
   async deletePPO(@Param('id') id: string, @Res() res){
      try{
         const deleted =  await this.PPOService.delete(id)
         if(!deleted) return res.status(HttpStatus.NOT_FOUND).json({message: `Purchasing page order with id ${id} not found`})
         return res.status(HttpStatus.OK).json({message: 'Purchasing page order deleted successfully'})
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Delete purchasing page order unsuccessfully`, ERROR: `${err}`})
      }
   }
}