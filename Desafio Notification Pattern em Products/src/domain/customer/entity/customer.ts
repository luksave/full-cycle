import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";


export default class Customer extends Entity {
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;


    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate(); //Objeto se valida no momento da sua construção

        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }

    }

    
    activate() {
        if(this._address === undefined)
            throw new Error("Address is mandatory ti activate a customer");

        this._active = true;
    }

    
    deactivate() {
        this._active = false;
    }


    get name(): string {
        return this._name;
    }

    
    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }


    get rewardPoints(): number {
        return this._rewardPoints;
    }


    isActive(): boolean {
        return this._active;
    }


    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    get Address(): Address {
        return this._address;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    validate(){
        if (this._id.length == 0)
            this.notification.addError({
                context: "customer", 
                message: "Id is required",
            });

        if (this._name.length == 0) 
            this.notification.addError({
                context: "customer", 
                message: "Name is required",
            });
    }


    set Address(address: Address) {
        this._address = address;
    }

}