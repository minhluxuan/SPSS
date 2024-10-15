import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ResponseModule } from '../response/response.module';
import { DatabaseModule } from 'src/database/database.module';
import { PrintingOrderController } from './controllers/printing_order.controller';
import { PrintingOrderService } from './services/printing_order.service';
import { PrintingOrderProvider } from './printing_order.provider';

@Module({
    imports:[ResponseModule, JwtModule.register({
        secret: process.env.JWT_ACCESS_KEY,
		signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    }), DatabaseModule],
    controllers:[PrintingOrderController],
    providers:[...PrintingOrderProvider,PrintingOrderService],
    exports:[],
})
export class PrintingOrderModule {}
