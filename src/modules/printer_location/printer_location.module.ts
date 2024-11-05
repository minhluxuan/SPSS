import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { PrinterLocationController } from "./printer_location.controller";
import { printerLocationProvider } from "./printer_location.provider";
import { PrinterLocationService } from "./printer_location.service";
import { ResponseModule } from "../response/response.module";
import { DatabaseModule } from "src/database/database.module";
import { PrinterLocation } from "./printer_location.entity";
import { UserModule } from "../user/user.module";

@Module({
   imports: [ResponseModule, DatabaseModule, UserModule],
   controllers: [PrinterLocationController],
   providers: [...printerLocationProvider, PrinterLocationService],
   exports: [PrinterLocationService, ...printerLocationProvider]
})
export class PrinterLocationModule {}
