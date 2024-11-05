import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { PrintingStatus, PurchasingStatus, PaperOrientation, PaperSize } from '../../../common/contants/index';
import { UUID } from "crypto";

export class CreateOrderDto{
    @IsNotEmpty()
    @IsNumber()
    numFaces: number; // Number of faces for printing
  
    @IsEnum(PaperOrientation)
    orientation?: PaperOrientation; // Optional paper orientation
  
    @IsNotEmpty()
    @IsEnum(PaperSize)
    size: PaperSize; // Paper size (e.g., A4, A3)
  
    @IsNotEmpty()
    @IsUUID()
    documentId: UUID; // Document ID related to the printing order
  
    @IsNotEmpty()
    @IsUUID()
    printerId: UUID; // Printer ID associated with the printing order
}