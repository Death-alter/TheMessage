import { _decorator, tween, Node, Vec3, Tween } from "cc";
import { UIContainer } from "./UIContainer";
import { CardUI } from "../Card/CardUI";
import { GameCard } from "../../../Data/Cards/type";
const { ccclass, property } = _decorator;

@ccclass("CardGroupNode")
export class CardGroupNode extends UIContainer<GameCard, CardUI> {
  private _t: Tween<any> | null = null;

  get onAnimation() {
    return this._t !== null;
  }

  init() {
    this.node.active = false;
  }

  onDataAdded(data: GameCard): void {}

  onDataRemoved(data: GameCard): void {}

  onAllDataRemoved(): void {}

  move(from: Vec3, to: Vec3, callback?) {
    if (this.onAnimation) this._t.stop();
    this.node.active = true;
    this.node.setWorldPosition(from);
    this._t = tween(this.node)
      .to(0.6, { worldPosition: to })
      .call(() => {
        this._t = null;
        this.node.active = false;
        if (callback) callback();
      })
      .start();
  }
}
