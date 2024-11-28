import { UUID } from "crypto";
import { UUIDV4 } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Customer } from "../user/customer.entity";
import { PrintingOrder } from "../printing_order/printing_order.entity";

@Table
export class Document extends Model<Document> {
    @PrimaryKey
    @Default(UUIDV4)
    @Column(DataType.UUID)
    id: UUID;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    mimeType: string;

    @Column(DataType.INTEGER)
    numPages: number;

    @Column(DataType.STRING)
    path: string;

    @ForeignKey(() => Customer)
    @Column(DataType.UUID)
    customerId: UUID;

    @BelongsTo(() => Customer)
    customer: Customer;

    @HasMany(() => PrintingOrder)
    printingOrders: PrintingOrder[];
}