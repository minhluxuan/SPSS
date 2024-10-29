import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ResponseModule } from '../response/response.module';
import { DatabaseModule } from 'src/database/database.module';
import { PurchasingPagesOrderService } from './purchasing_pages_order.service';
import { PurchasingPagesOrderController } from './purchasing_pages_order.controller';
import { purchasingPagesOrderProvider } from './purchasing_pages_order.provider';
import { AuthService } from '../user/services/auth.service';



@Module({
  imports:[ResponseModule, JwtModule.register({
      secret: process.env.JWT_ACCESS_KEY,
  signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
  }), DatabaseModule],
  providers: [PurchasingPagesOrderService, ...purchasingPagesOrderProvider, Response, AuthService],
  controllers: [PurchasingPagesOrderController],

})
export class PurchasingPagesOrderModule {}
