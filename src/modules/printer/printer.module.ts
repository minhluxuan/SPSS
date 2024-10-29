import { Module } from '@nestjs/common';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';
import { printerProvider } from './printer.provider';
import { ResponseModule } from '../response/response.module';

@Module({
  imports: [ResponseModule],
  controllers: [PrinterController],
  providers: [printerProvider ,PrinterService],
  exports: [PrinterService, ResponseModule]
})
export class PrinterModule {}
