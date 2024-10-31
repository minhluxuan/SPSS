import { IsOptional, IsString } from "class-validator";

export class CreateSpsoFeedbackDto {
    @IsOptional()
    @IsString()
    content?: string;
}