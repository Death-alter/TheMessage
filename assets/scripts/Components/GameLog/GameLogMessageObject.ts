import { _decorator, UIOpacity, Node, UITransform, RichText } from "cc";
import { GameObject } from "../../GameObject";
import { GameLog } from "./GameLog";
import { KeyframeAnimationManager } from "../../Scenes/Game/AnimationLayer/KeyframeAnimation";
const { ccclass } = _decorator;

@ccclass("GameLogMessageObject")
export class GameLogMessageObject extends GameObject<GameLog> {
  private _opacityTarget: UIOpacity | null = null;
  private label: Node = null;
  private background: Node = null;

  onEnable() {}

  onLoad() {
    this.background = this.node.getChildByName("Background");
    this.label = this.node.getChildByName("RichText");
    this._opacityTarget = this.getComponent(UIOpacity);
  }

  setText(str: string) {
    this.label.getComponent(RichText).string = str;
    this.background.getComponent(UITransform).width = this.label.getComponent(UITransform).width + 20;
  }

  show(seconds = 2) {
    return new Promise((resolve, reject) => {
      KeyframeAnimationManager.playAnimation(
        {
          target: this._opacityTarget,
          animation: [
            {
              attribute: "opacity",
              from: 0,
              to: 255,
              duration: 0.5,
            },
            {
              attribute: "opacity",
              to: 0,
              startTime: seconds + 0.5,
              duration: 0.5,
            },
          ],
          callbacks: {
            complete: () => {
              resolve(null);
            },
          },
        },
        "clear",
      );
    });
  }
}
