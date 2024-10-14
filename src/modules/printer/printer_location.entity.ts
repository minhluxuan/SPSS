import { UUID } from "crypto";
import { UUIDV4 } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Printer } from "./printer.entity";

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

    @ForeignKey(() => Printer)
    @Column(DataType.UUID)
    printerId: UUID;

    @BelongsTo(() => Printer)
    printer: Printer;
}