import { IsOptional, IsString } from "class-validator";

export class CreateCustomerFeedbackDto {
    @IsString({ message: 'Content must be a string' })
    content?: string;
}
