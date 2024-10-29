import { IsNotEmpty } from 'class-validator';

export class UpdatePrinterLocationDto{
   @IsNotEmpty()
   bracnh?: string;

   @IsNotEmpty()
   block?: string;

   @IsNotEmpty()
   room?: string;
}