import { DataBasic } from "../../DataBasic";
import { IdentityObject } from "./IdentityObject";
import { IdentityType, IdentityOption } from "./type";

export class Identity extends DataBasic<IdentityObject> {
  public static readonly colors = ["#07C160", "#e10602", "#2932e1", "#ffffff"];

  protected _type: IdentityType;
  protected _name: string;
  protected _inverted: boolean = false;

  get type() {
    return this._type;
  }

  get name() {
    return this._name;
  }

  get color() {
    return Identity.colors[this._type];
  }

  get inverted() {
    return this._inverted;
  }

  constructor(option: IdentityOption) {
    super();
    this._type = option.type;
    this._name = option.name;
    if (option.inverted) {
      this._inverted = option.inverted;
    }
    if (option.gameObject) {
      this.gameObject = option.gameObject;
    }
  }
}
