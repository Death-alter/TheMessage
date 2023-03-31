import { DataBasic } from "../../DataBasic";
import { GameObjectContainer } from "./GameObjectContainer";
import { GameObject } from "../../GameObject";

export class DataContainer<T extends DataBasic<GameObject<T>>> extends DataBasic<GameObjectContainer<GameObject<T>>> {
  protected _list: T[] = [];

  get list() {
    return this._list;
  }

  constructor(gameObject?: GameObjectContainer<GameObject<T>>) {
    super();
    if (gameObject) {
      this.gameObject = gameObject;
    }
  }

  addData(data: T) {
    this._list.push(data);
    if (this.gameObject) {
      this.gameObject.onDataAdded(data);
      if (data.gameObject) this.gameObject.node.addChild(data.gameObject.node);
    }
  }

  removeData(data: T) {
    const index = this._list.indexOf(data);
    this._list.splice(index, 1);
    if (this.gameObject) {
      this.gameObject.onDataRemoved(data);
      if (data.gameObject) this.gameObject.node.removeChild(data.gameObject.node);
    }
  }

  removeAllData() {
    this._list = [];
    if (this.gameObject) {
      this.gameObject.node.removeAllChildren();
      this.gameObject.onAllDataRemoved();
    }
  }
}
