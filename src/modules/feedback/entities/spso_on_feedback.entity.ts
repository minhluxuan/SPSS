import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { SPSO } from "../../user/spso.entity";
import { UUID } from "crypto";
import { Feedback } from "./feedback.entity";

@Table
export class SPSPOnFeedback extends Model<SPSPOnFeedback> {
    @ForeignKey(() => SPSO)
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    spsoId: UUID;

    @ForeignKey(() => Feedback)
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    feedbackId: UUID;

    @Column(DataType.TEXT)
    content: string;

    @BelongsTo(() => Feedback)
    feedback: Feedback;
}