import { GameObject } from "./GameObject";
import { TagName } from "./type";

export class DataBasic<T extends GameObject<any>> {
  protected _gameObject: T;
  protected _tagList: { [index: string]: any } = {};

  get gameObject(): T {
    return this._gameObject;
  }

  set gameObject(object: T | null) {
    if (object == this._gameObject) return;
    if (object) {
      if (this._gameObject) {
        this._gameObject.data = null;
      }
      this._gameObject = object;
      object.data = this;
    } else {
      const oldObject = this._gameObject;
      this._gameObject = null;
      oldObject.data = null;
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
