import { UUID } from "crypto";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Default, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { SPSPOnFeedback } from "../feedback/spso_on_feedback.entity";

@Table
export class SPSO extends Model<SPSO> {
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

    @Column(DataType.STRING)
    phoneNumber: string;

    @Column(DataType.DATE)
    lastLogin: Date;

    @HasMany(() => SPSPOnFeedback)
    responses: SPSPOnFeedback[];
}