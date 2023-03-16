import { GameObject } from "../GameObject/GameObject";

export class DataBasic<T extends GameObject<any>> {
  protected _gameObject: T;

  constructor() {}

  get gameObject(): T {
    return this._gameObject;
  }

  set gameObject(object: T | null) {
    if (object === this._gameObject) return;
    if (object) {
      this.bindGameObject(object);
    } else {
      this.unbindGameObject();
    }
  }

  private bindGameObject(object) {
    this._gameObject = object;
    object.data = this;
  }

  private unbindGameObject() {
    const oldObject = this._gameObject;
    this._gameObject = null;
    oldObject.data = null;
  }
}
