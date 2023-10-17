import { DataBasic } from "../../DataBasic";
import { GameObjectContainer } from "./GameObjectContainer";
import { GameObject } from "../../GameObject";

export class DataContainer<T extends DataBasic<any>> extends DataBasic<GameObjectContainer<GameObject<T>>> {
  protected _list: T[] = [];

  get list() {
    return this._list;
  }

  constructor(gameObject?: GameObjectContainer<GameObject<T>>) {
    super();
  }

  addData(data: T) {
    this._list.push(data);
  }

  removeData(data: T) {
    const index = this._list.indexOf(data);
    if (index === -1) return;
    this._list.splice(index, 1);
  }

  removeAllData() {
    const oldList = this._list;
    this._list = [];
  }
}
