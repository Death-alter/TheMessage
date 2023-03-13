import { DataClass } from "../DataClass";
import { UIContainer } from "../../UI/Game/UIContainer/UIContainer";
import { Component } from "cc";

export class DataContainer<T extends DataClass, U extends Component> extends DataClass {
  protected _UI: UIContainer<U>;
  protected _list: T[] = [];

  get list() {
    return this._list;
  }

  constructor(UI?: UIContainer<U>) {
    super(UI);
  }

  addData(data: T) {
    this._list.push(data);
    if (this._UI && data.UI) {
      this._UI.node.addChild(data.UI);
    }
  }

  removeData(data: T) {
    const index = this._list.indexOf(data);
    this._list.splice(index, 1);
    if (this._UI) {
      this._UI.node.removeChild(data.UI);
    }
  }

  removeAllData() {
    this._list = [];
    if (this._UI) {
      this._UI.node.removeAllChildren();
    }
  }

  bindUI(UI) {
    this._UI = UI;
    this._UI.data = this;
  }
}
