import { UUID } from "crypto";
import { UUIDV4 } from "sequelize";
import { Table, Model, PrimaryKey, Default, DataType, Column, Unique, HasMany } from "sequelize-typescript";
import { PurchasingPagesOrder } from "../purchasing_pages_order/purchasing_pages_order.entity";
import { PrintingOrder } from "../printing_order/printing_order.entity";
import { Document } from "../document/document.entity";
import { Feedback } from "../feedback/feedback.entity";

@Table
export class Customer extends Model<Customer> {
    @PrimaryKey
    @Default(UUIDV4)
    @Column(DataType.UUID)
    id: UUID;

    @Unique
    @Column(DataType.STRING)
    username: string;

    @Column(DataType.STRING)
    email: string;

    @Column(DataType.STRING)
    password: string;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    lastName: string;

    @Column(DataType.INTEGER)
    extraPages: number;

    @Column(DataType.DATE)
    lastLogin: Date;

    @HasMany(() => PurchasingPagesOrder)
    purchasingPagesOrders: PurchasingPagesOrder[];

    @HasMany(() => PrintingOrder)
    printingOrders: PrintingOrder[];

    @HasMany(() => Document)
    documents: Document;

    @HasMany(() => Feedback)
    feedbacks: Feedback[];
}