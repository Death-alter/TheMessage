import { GameObject } from "./GameObject";

export class DataBasic<T extends GameObject<any>> {
  protected _gameObject: T;

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
}
