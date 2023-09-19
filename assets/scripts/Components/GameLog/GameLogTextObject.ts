import { _decorator, Label, NodeEventType, UITransform } from "cc";
import { GameObject } from "../../GameObject";
import { GameLog } from "./GameLog";
const { ccclass } = _decorator;

@ccclass("GameLogTextObject")
export class GameLogTextObject extends GameObject<GameLog> {
  onEnable(): void {
    this.scheduleOnce(() => {
      const label = this.node.getChildByName("Label");
      this.node.getComponent(UITransform).height = label.getComponent(UITransform).height + 20;
    });
  }

  setText(str) {
    const label = this.node.getChildByName("Label");
    label.getComponent(Label).string = str;
  }
}
