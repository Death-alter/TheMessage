export type PlayerActionStepHandler = (
  data: any,
  fs: {
    next: (data?: PlayerActionStepData) => void;
    prev: () => void;
  }
) => void;

export interface PlayerActionStepData {
  stepName?: string;
  step?: PlayerActionStep;
  params?: { [index: string]: any };
  [index: string]: any;
}

export interface PlayerActionStepOption {
  name?: string;
  handler: PlayerActionStepHandler;
}

export class PlayerActionStep {
  static currentId = 0;

  private _id: number;
  private _name: string = "";
  private _handler: PlayerActionStepHandler;

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
