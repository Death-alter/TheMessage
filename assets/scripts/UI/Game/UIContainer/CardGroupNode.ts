import { _decorator, tween, Node, Vec3 } from "cc";
import { UIContainer } from "./UIContainer";
import { CardUI } from "../Card/CardUI";
import { GameCard } from "../../../Data/Cards/type";
const { ccclass, property } = _decorator;

@ccclass("CardGroupNode")
export class CardGroupNode extends UIContainer<GameCard, CardUI> {
  private _onAnimation: boolean = false;

  get onAnimation() {
    return this._onAnimation;
  }

  init() {
    this.node.active = false;
  }

  onDataAdded(data: GameCard): void {}

  onDataRemoved(data: GameCard): void {}

  onAllDataRemoved(): void {}

  move(from: Vec3, to: Vec3) {
    return new Promise((reslove, reject) => {
      {
        this._onAnimation = true;
        this.node.active = true;
        this.node.setWorldPosition(from);
        tween(this.node)
          .to(
            0.6,
            { worldPosition: to },
            {
              onComplete: () => {
                this.node.active = false;
                this._onAnimation = false;
                reslove(null);
              },
            }
          )
          .start();
      }
    });
  }
}
