import { IsOptional, IsString, IsUUID, IsInt } from 'class-validator';

export class CreateDocumentDto {
    @IsString({ message: 'Tên tài liệu phải là một chuỗi ký tự' })
    name?: string;

    @IsOptional()
    @IsInt()
    numPages?: number;
}
