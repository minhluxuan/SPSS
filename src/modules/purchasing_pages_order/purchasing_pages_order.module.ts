import { Module } from '@nestjs/common';
import { PurchasingPagesOrderService } from './purchasing_pages_order.service';
import { PurchasingPagesOrderController } from './purchasing_pages_order.controller';
import { purchasingPagesOrderProvider } from './purchasing_pages_order.provider';

@Module({
  providers: [PurchasingPagesOrderService, purchasingPagesOrderProvider],
  controllers: [PurchasingPagesOrderController],
})
export class PurchasingPagesOrderModule {}
