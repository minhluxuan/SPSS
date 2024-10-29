import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Printer } from "./printer.entity";
import { CreatePrinterDto } from './dtos/createPrinter.Dto';
import { UpdatePrinterDto } from './dtos/updatePrinter.Dto';
import { PRINTER_REPOSITORY } from "src/common/contants";

@Injectable()
export class PrinterService{
   constructor(@Inject(PRINTER_REPOSITORY) private readonly printerRepository: typeof Printer) {}

   //Create
   async create(data : CreatePrinterDto){
      await this.printerRepository.create(data)
   }

   //Read
   async findAll(){
      const printerArr = await this.printerRepository.findAll()
      return printerArr
   }
   async findOne(id: string){
      const printer =  await this.printerRepository.findByPk(id)
      return printer
   }

   //Update
   async update(id: string, data: UpdatePrinterDto){
      return await this.printerRepository.update(data, { where: { id } });
   }

   //Delete
   async delete(id: string){
      return await this.printerRepository.destroy({ where: { id } });
   }
   //Search
   async search(name?: string, brand?: string, location?: string, active?: boolean){
      return await this.printerRepository.findAll({
         where:{
            name,
            brand,
            location,
            active
         }
      })
   }
}
