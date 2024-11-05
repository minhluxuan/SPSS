import { PrinterLocation } from "./printer_location.entity"
import { PRINTER_LOCATION_REPOSITORY} from "src/common/contants"

export const printerLocationProvider = [{
   provide: PRINTER_LOCATION_REPOSITORY,
   useValue: PrinterLocation
}]