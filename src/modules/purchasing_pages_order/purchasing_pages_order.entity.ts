import { UUID } from "crypto";
import { UUIDV4 } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { PurchasingStatus } from "src/common/contants";
import { Customer } from "../user/customer.entity";

@Table
export class PurchasingPagesOrder extends Model<PurchasingPagesOrder> {
    @PrimaryKey
    @Default(UUIDV4)
    @Column(DataType.UUID)
    id: UUID;

    @Column(DataType.FLOAT)
    cost: number;

    @Default(0)
    @Column(DataType.INTEGER)
    numPages: number;

    @Default(PurchasingStatus.PENDING)
    @Column({
        type: DataType.ENUM(...Object.values(PurchasingStatus)),
        allowNull: false,
    })
    status: PurchasingStatus;

    @ForeignKey(() => Customer)
    @Column(DataType.UUID)
    customerId: UUID;

    @BelongsTo(() => Customer)
    customer: Customer;
}