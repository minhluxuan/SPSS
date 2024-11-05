import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PrinterLocation } from "./printer_location.entity";
import { CreatePrinterLocationDto } from "./dtos/create_printer_location.dto";
import { UpdatePrinterLocationDto } from './dtos/printer_locationUpdate.Dto';
import { PRINTER_LOCATION_REPOSITORY } from "src/common/contants";

@Injectable()
export class PrinterLocationService {
	constructor(@Inject(PRINTER_LOCATION_REPOSITORY) private readonly printerLocationRepository: typeof PrinterLocation) {}

	async create(data : CreatePrinterLocationDto){
		console.log(this.printerLocationRepository.create());
		return await this.printerLocationRepository.create({
			...data
		});
	}

	async findAll() {
		const locations = await this.printerLocationRepository.findAll()
		return locations;
	}

	async findById(id: string){
		const location =  await this.printerLocationRepository.findByPk(id)
		return location;
	} 

	async update(id: string, data: UpdatePrinterLocationDto){
		const existedLocation = await this.printerLocationRepository.findByPk(id, { attributes: ['id'] });

		if (!existedLocation) {
			throw new NotFoundException('PrinterLocation does not exist');
		}

		return await this.printerLocationRepository.update(data, { where: { id } });
	}

	async destroy(id: string) {
		const existedLocation = await this.printerLocationRepository.findByPk(id, { attributes: ['id'] });

		if (!existedLocation) {
			throw new NotFoundException('PrinterLocation does not exist');
		}

		return await this.printerLocationRepository.destroy({ where: { id } });
	}
}
