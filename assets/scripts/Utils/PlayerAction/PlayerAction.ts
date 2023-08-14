import { PlayerActionStepManager } from "./PlayerActionManager";
import { PlayerActionStep } from "./PlayerActionStep";

export type PlayerActionStepType = string | number | PlayerActionStep;

export interface PlayerActionStepRoute {
  step: PlayerActionStepType;
  next: PlayerActionStepRoute[] | (() => void);
}

export interface PlayerActionOption {
  name?: string;
  stepRoute: PlayerActionStepRoute;
}

export interface PlayerActionStepNode {
  step: PlayerActionStep;
  next: number[] | (() => void);
  prev: number;
}

export abstract class PlayerAction {
  private _name: string = "";
  private index: number = 0;
  private stepList: PlayerActionStepNode[] = [];

  get name() {
    return this._name;
  }

  constructor(option: PlayerActionOption) {
    if (option.name) this._name = option.name;
  }

  resolveRoute(route: PlayerActionStepRoute) {
    const node: PlayerActionStepNode = {
      step: route.step instanceof PlayerActionStep ? route.step : PlayerActionStepManager.getStep(route.step),
      next: [],
      prev: -1,
    };
    this.stepList.push(node);
    const index = this.stepList.length - 1;

    if (route.next instanceof Array) {
      for (let i in route.next) {
        (<number[]>node.next).push(this.resolveRoute(route.next[i]));
      }
    }

    return index;
  }

  createStepNode(step) {
    return;
  }
}
