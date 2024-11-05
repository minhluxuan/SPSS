import { Module } from '@nestjs/common';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';
import { printerProvider } from './printer.provider';
import { ResponseModule } from '../response/response.module';
import { PrinterLocationModule } from '../printer_location/printer_location.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [ResponseModule, PrinterLocationModule, UserModule],
    controllers: [PrinterController],
    providers: [printerProvider ,PrinterService],
    exports: [PrinterService, ResponseModule, printerProvider]
})
export class PrinterModule {}
