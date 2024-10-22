import { IsOptional, IsString, IsUUID, IsInt } from 'class-validator';
import { UUID } from 'crypto';

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

  @IsOptional()
  @IsUUID()
  customerId?: UUID;
}
