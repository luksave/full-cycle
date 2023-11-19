import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id: Id; //Obrigatório, pois dessa vez não estamos criando um produto!
    name: string;
    description: string;
    salesPrice: number;
  };

export default class Product extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _description: string;
    private _salesPrice: number;
    
    constructor(props: ProductProps) {
        super(props.id);
        this._name = props.name;
        this._description = props.description;
        this._salesPrice = props.salesPrice;
    }

    //Apenas gets, pois não queremos que o usuário altere os valores do produto

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get salesPrice(): number {
        return this._salesPrice;
    }

}
