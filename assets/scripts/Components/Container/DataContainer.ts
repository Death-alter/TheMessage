import { DataBasic } from "../../DataBasic";
import { EntityContainer } from "./EntityContainer";
import { Entity } from "../../Entity";

export class DataContainer<T extends DataBasic<any>> extends DataBasic<EntityContainer<Entity<T>>> {
  protected _list: T[] = [];

  get list() {
    return this._list;
  }

  constructor(entity?: EntityContainer<Entity<T>>) {
    super();
    if (entity) {
      this.entity = entity;
    }
  }

  addData(data: T) {
    this._list.push(data);
    if (this.entity) {
      this.entity.onDataAdded(data);
    }
  }

  removeData(data: T) {
    const index = this._list.indexOf(data);
    if (index === -1) return;
    this._list.splice(index, 1);
    if (this.entity && data.entity) {
      this.entity.node.removeChild(data.entity.node);
      this.entity.onDataRemoved(data);
    }
  }

  removeAllData() {
    const oldList = this._list;
    this._list = [];
    if (this.entity) {
      this.entity.node.removeAllChildren();
      for (const data of oldList) {
        this.entity.onDataRemoved(data);
      }
      this.entity.onAllDataRemoved();
    }
  }
}
