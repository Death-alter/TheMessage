import { PlayerActionStepManager } from "./PlayerActionManager";
import { PlayerActionStep } from "./PlayerActionStep";

export type PlayerActionStepType = string | number | PlayerActionStep;

export interface PlayerActionStepRoute {
  step: PlayerActionStepType;
  next?: PlayerActionStepRoute[] | ((data?: any) => void);
}

export interface PlayerActionOption {
  name?: string;
  auto?: boolean;
  stepRoute: PlayerActionStepRoute;
}

export interface PlayerActionStepNode {
  step: PlayerActionStep;
  next: number[] | ((data?: any) => void);
  prev: number;
}

export class PlayerAction {
  static currentId = 0;

  private _id: number;
  private _name: string = "";
  private index: number = 0;
  private stepList: PlayerActionStepNode[] = [];
  private direction: number = 0; //0代表正向，1代表反向

  private complete: (data?: any) => void;
  private cancel: (data?: any) => void;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get currentStep() {
    return this.stepList[this.index];
  }

  constructor(option: PlayerActionOption) {
    this._id = PlayerAction.currentId++;
    if (option.name) this._name = option.name;
    this.resolveRoute(option.stepRoute);
  }

  private resolveRoute(route: PlayerActionStepRoute, prev?: number) {
    const node: PlayerActionStepNode = {
      step: route.step instanceof PlayerActionStep ? route.step : PlayerActionStepManager.getStep(route.step),
      next: [],
      prev: prev != null ? prev : -1,
    };
    this.stepList.push(node);
    const index = this.stepList.length - 1;

    if (route.next instanceof Array) {
      for (let i in route.next) {
        (<number[]>node.next).push(this.resolveRoute(route.next[i], index));
      }
    } else {
      if (route.next) {
        node.next = route.next;
      } else {
        delete node.next;
      }
    }

    return index;
  }

  private handleStep(data?: any) {
    this.currentStep.step.handler(data, {
      next: this.next.bind(this),
      prev: this.prev.bind(this),
      repeat: this.handleStep.bind(this),
      pass: this.pass.bind(this),
    });
  }

  start(data?: any) {
    this.index = 0;
    this.handleStep(data);
  }

  next(index?: number, data?: any) {
    this.direction = 0;
    if (index == null) index = 0;
    if (this.currentStep.next instanceof Array) {
      this.index = this.currentStep.next[index];
      this.handleStep(data);
    } else {
      if (this.currentStep.next) {
        this.currentStep.next(data);
        this.index = 0;
      }
      if (this.complete) {
        this.complete(data);
        this.complete = null;
      }
    }
  }

  prev(data?: any) {
    this.direction = 1;
    if (this.currentStep.prev === -1) {
      if (this.cancel) {
        this.cancel(data);
        this.cancel = null;
      }
    } else {
      this.index = this.currentStep.prev;
      this.handleStep(data);
    }
  }

  pass(data?: any) {
    if (this.direction === 0) {
      this.next(data);
    } else {
      this.prev(data);
    }
  }

  onComplete(callback: () => void) {
    this.complete = callback;
  }

  onCancel(callback: () => void) {
    this.cancel = callback;
  }
}
