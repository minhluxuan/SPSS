import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Printer } from "./printer.entity";
import { PRINTER_REPOSITORY } from "src/common/contants";

@Injectable()
export class PrinterService{
   constructor(@Inject(PRINTER_REPOSITORY) private readonly printerRepository: typeof Printer) {}

   //Create
   async create(data : Printer){
      await this.printerRepository.create(data)
   }
   //Read
   async findAll(){
      const printerArr = this.printerRepository.findAll()
      if(!printerArr) return null
      return printerArr
   }
   async findOne(id: string){
      const printer =  this.printerRepository.findByPk(id)
      if(!printer) return null
      return printer
   }
   //Update
   async update(id: string, data: Printer){
      return this.printerRepository.update(data, { where: { id } });
   }
   //Delete
   async delete(id: string){
      return this.printerRepository.destroy({ where: { id } });
   }
}
