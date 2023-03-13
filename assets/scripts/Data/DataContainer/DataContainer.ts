import { DataClass } from "../DataClass";
import { UIContainer } from "../../UI/Game/UIContainer/UIContainer";
import { Component } from "cc";

export class DataContainer<T extends DataClass, U extends Component> extends DataClass {
  protected _UI: UIContainer<T, U>;
  protected _list: T[] = [];

  get list() {
    return this._list;
  }

  constructor(UI?: UIContainer<T, U>) {
    super();
    if (UI) {
      this.bindUI(UI);
    }
  }

  addData(data: T) {
    this._list.push(data);
    if (this._UI && data.UI) {
      this._UI.node.addChild(data.UI.node);
      this._UI.onDataAdded(data);
    }
  }

  removeData(data: T) {
    const index = this._list.indexOf(data);
    this._list.splice(index, 1);
    if (this._UI && data.UI.node) {
      this._UI.node.removeChild(data.UI.node);
      this._UI.onDataRemoved(data);
    }
  }

  removeAllData() {
    this._list = [];
    if (this._UI) {
      this._UI.node.removeAllChildren();
      this._UI.onAllDataRemoved();
    }
  }

  bindUI(UI) {
    this._UI = UI;
    this._UI.data = this;
    this._UI.init();
  }
}
