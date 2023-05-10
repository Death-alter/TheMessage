export class SelectedList<T> {
  private _list: T[] = [];
  private _limit: number = 0;

  get list() {
    return this._list;
  }

  get limit() {
    return this._limit;
  }

  set limit(num: number) {
    this._limit = num;
    if (this._list.length > num) {
      this.clear();
    }
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
    if (this._list.length < this._limit) {
      this._list.push(item);
      return true;
    } else {
      return false;
    }
  }

  deselect(item: T): boolean {
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
}
