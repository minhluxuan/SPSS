import { IsNumber } from "class-validator";

export class UpdateConfigDto {
    @IsNumber({}, { message: 'Default granted pages must be a number' })
    defaultGrantedPages: number;
}