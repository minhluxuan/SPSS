import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePrinterLocationDto{
   @IsString({ message: 'Branch must be a string'})
   branch: string;

   @IsString({ message: 'Block must be a string' })
   block: string;

   @IsString({ message: 'Room must be a string' })
   room: string;
}