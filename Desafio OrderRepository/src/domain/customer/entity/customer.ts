//ORM - Mapeamento objeto-relacional: criamos nossas classes de acordo
//com o que teremos no banco de dados.

import Address from "../value-object/address";

//Prende muito a aplicação

export default class Customer {
    //Como temos um ID já temos uma propriedade da entidade, a entidade é única
    private _id: string;
    //Os outros atributos podem ir mudando com o tempo
    private _name: string;
    //Esse tipo primitivo não ajuda com a expressividade, para isso vamos criar um value object (classe address)
    //_address: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    //Entidade anêmica: tudo que essa entidade faz é armazenar dados, parece muito com um DTO
    //Padrão DTO -> Data Transfer Objetc (usado para transferir dados de uma camada para a outra na aplicação)

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate(); //Objeto se valida no momento da sua construção
    }

    //Uma entidade também tem comportamento e regras de negócio. Regras de negócio são o que fazem o DDD ser o DDD
    //São formas de mudar o comportamento da entidade com validações, fórmulas ou qualquer coisa que o sistema esteja pedindo

    /*
        get id(): string { return this._id; }

        get name(): string { return this._name; }

        get address(): string { return this._address; }    
        
        //Pode passar por cima da regra de negócio
        set name(name: string) { this._name = name; }

        set address(address: string) { this._address = address; }
    */

    
    activate() { //=== significa != em typescript
        if(this._address === undefined)
            throw new Error("Address is mandatory ti activate a customer");

        this._active = true;
    }

    
    deactivate() {
        this._active = false;
    }


    get id(): string {
        return this._id;
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
            throw new Error("ID is required");

        if (this._name.length == 0) 
            throw new Error("Name is required");
    }


    set Address(address: Address) {
        this._address = address;
    }

}