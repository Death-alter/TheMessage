import { _decorator, UIOpacity, Tween, tween, Label, Node, UITransform, RichText } from "cc";
import { GameObject } from "../../GameObject";
import { GameLog } from "./GameLog";
const { ccclass } = _decorator;

@ccclass("GameLogMessageObject")
export class GameLogMessageObject extends GameObject<GameLog> {
  private _opacityTarget: UIOpacity | null = null;
  private _action: Tween<any> = null;
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
      if (this._action !== null) this._action.stop();
      this._opacityTarget.opacity = 0;
      this._action = tween(this._opacityTarget)
        .to(0.5, { opacity: 255 }, { easing: "fade" })
        .delay(seconds)
        .to(0.5, { opacity: 0 }, { easing: "fade" })
        .call(() => {
          resolve(null);
        })
        .start();
    });
  }
}
