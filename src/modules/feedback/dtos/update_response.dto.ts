import { IsString } from "class-validator";

export class UpdateFeedbackResponseDto {
    @IsString({ message: 'Content must be a string' })
    content: string;
}