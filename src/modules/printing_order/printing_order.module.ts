import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ResponseModule } from '../response/response.module';
import { DatabaseModule } from 'src/database/database.module';
import { PrintingOrderController } from './controllers/printing_order.controller';
import { PrintingOrderService } from './services/printing_order.service';
import { PrintingOrderProvider } from './printing_order.provider';
import { PrinterModule } from '../printer/printer.module';
import { DocumentModule } from '../document/document.module';
import { UserModule } from '../user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PrintingOrder } from './printing_order.entity';
import { Printer } from '../printer/printer.entity';
import { Customer } from '../user/customer.entity';
import { Document } from '../document/document.entity';

@Module({
    imports:[ResponseModule, JwtModule.register({
        secret: process.env.JWT_ACCESS_KEY,
		signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    }), DatabaseModule, PrinterModule, DocumentModule, UserModule],
    controllers:[PrintingOrderController],
    providers:[...PrintingOrderProvider, PrintingOrderService],
    exports:[],
})
export class PrintingOrderModule {}
