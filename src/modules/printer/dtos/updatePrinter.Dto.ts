import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UpdatePrinterDto{
   @IsOptional()
   @IsNotEmpty()
   name?: string;

   @IsOptional()
   @IsNotEmpty()
   brand?: string;

   @IsOptional()
   @IsNotEmpty()
   active?: boolean;

   @IsOptional()
   @IsUUID()
   locationId?: UUID;
}