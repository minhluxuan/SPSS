import { Module } from "@nestjs/common";
import { PrinterLocationController } from "./printer_location.controller";
import { printerlocationProvider } from "./printer_location.provider";
import { PrinterLocationService } from "./printer_location.service";
import { ResponseModule } from "../response/response.module";

@Module({
   imports: [ResponseModule],
   controllers: [PrinterLocationController],
   providers: [printerlocationProvider, PrinterLocationService],
})
export class PrinterLocationModule {}
