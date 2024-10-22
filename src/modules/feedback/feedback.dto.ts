import { IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateFeedbackDto {
    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsUUID()
    customerId?: UUID;
}

export class CreateSPSPOnFeedbackDto {
    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsUUID()
    customerId?: UUID;
}