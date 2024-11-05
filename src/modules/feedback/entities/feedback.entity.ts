import { UUID } from "crypto";
import { UUIDV4 } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Customer } from "../../user/customer.entity";

@Table
export class Feedback extends Model<Feedback> {
    @PrimaryKey
    @Default(UUIDV4)
    @Column(DataType.UUID)
    id: UUID;

    @Column(DataType.TEXT)
    content: string;

    @ForeignKey(() => Customer)
    @Column(DataType.UUID)
    customerId: UUID;

    @BelongsTo(() => Customer)
    customer: Customer;
}