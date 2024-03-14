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

  constructor(action: AttributeAction) {
    this.actions.push(action);
  }
}

export class NodeAnimation {
  private actionQueue: NodeAction[];

  addAction() {}
}

export abstract class NodeAnimationManager {
  static animationList: NodeAnimation[];
  static nodeList: Node[]; 
}
