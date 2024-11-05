import { Module } from '@nestjs/common';
import { ResponseModule } from '../response/response.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { SpsoLocalStrategy } from './strategies/spso_local.strategy';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { userProvider } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { SpsoService } from './services/spso.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CustomerService } from './services/customer.service';
import { CustomerLocalStrategy } from './strategies/customer_local.strategy';

@Module({
    imports: [ResponseModule, JwtModule.register({
		secret: process.env.JWT_ACCESS_KEY,
		signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
}), DatabaseModule],
    providers: [...userProvider, AuthService, SpsoService, CustomerService, JwtStrategy, CustomerLocalStrategy, SpsoLocalStrategy],
    controllers: [AuthController],
    exports: [...userProvider, AuthService]
})
export class UserModule {}
