import OrderItem from "./orderItem";
export default class Order {


    //Se está em diferentes agregados, a relação é feita por ID
    //Se está no mesmo agregado, a relação é pelo mesmo objeto (pela mesma classe)

    private _id: string;
    private _customerId: string;   //Por isso aqui estamos relacionando o ID de customer
    private _items: OrderItem[];   //E aqui o objeto como um todo
    private _total: number;

    
    constructor (id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }


    get id(): string {
        return this._id;
    }
    
    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    changeCustomerId(id: string) {
        this._customerId = id;
        this.validate();
    }

    validate(): boolean {
        if (this._id.length === 0) 
            throw new Error("Id is required");
        
        if (this._customerId.length === 0) 
            throw new Error("CustomerId is required");
        
        if (this._items.length === 0) 
            throw new Error("Items are required");
    
        if (this._items.some((item) => item.quantity <= 0)) 
            throw new Error("Quantity must be greater than 0");
        
        return true;
    }
    
    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }

}