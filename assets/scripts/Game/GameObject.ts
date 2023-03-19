import { _decorator, Component } from "cc";
import { DataBasic } from "./DataBasic";
const { ccclass } = _decorator;

@ccclass("GameObject")
export class GameObject<T extends DataBasic<any>> extends Component {
  protected _data: T;

  get data(): T {
    return this._data;
  }

  set data(data: T | null) {
    if (data == this._data) return;
    if (data) {
      if (this._data) {
        this._data.gameObject = null;
      }
      this._data = data;
      data.gameObject = this;
    } else {
      const oldData = this._data;
      this._data = null;
      oldData.gameObject = null;
    }
  }
}
