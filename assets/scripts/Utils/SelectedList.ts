export class SelectedList<T> {
  private _list: T[] = [];
  private _limit: number = 0;
  private _locked: boolean = false;

  get list() {
    return this._list;
  }

  get limit() {
    return this._limit;
  }

  set limit(num: number) {
    this._limit = num;
  }

  constructor(limit?: number) {
    if (limit != null) {
      this._limit = limit;
    }
  }

  isSelected(item: T) {
    return this._list.indexOf(item) !== -1;
  }

  select(item: T) {
    if (this._locked) return false;
    if (this._list.length < this._limit) {
      this._list.push(item);
      return true;
    } else {
      return false;
    }
  }

  deselect(item: T): boolean {
    if (this._locked) return false;
    const index = this._list.indexOf(item);
    if (index === -1) {
      return false;
    } else {
      this._list.splice(index, 1);
      return true;
    }
  }

  clear() {
    this._list = [];
  }

  lock() {
    this._locked = true;
  }

  unlock() {
    this._locked = false;
  }
}
