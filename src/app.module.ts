import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { PurchasingPagesOrderModule } from './modules/purchasing_pages_order/purchasing_pages_order.module';
import { CustomerFeedbackModule } from './modules/feedback/customerfeedback.module';
import { DocumentModule } from './modules/document/document.module';
import { PrintingOrderModule } from './modules/printing_order/printing_order.module';
import { PrinterModule } from './modules/printer/printer.module';


@Module({
  imports: [DatabaseModule, UserModule, PurchasingPagesOrderModule, CustomerFeedbackModule, DocumentModule, PrintingOrderModule, PrinterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
