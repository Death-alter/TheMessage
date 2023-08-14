export interface PlayerActionStepOption {
  name?: string;
  handler: (
    next: (value?: any, step?: PlayerActionStep | number | string) => void,
    prev: (value?: any) => void,
    pass?: () => void
  ) => void;
}

export class PlayerActionStep {
  static currentId = 0;

  private _id: number;
  private _name: string = "";
  private _handler: (next: (value?: any) => void, prev: (value?: any) => void, pass?: () => void) => void;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get handler() {
    return this._handler;
  }

  constructor(option: PlayerActionStepOption) {
    this._id = PlayerActionStep.currentId++;
    if (option.name) this._name = option.name;
    this._handler = option.handler;
  }
}
