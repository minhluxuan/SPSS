import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, Req, Res } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { Response } from "src/modules/response/response.entity";
import { CreatePrinterDto } from './dtos/createPrinter.Dto';
import { UpdatePrinterDto } from './dtos/updatePrinter.Dto';

@Controller('printer')
export class PrinterController {
   constructor(
      private readonly response : Response,
      private readonly printerService : PrinterService
   ){}

   @Post()
   async createPrinter(@Body() data: CreatePrinterDto, @Res() res){
      try{
         await this.printerService.create(data)
         this.response.initResponse(true, 'Successfully created printer', null)
         return res.status(HttpStatus.CREATED).json(this.response)
      }
      catch(err){
         this.response.initResponse(false, `Create printer unsuccessfully, ERROR: ${err}`, null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }

   @Get()
   async getAllPrinter(@Res() res){
      try{
         const allPrinter = await this.printerService.findAll()
         if(allPrinter.length===0){
            this.response.initResponse(false,'No printer was found', null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true,`Get printers successfully`, allPrinter)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         this.response.initResponse(true,`Get printers unsuccessfully, ERROR:${err}`, null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }

   @Get(':id')
   async getPrinter(@Param('id') id: string, @Res() res){
      try{
         const printer = await this.printerService.findOne(id)
         if(!printer){
            this.response.initResponse(false, `Printer was not found`, null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true, `Printer was found`, printer)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: `Get printer unsuccessfully`, ERROR: `${err}`})
      }
   }
   @Get('search')
   async searchPrinter(
      @Res() res,
      @Query('name') name?: string,
      @Query('brand') brand?: string,
      @Query('location') location?: string,
      @Query('active') active?: boolean
   ){
      try{
         const Printers = await this.printerService.search(name, brand, location, active)
         if(Printers.length===0){
            this.response.initResponse(false,'No printer was found', null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true,`Get printers successfully`, Printers)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         this.response.initResponse(true,`Get printers unsuccessfully, ERROR:${err}`, null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }

   @Patch(':id')
   async updatePrinter(@Param('id') id: string, @Body() data: UpdatePrinterDto, @Res() res){
      try{
         const update =  await this.printerService.update(id, data)
         if(!update[0]){
            this.response.initResponse(false, `Printer was not found`, null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true, 'Printer updated successfully', null)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         this.response.initResponse(false,`Updated printer unsuccessfully, ERROR: ${err}`, null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }

   @Delete(":id")
   async deletePrinter(@Param('id') id: string, @Res() res){
      try{
         const deleted =  await this.printerService.delete(id)
         if(!deleted[0]){
            this.response.initResponse(false, `Printer was not found`, null)
            return res.status(HttpStatus.NOT_FOUND).json(this.response)
         }
         this.response.initResponse(true, 'Printer deleted successfully', null)
         return res.status(HttpStatus.OK).json(this.response)
      }
      catch(err){
         this.response.initResponse(false,  `Delete printer unsuccessfully, ERROR: ${err}`, null)
         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
      }
   }
}
