import ValueObject from "./value-object.interface";

export default class Address implements ValueObject {
    private _street: string;
    private _number: string
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(street: string, number: string, complement: string, city: string, state: string, zipCode: string) {
        this._street = street;
        this._number = number;
        this._complement = complement;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    equals(address: Address): boolean {
        return this._street === address.street &&
            this._number === address.number &&
            this._complement === address.complement &&
            this._city === address.city &&
            this._state === address.state &&
            this._zipCode === address.zipCode;
    }

    toString(): string {
        return `${this._street}, ${this._number}, ${this._complement}, ${this._city}, ${this._state}, ${this._zipCode}`;
    }

}
