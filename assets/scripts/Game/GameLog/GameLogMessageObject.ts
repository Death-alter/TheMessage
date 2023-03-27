import { _decorator, UIOpacity, Tween, tween, Label } from "cc";
import { GameObject } from "../../GameObject";
import { GameLog } from "./GameLog";
const { ccclass } = _decorator;

@ccclass("GameLogMessageObject")
export class GameLogMessageObject extends GameObject<GameLog> {
  private _opacityTarget: UIOpacity | null = null;
  private _action: Tween<any> = null;
  private label: Label = null;

  init() {
    this.label = this.node.getChildByName("Label").getComponent(Label);
    this._opacityTarget = this.getComponent(UIOpacity);
    tween(this._opacityTarget).hide().start();
  }

  setText(str: string) {
    this.label.string = str;
  }

  show(seconds = 2) {
    return new Promise((resolve, reject) => {
      if (this._action !== null) this._action.stop();
      this._opacityTarget.opacity = 0;
      this._action = tween(this._opacityTarget)
        .show()
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
