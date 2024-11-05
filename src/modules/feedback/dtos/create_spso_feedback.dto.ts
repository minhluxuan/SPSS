import { IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateSpsoFeedbackDto {
    @IsString({ message: 'Content must be a string' })
    content: string;

    @IsUUID('4', { message: 'Feedback ID must be an UUID v4' })
    feedbackId: UUID;
}