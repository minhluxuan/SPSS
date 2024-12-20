import { UUID } from "crypto";
import { UUIDV4 } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { PaperOrientation, PaperSize, PrintingStatus, PurchasingStatus } from "src/common/contants";
import { Document } from "../document/document.entity";
import { Customer } from "../user/customer.entity";
import { Printer } from "../printer/printer.entity";

@Table
export class PrintingOrder extends Model<PrintingOrder> {
    @PrimaryKey
    @Default(UUIDV4)
    @Column(DataType.UUID)
    id: UUID;

    @Column(DataType.TINYINT)
    numFaces: number;

    // Ban dau gui len bang pending
    @Default('PENDING')
    @Column({
        type: DataType.ENUM(...Object.keys(PrintingStatus)),
        allowNull: false
    })
    printingStatus: PrintingStatus;

    // Ban dau gui len bang pending
    @Default('PENDING')
    @Column({
        type: DataType.ENUM(...Object.keys(PurchasingStatus)),
        allowNull: false
    })
    purchasingStatus: PurchasingStatus;

    @Column({
        type: DataType.ENUM(...Object.keys(PaperOrientation))
    })
    orientation: PaperOrientation;

    @Column({
        type: DataType.ENUM(...Object.keys(PaperSize)),
        allowNull: false
    })
    size: PaperSize;

    @ForeignKey(() => Document)
    @Column(DataType.UUID)
    documentId: UUID;

    @BelongsTo(() => Document)
    document: Document;

    @ForeignKey(() => Printer)
    @Column(DataType.UUID)
    printerId: UUID;

    @BelongsTo(() => Printer)
    printer: Printer;

    @ForeignKey(() => Customer)
    @Column(DataType.UUID)
    customerId: UUID;

    @BelongsTo(() => Customer)
    customer: Customer;
}