import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;
import { KeyframeAnimationManager } from "./KeyFrameAnimation";

@ccclass("KeyFrameAnimationLayer")
export class KeyFrameAnimationLayer extends Component {
  protected update(dt: number): void {}
}
