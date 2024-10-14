import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SEQUELIZE } from 'src/common/contants';
import { Sequelize } from 'sequelize-typescript';
import { SpsoService } from '../services/spso.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SpsoLocalStrategy extends PassportStrategy(Strategy, 'spso-local') {
    constructor(
		@Inject(SEQUELIZE) private readonly sequelize: Sequelize,
		private readonly authService: AuthService,
		private readonly spsoService: SpsoService
    ) {
        super({
          usernameField: 'username',
          passwordField: 'password',
        });
      }

    async validate(identifier: string, password: string): Promise<any>{
        const user = await this.authService.validateSPSO(identifier, password);
		console.log(await bcrypt.hash(password, 10));
        if (!user) {
         	throw new UnauthorizedException('Invalid user credentials');
        }

        await this.spsoService.updateLastLogin(user.id);
        return await this.spsoService.findOneById(user.id);
    }
}