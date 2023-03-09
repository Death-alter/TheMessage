import { IdentityType, IdentityOption } from "./type";

export class Identity {
  protected _type: IdentityType;
  protected _name: string;
  protected _color: string;

  get type() {
    return this._type;
  }

  get name() {
    return this._name;
  }

  get color() {
    return this._color;
  }

  constructor(option: IdentityOption) {
    this._type = option.type;
    this._name = option.name;
    this._color = option.color;
  }
}

