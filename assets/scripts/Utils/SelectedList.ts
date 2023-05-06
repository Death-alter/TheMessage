export class SelectedList<T> {
  private _list: Set<T> = new Set();
  private _limit: number = 0;

  get list() {
    return this._list;
  }

  get size() {
    return this._list.size;
  }

  get limit() {
    return this._limit;
  }

  set limit(num: number) {
    this._limit = num;
    if (this._list.size > num) {
      this.clear();
    }
  }

  constructor(limit?: number) {
    if (limit != null) {
      this._limit = limit;
    }
  }

  isSelected(item: T) {
    return this._list.has(item);
  }

  select(item: T): boolean {
    if (this._list.size < this._limit) {
      this._list.add(item);
      return true;
    } else {
      return false;
    }
  }

  deselect(item: T): boolean {
    return this._list.delete(item);
  }

  clear() {
    this._list.clear();
  }
}
