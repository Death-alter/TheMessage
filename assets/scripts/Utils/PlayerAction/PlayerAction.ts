import { PlayerActionStep } from "./PlayerActionStep";

export interface PlayerActionOption {
  name?: string;
}

export interface ConstantPlayerActionOption extends PlayerActionOption {
  steps: PlayerActionStep[];
}

export abstract class PlayerAction {
  protected _name: string = "";
  protected complete: (data: any) => void;
  protected cancel: (data: any) => void;

  get name() {
    return this._name;
  }

  constructor(option: PlayerActionOption) {
    if (option.name) this._name = option.name;
  }

  onComplete(callback: () => void) {
    this.complete = callback;
  }

  onCancel(callback: () => void) {
    this.cancel = callback;
  }
}

export class DynamicPlayerAction extends PlayerAction {
  private stepStack: PlayerActionStep[] = [];

  get currentStep() {
    return this.stepStack[this.stepStack.length - 1];
  }

  constructor(option: PlayerActionOption) {
    super(option);
  }

  next(data: any, step: PlayerActionStep) {
    if (step) {
      this.stepStack.push(step);
      step.handler(this.next.bind(this), this.prev.bind(this));
    } else {
      if (this.complete) this.complete(data);
      this.stepStack = [];
    }
  }

  prev(data: any) {
    if (this.stepStack.length > 1) {
      this.stepStack.pop();
      this.currentStep.handler(this.next.bind(this), this.prev.bind(this));
    } else {
      if (this.cancel) this.cancel(data);
      this.stepStack = [];
    }
  }
}

export class ConstantPlayerAction extends PlayerAction {
  private index: number = 0;
  private steps: PlayerActionStep[];

  get currentStep() {
    return this.steps[this.index];
  }

  constructor(option: ConstantPlayerActionOption) {
    super(option);
    if (option.steps) this.steps = option.steps;
  }

  next(data: any) {
    if (this.index < this.steps.length - 1) {
      ++this.index;
      this.currentStep.handler(this.next.bind(this), this.prev.bind(this), () => {
        this.next(data);
      });
    } else {
      if (this.complete) this.complete(data);
      this.index = 0;
    }
  }

  prev(data: any) {
    if (this.index > 0) {
      --this.index;
      this.currentStep.handler(this.next.bind(this), this.prev.bind(this), () => {
        this.prev(data);
      });
    } else {
      if (this.cancel) this.cancel(data);
      this.index = 0;
    }
  }
}
