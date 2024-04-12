import { _decorator, RichText, UITransform } from "cc";
import { Entity } from "../../Entity";
import { GameLog } from "./GameLog";
const { ccclass } = _decorator;

@ccclass("GameLogTextEntity")
export class GameLogTextEntity extends Entity<GameLog> {
  onEnable() {
    this.scheduleOnce(() => {
      const text = this.node.getChildByName("RichText");
      this.node.getComponent(UITransform).height = text.getComponent(UITransform).height + 20;
    });
  }

  setText(str) {
    const text = this.node.getChildByName("RichText");
    text.getComponent(RichText).string = `<color=#000000>${str}</color>`;
  }
}
