import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";

/**
 * O evento de endereço de cliente é alterado está sendo representado por uma classes que implementa a 
 * interface EventInterface. 
 * Essa classe conhece o momento em que o evento ocorreu e a informação do evento:
 * ID, NOME E ENDEREÇO DO CLIENTE
 */

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;
  //_id: string;
  //_nome: string;
  //_endereco: Address;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
    //this._id = id;
    //this._nome = nome;
    //this._endereco = endereco;
    
  }

  /*get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get endereco(): Address {
    return this._endereco;
  }*/

}