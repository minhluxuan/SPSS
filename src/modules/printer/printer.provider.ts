import { PRINTER_REPOSITORY } from "src/common/contants";
import { Printer } from "./printer.entity";

export const printerProvider = {
   provide: PRINTER_REPOSITORY,
   useValue: Printer
}