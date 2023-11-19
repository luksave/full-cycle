import { Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
    tableName: "invoice-items",
    timestamps: false,
})
export class InvoiceItemsModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @ForeignKey(() => InvoiceModel )
    @Column({ allowNull: false })
    invoiceId: string;

    @BelongsTo(() => InvoiceModel)
    invoice: InvoiceModel;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    price: number;

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;
}