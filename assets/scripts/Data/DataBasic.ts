import { GameObject } from "../GameObject/GameObject";

export class DataBasic<T extends GameObject<any>> {
  protected _gameObject: T;

  constructor(object?: T) {
    if (object) {
      this.gameObject = object;
    }
  }

  get gameObject(): T {
    return this._gameObject;
  }

  set gameObject(object: T | null) {
    if (object === this._gameObject) return;
    if (object) {
      if (object.data === this) {
        object.data.gameObject = null;
      }
      if (object.data !== this) object.data = this;
      this._gameObject = object;
    } else if (this._gameObject) {
      const gameObject = this._gameObject;
      this._gameObject = null;
      gameObject.data = null;
    }
  }
}
