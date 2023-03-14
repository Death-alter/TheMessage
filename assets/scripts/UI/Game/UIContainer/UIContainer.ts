import { _decorator, Component } from "cc";
import { DataClass } from "../../../Data/DataClass";
import { DataContainer } from "../../../Data/DataContainer/DataContainer";
const { ccclass, property } = _decorator;

@ccclass("UIContainer")
export abstract class UIContainer<T extends DataClass, U extends Component> extends Component {
  private _data: DataContainer<T, U>;

  get data() {
    return this._data;
  }

  set data(data) {
    if (data === this._data) return;
    if (data) {
      this._data = data;
      if (this._data.UI !== this) this._data.UI = this;
    } else if (this._data) {
      const data = this._data;
      this._data = null;
      data.UI = null;
    }
  }

  abstract init(): void;

  abstract onDataAdded(data: T): void;

  abstract onDataRemoved(data: T): void;

  abstract onAllDataRemoved(): void;
}
