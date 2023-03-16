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
      this.bindData(data);
    } else {
      this.unbindData();
    }
  }

  private bindData(data) {
    this._data = data;
    data.gameObject = this;
  }

  private unbindData() {
    const oldData = this._data;
    this._data = null;
    oldData.gameObject = null;
  }
}
