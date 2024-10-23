import { Module } from '@nestjs/common';
import { PrinterController } from './printer.controller';
import { PrinterService } from './printer.service';
import { Printer } from './printer.entity';
import { printerProvider } from './printer.provider';

@Module({
  controllers: [PrinterController],
  providers: [printerProvider ,PrinterService],
  imports: [Printer],
  exports: [PrinterService]
})
export class PrinterModule {}
