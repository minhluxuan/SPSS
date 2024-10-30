import { IsOptional, IsString, IsUUID, IsInt } from 'class-validator';

export class CreateDocumentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  mimeType?: string;

  @IsOptional()
  @IsInt()
  numPages?: number;
}
