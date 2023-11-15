import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

interface InvoiceItemsModel {
    id: string;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

@Table({
    tableName: "invoices",
    timestamps: false,
})
export class InvoiceModel extends Model {
    
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    document: string;

    //Como o Address é um value object, não é necessário criar uma tabela para ele
    //mas sim, criar as colunas na tabela de invoice
    @Column({ allowNull: false })
    street: string;

    @Column({ allowNull: false })
    number: string;

    @Column({ allowNull: false })
    complement: string;

    @Column({ allowNull: false })
    city: string;

    @Column({ allowNull: false })
    state: string;

    @Column({ allowNull: false })
    zipCode: string;
    
    @Column({ allowNull: false, type: DataType.JSON })
    items: InvoiceItemsModel[];

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;
}
    
