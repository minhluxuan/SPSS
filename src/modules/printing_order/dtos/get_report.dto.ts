import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class GetReportDto {
    @IsUUID(4, { message: 'Printer ID must be a version 4 UUID' } )
    printerId: UUID;

    @IsOptional()
    @IsString({ message: 'Day must be a string' })
    day: string;

    @IsOptional()
    @IsString({ message: 'Month must be a string' })
    month: string;
}