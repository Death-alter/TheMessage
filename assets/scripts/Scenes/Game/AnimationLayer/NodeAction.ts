import { Node } from "cc";

export interface AttributeAction {
  attribute: string;
  from?: number;
  to: number;
  startTime?: number;
  duration: number;
  easing?: (t: number) => number;
}

export class NodeAction {
  actions: AttributeAction[] = [];
  totalDuration: number;

  constructor(action?: AttributeAction) {
    if (action) this.actions.push(action);
  }

  addAttribute() {}
}

export class NodeAnimation {
  private actionQueue: NodeAction[];

  start() {}
}

export abstract class NodeAnimationManager {
  static animationList: NodeAnimation[];
  static nodeList: Node[];
}
