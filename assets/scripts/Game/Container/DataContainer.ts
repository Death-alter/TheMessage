import { DataBasic } from "../../DataBasic";
import { GameObjectContainer } from "./GameObjectContainer";
import { GameObject } from "../../GameObject";

//T:DataBasic

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
    if (this.gameObject && data.gameObject) {
      this.gameObject.node.addChild(data.gameObject.node);
      this.gameObject.onDataAdded(data);
    }
  }

  removeData(data: T) {
    const index = this._list.indexOf(data);
    this._list.splice(index, 1);
    if (this.gameObject && data.gameObject.node) {
      this.gameObject.node.removeChild(data.gameObject.node);
      this.gameObject.onDataRemoved(data);
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
