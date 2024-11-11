import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, Req, HttpStatus, UseGuards, ForbiddenException, NotFoundException, UsePipes } from '@nestjs/common';
import { PurchasingPagesOrderService } from './purchasing_pages_order.service';
import { CreatePPODto } from './dtos/createPPO.Dto';
import { UpdatePPODto } from './dtos/updatePPO.Dto';
import { Response } from '../response/response.entity';
import { Role, SPSO_REPOSITORY } from 'src/common/contants';
import { JwtAuthGuard } from 'src/common/guards/authenticate.guard';
import { AuthorizeGuard } from 'src/common/guards/authorize.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { SearchPayload } from 'src/common/interfaces/search_payload.interface';
import { UUID } from 'crypto';
import { ValidateInputPipe } from 'src/common/pipes/validate.pipe';

@Controller('purchasing_pages_order')
export class PurchasingPagesOrderController {
	constructor(
		private readonly PPOService : PurchasingPagesOrderService,
		private readonly response : Response
	){}

	@UseGuards(JwtAuthGuard, AuthorizeGuard)
	@Roles(Role.CUSTOMER)
	@UsePipes(ValidateInputPipe)
	@Post('create')
	async create(@Body() dto: CreatePPODto, @Req() req, @Res() res){
		try{
			const createdPPO = await this.PPOService.create(dto, req.user.id);
			this.response.initResponse(true, 'Successfully created purchasing page order', createdPPO);
			return res.status(HttpStatus.CREATED).json(this.response)
		}
		catch(err){
			this.response.initResponse(false, `Create purchasing page order unsuccessfully, ERROR: ${err}`, null)
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('search')
	async search(@Req() req, @Body() dto: SearchPayload, @Res() res) {
		try {
			let orders = [];
			if (req.user.role === Role.SPSO) {
				orders = await this.PPOService.search(dto, null);
			}
			else {
				orders = await this.PPOService.search(dto, req.user.id);
			}

			this.response.initResponse(true, 'Lấy thông tin đơn hàng thành công', orders);
			return res.status(HttpStatus.OK).json(this.response);
		} catch (error) {
			console.log(error);
			this.response.initResponse(false, 'An error occurs. Please try again', null);
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get('search/:id')
	async getById(@Param('id') id: UUID, @Res() res){
		try {
			const PPO = await this.PPOService.findById(id);
			this.response.initResponse(true, 'Get purchasing page order successfully', PPO)
			return res.status(HttpStatus.OK).json(this.response)
		}
		catch(error) {
			console.log(error);
			this.response.initResponse(false, 'An error occurs. Please try again', null);
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
		}
	}

	// Do not allow to update order

	// Just SPSO has the privilege to delete an order in exceptional case
	@UseGuards(JwtAuthGuard, AuthorizeGuard)
	@Roles(Role.SPSO)
	@Delete("delete/:id")
	async destroy(@Param('id') id: string, @Res() res){
		try{
			await this.PPOService.destroy(id);
			this.response.initResponse(true, 'Purchasing page order deleted successfully', null)
			return res.status(HttpStatus.OK).json(this.response)
		}
		catch(error){
			if (error instanceof NotFoundException) {
				this.response.initResponse(false, error.message, null);
				return res.status(HttpStatus.NOT_FOUND).json(this.response);
			}
			
			console.log(error);
			this.response.initResponse(false, 'An error occurs. Please try again.', null)
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response)
		}
	}
}