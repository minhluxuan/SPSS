import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UpdatePrinterDto{
   @IsNotEmpty()
   name?: string;

   @IsNotEmpty()
   brand?: string;

   @IsNotEmpty()
   active?: boolean;

   @IsNotEmpty()
   @IsUUID()
   locationID?: UUID;
}