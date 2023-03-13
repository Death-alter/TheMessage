import { _decorator, Component } from "cc";
import { DataClass } from "../../../Data/DataClass";
import { DataContainer } from "../../../Data/DataContainer/DataContainer";
const { ccclass, property } = _decorator;

@ccclass("UIContainer")
export class UIContainer<T extends Component> extends Component {
  private _data: DataContainer<DataClass, T>;

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
  }
}
