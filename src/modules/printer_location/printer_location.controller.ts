import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res, HttpStatus } from '@nestjs/common';
import { PrinterLocationService } from './printer_location.service';
import { PrinterLocation } from './printer_location.entity';

@Controller('printer_location')
export class PrinterLocationController {
   constructor(private readonly printerlocationService : PrinterLocationService){}

   @Post()
   async createPrinterLocation(@Body() data: PrinterLocation, @Res() res){
      try{
         await this.printerlocationService.create(data)
         return res.status(HttpStatus.CREATED).json({message : 'Successfully created printer location'})
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Create printer location unsuccessfully`, ERROR: `${err}`})
      }
   }

   @Get()
   async getAllPrinterLocation(@Res() res){
      try{
         const getAllPrinterLocation = await this.printerlocationService.findAll()
         if(!getAllPrinterLocation) return res.status(HttpStatus.NOT_FOUND).json({message: 'No printer location was found'})
         return res.status(HttpStatus.OK).json(getAllPrinterLocation)
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Get printer locations unsuccessfully`, ERROR: `${err}`})
      }
   }
   @Get(':id')
   async getPrinterLocation(@Param('id') id: string, @Res() res){
      try{
         const printerLocation = await this.printerlocationService.findOne(id)
         if(!printerLocation) return res.status(HttpStatus.NOT_FOUND).json({message: `Printer location with id: ${id} not found`})
         return res.status(HttpStatus.OK).json(printerLocation)
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Get printer location unsuccessfully`, ERROR: `${err}`})
      }
   }
   @Patch(':id')
   async updatePrinterLocation(@Param('id') id: string, @Body() data: PrinterLocation, @Res() res){
      try{
         const update =  await this.printerlocationService.update(id, data)
         if(!update[0])  return res.status(HttpStatus.NOT_FOUND).json({message: `Printer location with id ${id} not found`})
         return res.status(HttpStatus.OK).json({message: 'Printer location updated successfully'})
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Updated printer location unsuccessfully`, ERROR: `${err}`})
      }
   }

   @Delete(":id")
   async deletePrinterLocation(@Param('id') id: string, @Res() res){
      try{
         const deleted =  await this.printerlocationService.delete(id)
         if(!deleted) return res.status(HttpStatus.NOT_FOUND).json({message: `Printer with id ${id} not found`})
         return res.status(HttpStatus.OK).json({message: 'Printer location deleted successfully'})
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Delete printer location unsuccessfully`, ERROR: `${err}`})
      }
   }
}
