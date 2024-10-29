import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res, HttpStatus } from '@nestjs/common';
import { PrinterLocationService } from './printer_location.service';
import { CreatePrinterLocationDto } from './dtos/printer_locationCreate.Dto';
import { UpdatePrinterLocationDto } from './dtos/printer_locationUpdate.Dto';
import { Response } from '../response/response.entity';

@Controller('printer_location')
export class PrinterLocationController {
   constructor(
      private readonly printerlocationService : PrinterLocationService,
      private readonly response: Response
   ){}

   @Post()
   async createPrinterLocation(@Body() data: CreatePrinterLocationDto, @Res() res){
      try{
         await this.printerlocationService.create(data)
         this.response.initResponse(true, 'Successfully created printer location', null)
         return res.status(HttpStatus.CREATED).json(this.response)
      }
      catch(err){
         this.response.initResponse(false, `Create printer location unsuccessfully, ERROR: ${err}`, null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }

   @Get()
   async getAllPrinterLocation(@Res() res){
      try{
         const getAllPrinterLocation = await this.printerlocationService.findAll()
         if(!getAllPrinterLocation){
            this.response.initResponse(false, 'No printer location was found', null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true, "Get printers successfully", getAllPrinterLocation)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         this.response.initResponse(false, `Get printer locations unsuccessfully, ERROR: ${err}`,null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }

   @Get(':id')
   async getPrinterLocation(@Param('id') id: string, @Res() res){
      try{
         const printerLocation = await this.printerlocationService.findOne(id)
         if(!printerLocation){
            this.response.initResponse(false, `Printer location was not found`, null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true, "Get printer location successfully", printerLocation)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         this.response.initResponse(false, `Get printer location unsuccessfully, ERROR: ${err}`,null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }

   @Patch(':id')
   async updatePrinterLocation(@Param('id') id: string, @Body() data: UpdatePrinterLocationDto, @Res() res){
      try{
         const update =  await this.printerlocationService.update(id, data)
         if(!update[0]){
            this.response.initResponse(false, `Printer location was not found`,null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true, 'Printer location updated successfully', null)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         this.response.initResponse(false, `Updated printer location unsuccessfully, ERROR: ${err}`, null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }

   @Delete(":id")
   async deletePrinterLocation(@Param('id') id: string, @Res() res){
      try{
         const deleted =  await this.printerlocationService.delete(id)
         if(!deleted){
            this.response.initResponse(false, `Printer was not found`, null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true, 'Printer location deleted successfully', null)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         this.response.initResponse(false, `Delete printer location unsuccessfully, ERROR: ${err}`,null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }
}
