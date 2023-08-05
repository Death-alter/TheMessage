import { IdentityType, IdentityOption } from "./type";

export class Identity {
  public static readonly colors = ["#07C160", "#e10602", "#2932e1", ""];

  protected _type: IdentityType;
  protected _name: string;

  get type() {
    return this._type;
  }

  get name() {
    return this._name;
  }

  get color() {
    return Identity.colors[this._type];
  }

  constructor(option: IdentityOption) {
    this._type = option.type;
    this._name = option.name;
  }
}
