import { Entity } from "./Entity";
import { TagName } from "./type";

export class DataBasic<T extends Entity<any>> {
  protected _entity: T;
  protected _tagList: { [index: string]: any } = {};

  get entity(): T {
    return this._entity;
  }

  set entity(object: T | null) {
    if (object == this._entity) return;
    if (object) {
      if (this._entity) {
        this._entity.data = null;
      }
      this._entity = object;
      object.data = this;
    } else {
      const oldEntity = this._entity;
      this._entity = null;
      oldEntity.data = null;
    }
  }

  addTag(name: TagName, data?: any) {
    if (data == null) {
      this._tagList[name] = null;
    } else {
      this._tagList[name] = data;
    }
  }

  hasTag(name: TagName) {
    return this._tagList.hasOwnProperty(name);
  }

  getTagData(name: TagName) {
    return this._tagList[name];
  }

  removeTag(name: TagName) {
    delete this._tagList[name];
  }
}
