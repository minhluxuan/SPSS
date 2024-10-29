import { IsNotEmpty } from 'class-validator';

export class CreatePrinterLocationDto{
   @IsNotEmpty()
   bracnh: string;

   @IsNotEmpty()
   block: string;

   @IsNotEmpty()
   room: string;
}