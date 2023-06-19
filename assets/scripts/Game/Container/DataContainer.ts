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
    console.log(this.gameObject);
    if (this.gameObject && data.gameObject) {
      this.gameObject.node.addChild(data.gameObject.node);
      this.gameObject.onDataAdded(data);
    }
  }

  removeData(data: T) {
    const index = this._list.indexOf(data);
    if (index === -1) return;
    this._list.splice(index, 1);
    if (this.gameObject && data.gameObject) {
      this.gameObject.node.removeChild(data.gameObject.node);
      this.gameObject.onDataRemoved(data);
    }
  }

  removeAllData() {
    const oldList = this._list;
    this._list = [];
    if (this.gameObject) {
      this.gameObject.node.removeAllChildren();
      for (let data of oldList) {
        this.gameObject.onDataRemoved(data);
      }
      this.gameObject.onAllDataRemoved();
    }
  }
}
