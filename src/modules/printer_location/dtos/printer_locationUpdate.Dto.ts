import { IsNotEmpty } from 'class-validator';

export class UpdatePrinterLocationDto{
   @IsNotEmpty()
   branch?: string;

   @IsNotEmpty()
   block?: string;

   @IsNotEmpty()
   room?: string;
}