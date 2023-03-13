export abstract class DataClass {
  protected abstract _UI: any;

  get UI() {
    return this._UI;
  }

  abstract bindUI(UI: any): void;
}
