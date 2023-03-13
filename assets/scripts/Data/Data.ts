import { DataClass } from "./type";

export class Data extends DataClass {
  protected _UI: any;

  get UI() {
    return this._UI;
  }

  constructor(UI: any) {
    super(UI);
  }

  bindUI(UI: any) {
    this._UI = UI;
  }
}
