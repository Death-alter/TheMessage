export abstract class DataClass {
  protected abstract _UI: any;

  constructor(script?: any) {
    if (script) {
      this.bindUI(script);
    }
  }

  abstract bindUI(script: any): void;
}
