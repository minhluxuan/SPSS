import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { PurchasingPagesOrderModule } from './modules/purchasing_pages_order/purchasing_pages_order.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { DocumentModule } from './modules/document/document.module';
import { PrintingOrderModule } from './modules/printing_order/printing_order.module';
import { PrinterModule } from './modules/printer/printer.module';
import { StorageModule } from './modules/storage/storage.module';
import { PrinterLocationModule } from './modules/printer_location/printer_location.module';
import { appProviders } from './app.provider';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [DatabaseModule, UserModule, PurchasingPagesOrderModule, FeedbackModule, DocumentModule, PrintingOrderModule, PrinterModule, StorageModule, PrinterLocationModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, ...appProviders],
})
export class AppModule {}
