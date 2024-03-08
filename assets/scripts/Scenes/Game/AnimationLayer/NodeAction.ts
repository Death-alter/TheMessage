import { Node } from "cc";

export interface ActionAttribute {
  attribute: string;
  from?: number;
  to: number;
  easing?: (t: number) => number;
}

export class NodeAction {}

export class NodeAnimation {
  private actionQueue: NodeAction[];

  constructor(actionQueue) {}

  addAction() {}
}
