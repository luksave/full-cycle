import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id?: Id;
    name: string;
    salesPrice: number;
    description: string;
};

export default class Product extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _salesPrice: number;
    private _description: string;
    private _purchasePrice: any;
    private _stock: any;

    constructor(props: ProductProps) {
        super(props.id);
        this._name = props.name;
        this._salesPrice = props.salesPrice;
        this._description = props.description;
    }

    get name(): string {
        return this._name;
    }

    get salesPrice(): number {
        return this._salesPrice;
    }

    get description(): string {
        return this._description;
    }

    get purchasePrice(): number {
        return this._purchasePrice;
    }

    get stock(): number {
        return this._stock;
    }
}