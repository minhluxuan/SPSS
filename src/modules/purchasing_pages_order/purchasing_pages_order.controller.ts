import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, Req, HttpStatus, UseGuards, ForbiddenException } from '@nestjs/common';
import { PurchasingPagesOrderService } from './purchasing_pages_order.service';
import { CreatePPODto } from './dtos/createPPO.Dto';
import { UpdatePPODto } from './dtos/updatePPO.Dto';
import { Response } from '../response/response.entity';
import { SPSO_REPOSITORY } from 'src/common/contants';
import { JwtAuthGuard } from 'src/common/guards/authenticate.guard';

@Controller('purchasing_pages_oder')
export class PurchasingPagesOrderController {
   constructor(
      private readonly PPOService : PurchasingPagesOrderService,
      private readonly response : Response
   ){}

   @UseGuards(JwtAuthGuard)
   @Post()
   async createPPO(@Body() data: CreatePPODto,@Req() req, @Res() res){
      if (!req.user || !req.user.id) {
         throw new ForbiddenException("User is not allowed to access this resource");
      }
      try{
         await this.PPOService.create({...data, CustomerID: req.user.id})
         this.response.initResponse(true, 'Successfully created purchasing page order', null )
         return res.status(HttpStatus.CREATED).json(this.response)
      }
      catch(err){
         this.response.initResponse(false, `Create purchasing page order unsuccessfully, ERROR: ${err}`, null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }

   @Get()
   async getAllPPO(@Res() res){
      try{
         const allPPO = await this.PPOService.findAll()
         if(!allPPO.length){
            this.response.initResponse(false, 'No purchasing page order was found', null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true, 'Get purchasing page orders successfully', allPPO)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         this.response.initResponse(false, `Get purchasing page orders unsuccessfully, ERROR: ${err}`, null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }

   @Get(':id')
   async getPPO(@Param('id') id: string, @Res() res){
      try{
         const PPO = await this.PPOService.findOne(id)
         if(!PPO){
            this.response.initResponse(false, `Purchasing page order was not found`, null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true, 'Get purchasing page order successfully', PPO)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         this.response.initResponse(false, `Get purchasing page order unsuccessfully, ERROR: ${err}`, null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }
   
   @Patch(':id')
   async updatePPO(@Param('id') id: string, @Body() data: UpdatePPODto, @Res() res){
      try{
         const update =  await this.PPOService.update(id, data)
         if(!update[0]){
            this.response.initResponse(false, `Purchasing page order was not found`,null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true, 'Purchasing page order updated successfully', null)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         this.response.initResponse(false, `Updated purchasing page order unsuccessfully, ERROR: ${err}`, null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }

   @Delete(":id")
   async deletePPO(@Param('id') id: string, @Res() res){
      try{
         const deleted =  await this.PPOService.delete(id)
         if(!deleted){
            this.response.initResponse(false, `Purchasing page order was not found`, null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true, 'Purchasing page order deleted successfully', null)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         this.response.initResponse(false, `Delete purchasing page order unsuccessfully, ERROR: ${err}`, null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }
}