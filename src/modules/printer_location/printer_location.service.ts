import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PrinterLocation } from "./printer_location.entity";
import { CreatePrinterLocationDto } from './dtos/printer_locationCreate.Dto';
import { UpdatePrinterLocationDto } from './dtos/printer_locationUpdate.Dto';
import { PRINTER_LOCATION_REPOSITORY } from "src/common/contants";

@Injectable()
export class PrinterLocationService{
   constructor(@Inject(PRINTER_LOCATION_REPOSITORY) private readonly printerLocationRepository: typeof PrinterLocation) {}

   //Create
   async create(data : CreatePrinterLocationDto){
      await this.printerLocationRepository.create(data)
   }

   //Read
   async findAll(){
      const locationArr = await this.printerLocationRepository.findAll()
      return locationArr
   }

   async findOne(id: string){
      const location =  await this.printerLocationRepository.findByPk(id)
      return location
   } 

   //Update
   async update(id: string, data: UpdatePrinterLocationDto){
      return await this.printerLocationRepository.update(data, { where: { id } });
   }

   //Delete
   async delete(id: string){
      return await this.printerLocationRepository.destroy({ where: { id } });
   }
}
