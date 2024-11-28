import { Body, Controller, Get, HttpStatus, Put, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { JwtAuthGuard } from "src/common/guards/authenticate.guard";
import { AuthorizeGuard } from "src/common/guards/authorize.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/contants";
import { UpdateConfigDto } from "./dtos/update_config.dto";
import { Response } from "../response/response.entity";

@Controller('config')
export class ConfigController {
    constructor(
        private readonly configService: ConfigService,
        private readonly response: Response
    ) {}

    @UseGuards(JwtAuthGuard, AuthorizeGuard)
    @Roles(Role.SPSO)
    @Put('update')
    async update(@Body() dto: UpdateConfigDto, @Res() res) {
        try {
            const updatedConfig = await this.configService.updateDefaultGrantedPages(dto.defaultGrantedPages);
            this.response.initResponse(true, 'Update config successfully', updatedConfig);
            return res.status(HttpStatus.CREATED).json(this.response);
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, 'An error occurs. Please try again', null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @UseGuards(JwtAuthGuard, AuthorizeGuard)
    @Roles(Role.SPSO)
    @Get('get')
    get(@Res() res) {
        try {
            const config = this.configService.getAll();
            this.response.initResponse(true, 'Get config successfully', config);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, 'An error occurs. Please try again', null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
}