import { UUID } from "crypto";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Printer } from "../printer/printer.entity";

@Table
export class PrinterLocation extends Model<PrinterLocation> {
    @PrimaryKey
    @Default(UUIDV4)
    @Column(DataType.UUID)
    id: UUID;

    @Column(DataType.STRING)
    branch: string;

    @Column(DataType.STRING)
    block: string;

    @Column(DataType.STRING)
    room: string;

    @HasMany(() => Printer)
    printer: Printer[];
}