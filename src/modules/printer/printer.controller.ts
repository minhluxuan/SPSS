import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { Response } from "src/modules/response/response.entity";
import { CreatePrinterDto } from './dtos/createPrinter.Dto';
import { UpdatePrinterDto } from './dtos/updatePrinter.Dto';
import { JwtAuthGuard } from 'src/common/guards/authenticate.guard';
import { AuthorizeGuard } from 'src/common/guards/authorize.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/contants';
import { SearchPayload } from 'src/common/interfaces/search_payload.interface';
import { ValidateInputPipe } from 'src/common/pipes/validate.pipe';

@Controller('printer')
export class PrinterController {
	constructor(
		private readonly response : Response,
		private readonly printerService : PrinterService
	){}

	@UseGuards(JwtAuthGuard, AuthorizeGuard)
	@Roles(Role.SPSO)
	@UsePipes(ValidateInputPipe)
	@Post('create')
	async createPrinter(@Body() data: CreatePrinterDto, @Res() res){
		try{
			const createdPrinter = await this.printerService.create(data)
			this.response.initResponse(true, 'Successfully created printer', createdPrinter);
			return res.status(HttpStatus.CREATED).json(this.response)
		}
		catch(err){
			this.response.initResponse(false, `Create printer unsuccessfully, ERROR: ${err}`, null)
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
		}
	}

	@Get('search/:id')
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

	@Post('search')
	async searchPrinter(
		@Body() dto: SearchPayload,
		@Res() res,
	) {
		try{
			const printers = await this.printerService.search(dto);
			this.response.initResponse(true, `Search printers successfully`, printers)
			return res.status(HttpStatus.OK).json(this.response)
		}
		catch(err) {
			console.log(err);
			this.response.initResponse(true, `An error occurs. Please try again`, null)
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
		}
	}

	@UseGuards(JwtAuthGuard, AuthorizeGuard)
	@Roles(Role.SPSO)
	@UsePipes(ValidateInputPipe)
	@Put('update/:id')
	async updatePrinter(@Param('id') id: string, @Body() data: UpdatePrinterDto, @Res() res){
		try {
			const updatedPrinter =  await this.printerService.update(id, data)
			if(!updatedPrinter){
				this.response.initResponse(false, `Printer was not found`, updatedPrinter);
				return res.status(HttpStatus.NOT_FOUND).json(this.response)
			}
			this.response.initResponse(true, 'Printer updated successfully', updatedPrinter)
			return res.status(HttpStatus.OK).json(this.response)
		}
		catch(err) {
			this.response.initResponse(false,`Updated printer unsuccessfully, ERROR: ${err}`, null)
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
		}
	}

	@Delete("delete/:id")
	async deletePrinter(@Param('id') id: string, @Res() res){
		try {
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
