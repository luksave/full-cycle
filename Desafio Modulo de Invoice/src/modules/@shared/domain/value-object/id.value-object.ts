import ValueObject from "./value-object.interface";
import { v4 as uuidv4 } from "uuid";

//Value Object não altera seu state depois de criado

export default class Id implements ValueObject {
  private _id: string;

  constructor(id?: string) {
    this._id = id || uuidv4(); //Gera ID se nenhum foi informado
  }

  get id(): string {
    return this._id;
  }

  getId(): string {
    return this._id;
  }
}
