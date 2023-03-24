import { _decorator, UIOpacity, Tween, tween } from "cc";
import { GameObject } from "../../GameObject";
import { GameLog } from "./GameLog";
const { ccclass } = _decorator;

@ccclass("GameLogMessageObject")
export class GameLogMessageObject extends GameObject<GameLog> {
  private _opacityTarget: UIOpacity | null = null;
  private _action: Tween<any> = null;

  init() {
    this._opacityTarget = this.getComponent(UIOpacity);
    tween(this._opacityTarget).hide().start();
  }

  show(seconds = 2) {
    if (this._action !== null) this._action.stop();
    this._opacityTarget.opacity = 0;
    this._action = tween(this._opacityTarget)
      .show()
      .to(0.5, { opacity: 255 }, { easing: "fade" })
      .delay(seconds)
      .to(0.5, { opacity: 0 }, { easing: "fade" })
      .start();
  }
}
