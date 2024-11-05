import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SEQUELIZE } from 'src/common/contants';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { CustomerService } from '../services/customer.service';

@Injectable()
export class CustomerLocalStrategy extends PassportStrategy(Strategy, 'customer-local') {
    constructor(
		@Inject(SEQUELIZE) private readonly sequelize: Sequelize,
		private readonly authService: AuthService,
		private readonly customerService: CustomerService
    ) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }

    async validate(identifier: string, password: string): Promise<any>{
        const user = await this.authService.validateCustomer(identifier, password);

        if (!user) {
         	throw new UnauthorizedException('Invalid user credentials');
        }

        await this.customerService.updateLastLogin(user.id);
        return await this.customerService.findOneById(user.id);
    }
}