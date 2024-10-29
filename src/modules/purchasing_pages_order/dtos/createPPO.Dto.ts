import { IsNotEmpty, IsUUID, IsNumber, IsEnum } from 'class-validator';
import { UUID } from 'crypto';
import { PurchasingStatus } from "src/common/contants";

export class CreatePPODto{
   @IsNotEmpty()
   @IsNumber()
   cost: number;

   @IsNotEmpty()
   @IsEnum(PurchasingStatus)
   status: PurchasingStatus;

   @IsUUID()
   @IsNotEmpty()
   CustomerID?: UUID;
}