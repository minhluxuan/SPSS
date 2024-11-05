import { UUID } from "crypto";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Default, HasMany, Model, PrimaryKey, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { PrinterLocation } from "../printer_location/printer_location.entity";
import { PrintingOrder } from "../printing_order/printing_order.entity";

@Table
export class Printer extends Model<Printer> {
    @PrimaryKey
    @Default(UUIDV4)
    @Column(DataType.UUID)
    id: UUID;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    brand: string;

    @Column(DataType.BOOLEAN)
    active: boolean;

    @ForeignKey(() => PrinterLocation)
    @Column(DataType.UUID)
    locationId: UUID;

    @BelongsTo(() => PrinterLocation)
    location: PrinterLocation;

    @HasMany(() => PrintingOrder)
    printingOrders: PrintingOrder[];
}