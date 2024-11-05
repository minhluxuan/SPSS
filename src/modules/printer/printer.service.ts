import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Printer } from "./printer.entity";
import { CreatePrinterDto } from './dtos/createPrinter.Dto';
import { UpdatePrinterDto } from './dtos/updatePrinter.Dto';
import { PRINTER_LOCATION_REPOSITORY, PRINTER_REPOSITORY } from "src/common/contants";
import { PrinterLocation } from "../printer_location/printer_location.entity";
import { SearchPayload } from "src/common/interfaces/search_payload.interface";
import { findByCriteria } from "src/common/utils/find_by_criteria.util";

@Injectable()
export class PrinterService{
	constructor(
		@Inject(PRINTER_REPOSITORY) private readonly printerRepository: typeof Printer,
		@Inject(PRINTER_LOCATION_REPOSITORY) private readonly printerLocationRepository: typeof PrinterLocation
	) {}

	async create(dto : CreatePrinterDto){
		const existedLocation = await this.printerLocationRepository.findByPk(dto.locationId);
		if (!existedLocation) {
			throw new BadRequestException('Location does not exist');
		}

		return await this.printerRepository.create(dto);
	}

	async findOne(id: string){
		const printer =  await this.printerRepository.findByPk(id)
		return printer
	}

	async update(id: string, dto: UpdatePrinterDto){
		return await this.printerRepository.update(dto, { where: { id } });
	}

	async delete(id: string){
		return await this.printerRepository.destroy({ where: { id } });
	}

	async search(payload: SearchPayload){
		return await findByCriteria(payload.criteria, Printer, payload.addition, {
			option: 'manual',
			includeOption: [
				{ model: PrinterLocation }
			]
		}, null);
	}
}
