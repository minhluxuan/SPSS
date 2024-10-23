import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PrinterLocation } from "./printer_location.entity";
import { PRINTER_LOCATION_REPOSITORY } from "src/common/contants";

@Injectable()
export class PrinterLocationService{
   constructor(@Inject(PRINTER_LOCATION_REPOSITORY) private readonly printerLocationRepository: typeof PrinterLocation) {}

   //Create
   async create(data : PrinterLocation){
      await this.printerLocationRepository.create(data)
   }
   //Read
   async findAll(){
      const locationArr = this.printerLocationRepository.findAll()
      if(!locationArr) throw new NotFoundException(`No printer location was found`)
      return locationArr
   }
   async findOne(id: string){
      const location =  this.printerLocationRepository.findByPk(id)
      if(!location) throw new NotFoundException(`Location with id ${id} not found`)
      return location
   }
   //Update
   async update(id: string, data: PrinterLocation){
      const location = await this.printerLocationRepository.findByPk(id);
      if(!location){
         throw new NotFoundException(`Location with id ${id} not found`);
      }
      return this.printerLocationRepository.update(data, { where: { id } });
   }
   //Delete
   async delete(id: string){
      const location = await this.printerLocationRepository.findByPk(id);
      if (!location) {
        throw new NotFoundException(`Location with id ${id} not found`);
      }
      return this.printerLocationRepository.destroy({ where: { id } });
   }
}
