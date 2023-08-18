export type PlayerActionStepHandler = (
  data: any,
  fs: {
    next: (index?: number, data?: any) => void;
    prev: (data?: any) => void;
    repeat: (data?: any) => void;
    pass: (data?: any) => void;
    switch: (index?: number, data?: any) => void;
  }
) => void;

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
