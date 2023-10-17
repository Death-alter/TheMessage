import { TagName } from "./type";

export class DataBasic {
  protected _tagList: { [index: string]: any } = {};

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
