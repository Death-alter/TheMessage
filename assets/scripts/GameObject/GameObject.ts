import { _decorator, Component, Label, Node } from "cc";
import { DataBasic } from "../Data/DataBasic";
const { ccclass, property } = _decorator;

@ccclass("GameObject")
export class GameObject<T extends DataBasic<any>> extends Component {
  protected _data: T;

  get data(): T {
    return this._data;
  }
  set data(data: T) {
    if (data === this._data) return;
    if (data) {
      if (data.gameObject === this) {
        data.gameObject.data = null;
      }
      if (this._data.gameObject !== this) this._data.gameObject = this;
      this._data = data;
    } else if (this._data) {
      const data = this._data;
      this._data = null;
      data.gameObject = null;
    }
  }
}
