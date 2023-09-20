import { _decorator, Node, Prefab, instantiate, ScrollView, UITransform } from "cc";
import { GameObjectContainer } from "../../../Components/Container/GameObjectContainer";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { GameLogMessageObject } from "../../../Components/GameLog/GameLogMessageObject";
import { GameLogTextObject } from "../../../Components/GameLog/GameLogTextObject";
const { ccclass, property } = _decorator;

@ccclass("GameLogWindow")
export class GameLogWindow extends GameObjectContainer<GameLogTextObject> {
  @property(Prefab)
  logPrefab: Prefab | null = null;

  public viewContent: Node;

  onLoad() {
    this.node.getChildByName("CloseButton").on(Node.EventType.TOUCH_END, () => {
      this.node.active = false;
    });
  }

  onEnable() {
    const view = this.node.getChildByPath("ScrollView/view");
    const content = view.getChildByName("content");
    if (content.getComponent(UITransform).height > view.getComponent(UITransform).height) {
      this.scheduleOnce(() => {
        this.getComponentInChildren(ScrollView).scrollToBottom(0);
      });
    }
  }

  init() {
    this.viewContent = this.node.getChildByPath("ScrollView/view/content");
  }

  onDataAdded(data: GameLog): void {
    const object = instantiate(this.logPrefab);
    data.gameObject = <GameLogTextObject & GameLogMessageObject>object.getComponent(GameLogTextObject);
    data.gameObject.setText(data.text);
    this.viewContent.addChild(object);
  }
  onDataRemoved(data: GameLog): void {}
  onAllDataRemoved(): void {}
}
