import { _decorator, Label, NodeEventType, RichText, UITransform } from "cc";
import { GameObject } from "../../GameObject";
import { GameLog } from "./GameLog";
const { ccclass } = _decorator;

@ccclass("GameLogTextObject")
export class GameLogTextObject extends GameObject<GameLog> {
  onEnable(): void {
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
