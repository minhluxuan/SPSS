import { Controller, ForbiddenException, Get, HttpException, HttpStatus, InternalServerErrorException, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../services/auth.service";
import { Response } from "src/modules/response/response.entity";
import { SpsoService } from "../services/spso.service";
import { JwtAuthGuard } from "src/common/guards/authenticate.guard";
import { Role } from "src/common/contants";
import { CustomerService } from "../services/customer.service";
import { CustomerAuthGuard } from "src/common/guards/customer_authenticate.guard";
import { SpsoAuthGuard } from "src/common/guards/spso_authenticate.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly response : Response,
        private readonly authService: AuthService,
        private readonly spsoService: SpsoService,
        private readonly customerService: CustomerService
    ) {}

    @UseGuards(SpsoAuthGuard)
    @Post('spso/login')
    async loggedInBySpso(@Req() req, @Res() res) {
        try {
            const { user, accessToken } =  await this.authService.login(req.user, Role.SPSO);
            if (!accessToken) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }

            this.response.initResponse(true, "Login successfully", { ...user, accessToken});
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @UseGuards(CustomerAuthGuard)
    @Post('customer/login')
    async loggedInByCustomer(@Req() req, @Res() res) {
        try {
            const { user, accessToken } =  await this.authService.login(req.user, Role.CUSTOMER);
            if (!accessToken) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }

            this.response.initResponse(true, "Login successfully", { ...user, accessToken});
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('spso')
    async getSpsoInfo(@Req() req, @Res() res) {
        try {
            if (!req.user || !req.user.id) {
                throw new ForbiddenException("User is not allowed to access this resource");
            }

            const account = await this.spsoService.findOneById(req.user.id);
            this.response.initResponse(true, "Get information successfully", account);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, "Internal server error", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }    

    @UseGuards(JwtAuthGuard)
    @Get('customer')
    async getCustomerInfo(@Req() req, @Res() res) {
        try {
            if (!req.user || !req.user.id) {
                throw new ForbiddenException("User is not allowed to access this resource");
            }

            const account = await this.customerService.findOneById(req.user.id);
            this.response.initResponse(true, "Get information successfully", account);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, "Internal server error", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }    
}