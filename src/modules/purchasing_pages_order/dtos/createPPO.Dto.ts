import { IsNotEmpty, IsUUID, IsNumber, IsEnum, IsInt } from 'class-validator';
import { UUID } from 'crypto';
import { PurchasingStatus } from "src/common/contants";

export class CreatePPODto{
   @IsInt({ message: 'Số trang phải là một số nguyên' })
   numPages: number;
}