import { DataClass } from "../DataClass";
import { UIContainer } from "../../UI/Game/UIContainer/UIContainer";
import { Component } from "cc";

export class DataContainer<T extends DataClass, U extends Component> extends DataClass {
  protected _UI: UIContainer<T, U>;
  protected _list: T[] = [];

  get UI() {
    return this._UI;
  }
  set UI(UI: UIContainer<T, U> | null) {
    if (UI) {
      this._UI = UI;
      this._UI.data = this;
      this._UI.init();
    } else if (this._UI) {
      this._UI.data = null;
      this._UI = null;
    }
  }

  get list() {
    return this._list;
  }

  constructor(UI?: UIContainer<T, U>) {
    super();
    if (UI) {
      this.UI = UI;
    }
  }

  addData(data: T) {
    this._list.push(data);
    if (this.UI && data.UI) {
      this.UI.node.addChild(data.UI.node);
      this.UI.onDataAdded(data);
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
}
