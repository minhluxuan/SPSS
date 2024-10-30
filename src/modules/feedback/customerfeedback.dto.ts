import { IsOptional, IsString } from "class-validator";

export class CreateCustomerFeedbackDto {
    @IsOptional()
    @IsString()
    content?: string;
}
