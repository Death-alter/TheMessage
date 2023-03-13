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
    if (!data || data === this.data) return;
    this._data = data;
  }

  abstract init(): void;

  abstract onDataAdded(data: T): void;

  abstract onDataRemoved(data: T): void;

  abstract onAllDataRemoved(): void;
}
