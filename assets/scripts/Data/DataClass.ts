export abstract class DataClass {
  protected abstract _UI: any;

  get UI() {
    return this._UI;
  }

  constructor(UI?: any) {
    if (UI) {
      this.bindUI(UI);
    }
  }

  abstract bindUI(UI: any): void;
}
