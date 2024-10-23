import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, Req, Res } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { Printer } from './printer.entity';

@Controller('printer')
export class PrinterController {
   constructor(private readonly printerService : PrinterService){}

   @Post()
   async createPrinter(@Body() data: Printer, @Res() res){
      try{
         await this.printerService.create(data)
         return res.status(HttpStatus.CREATED).json({message : 'Successfully created printer'})
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Create printer unsuccessfully`, ERROR: `${err}`})
      }
   }

   @Get()
   async getAllPrinter(@Res() res){
      try{
         const allPrinter = await this.printerService.findAll()
         if(!allPrinter) return res.status(HttpStatus.NOT_FOUND).json({message: 'No printer was found'})
         return res.status(HttpStatus.OK).json(allPrinter)
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Get printers unsuccessfully`, ERROR: `${err}`})
      }
   }
   @Get(':id')
   async getPrinter(@Param('id') id: string, @Res() res){
      try{
         const printer = await this.printerService.findOne(id)
         if(!printer) return res.status(HttpStatus.NOT_FOUND).json({message: `Printer with id ${id} not found`})
         return res.status(HttpStatus.OK).json(printer)
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Get printer unsuccessfully`, ERROR: `${err}`})
      }
   }
   
   @Patch(':id')
   async updatePrinter(@Param('id') id: string, @Body() data: Printer, @Res() res){
      try{
         const update =  await this.printerService.update(id, data)
         if(!update[0])  return res.status(HttpStatus.NOT_FOUND).json({message: `Printer with id ${id} not found`})
         return res.status(HttpStatus.OK).json({message: 'Printer updated successfully'})
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Updated printer unsuccessfully`, ERROR: `${err}`})
      }
   }

   @Delete(":id")
   async deletePrinter(@Param('id') id: string, @Res() res){
      try{
         const deleted =  await this.printerService.delete(id)
         if(!deleted) return res.status(HttpStatus.NOT_FOUND).json({message: `Printer with id ${id} not found`})
         return res.status(HttpStatus.OK).json({message: 'Printer deleted successfully'})
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Delete printer unsuccessfully`, ERROR: `${err}`})
      }
   }
}
