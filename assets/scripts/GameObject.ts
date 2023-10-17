import { _decorator, Component } from "cc";
import { DataBasic } from "./DataBasic";
const { ccclass } = _decorator;

@ccclass("GameObject")
export class GameObject<T extends DataBasic> extends Component {
  protected _data: T;

  get data(): T {
    return this._data;
  }

  set data(data: T | null) {
    this.setData(data);
  }

  protected setData(data: T | null) {
    if (data == this._data) return;
    this._data = data;
  }
}
