export type PlayerActionStepHandler = (
  data: PlayerActionStepData,
  fs: {
    next: (data?: { [index: string]: any }) => void;
    prev: () => void;
    passOnNext: (f: () => void) => void;
    passOnPrev: (f: () => void) => void;
  }
) => void;

export type PlayerActionStepDataResolver = (data: { [index: string]: any }) => { [index: string]: any };

export interface PlayerActionStepData {
  initial?: { [index: string]: any };
  current?: { [index: string]: any };
}

export interface PlayerActionStepOption {
  name?: string;
  handler: PlayerActionStepHandler;
  resolver?: PlayerActionStepDataResolver;
}

export class PlayerActionStep {
  static currentId = 0;

  private _id: number;
  private _name: string = "";
  private _handler: PlayerActionStepHandler;
  private _resolver: PlayerActionStepDataResolver;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get handler() {
    return this._handler;
  }

  get resolver() {
    return this._resolver;
  }

  constructor(option: PlayerActionStepOption) {
    this._id = PlayerActionStep.currentId++;
    if (option.name) this._name = option.name;
    this._handler = option.handler;
    if (option.resolver) this._resolver = option.resolver;
  }
}
