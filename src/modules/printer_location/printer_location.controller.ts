import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Res, HttpStatus, UseGuards, UsePipes } from '@nestjs/common';
import { PrinterLocationService } from './printer_location.service';
import { CreatePrinterLocationDto } from './dtos/create_printer_location.dto';
import { UpdatePrinterLocationDto } from './dtos/printer_locationUpdate.Dto';
import { Response } from '../response/response.entity';
import { JwtAuthGuard } from 'src/common/guards/authenticate.guard';
import { ValidateInputPipe } from 'src/common/pipes/validate.pipe';
import { AuthorizeGuard } from 'src/common/guards/authorize.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/contants';

@Controller('printer_location')
export class PrinterLocationController {
	constructor(
		private readonly printerLocationService: PrinterLocationService,
		private readonly response: Response
	){}

	@UseGuards(JwtAuthGuard, AuthorizeGuard)
	@Roles(Role.SPSO)
	@UsePipes(ValidateInputPipe)
	@Post('create')
	async create(@Body() data: CreatePrinterLocationDto, @Res() res){
		try {
			const createdPrinter = await this.printerLocationService.create(data)
			this.response.initResponse(true, 'Successfully created printer location', createdPrinter);
			return res.status(HttpStatus.CREATED).json(this.response);
		}
		catch (err) {
			console.log(err);
			this.response.initResponse(false, `An error occurs. Please try again`, null);
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getAll(@Res() res){
		try{
			const printerLocations = await this.printerLocationService.findAll()
			this.response.initResponse(true, "Get printer locations successfully", printerLocations)
			return res.status(HttpStatus.OK).json(this.response)
		}
		catch(err){
			this.response.initResponse(false, `Get printer locations unsuccessfully, ERROR: ${err}`,null)
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
		}
	}

	@Get('search/:id')
	async getById(@Param('id') id: string, @Res() res){
		try{
			const printerLocation = await this.printerLocationService.findById(id)
			if(!printerLocation){
				this.response.initResponse(false, `Printer location was not found`, null)
				return res.status(HttpStatus.NOT_FOUND).json(this.response)
			}
			this.response.initResponse(true, "Get printer location successfully", printerLocation)
			return res.status(HttpStatus.OK).json(this.response)
		}
		catch(err){
			this.response.initResponse(false, `Get printer location unsuccessfully, ERROR: ${err}`,null)
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
		}
	}

	@UseGuards(JwtAuthGuard, AuthorizeGuard)
	@Roles(Role.SPSO)
	@UsePipes(ValidateInputPipe)
	@Patch('update/:id')
	async update(@Param('id') id: string, @Body() data: UpdatePrinterLocationDto, @Res() res){
		try {
			const update =  await this.printerLocationService.update(id, data)
			if(!update[0]){
				this.response.initResponse(false, `Printer location was not found`,null)
				return res.status(HttpStatus.NOT_FOUND).json(this.response)
			}
			this.response.initResponse(true, 'Printer location updated successfully', null)
			return res.status(HttpStatus.OK).json(this.response)
		}
		catch(err){
			this.response.initResponse(false, `Updated printer location unsuccessfully, ERROR: ${err}`, null)
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
		}
	}

	@UseGuards(JwtAuthGuard, AuthorizeGuard)
	@Roles(Role.SPSO)
	@Delete("delete/:id")
	async destroy(@Param('id') id: string, @Res() res){
		try{
			const deleted =  await this.printerLocationService.destroy(id)
			if(!deleted){
				this.response.initResponse(false, `Printer was not found`, null)
				return res.status(HttpStatus.NOT_FOUND).json(this.response)
			}
			this.response.initResponse(true, 'Printer location deleted successfully', null)
			return res.status(HttpStatus.OK).json(this.response)
		}
		catch(err){
			this.response.initResponse(false, `Delete printer location unsuccessfully, ERROR: ${err}`,null)
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
		}
	}
}
