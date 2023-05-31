import {
  _decorator,
  Component,
  director,
  instantiate,
  Label,
  Node,
  NodeEventType,
  Prefab,
  RichText,
  Sprite,
  color,
} from "cc";
import { GameOver } from "../../../Event/GameEventType";
import { MysteriousPerson } from "../../../Game/Identity/IdentityClass/MysteriousPerson";
const { ccclass, property } = _decorator;

@ccclass("Winner")
export class Winner extends Component {
  @property(Prefab)
  resultItemPrefab: Prefab | null = null;
  @property(Node)
  buttons: Node | null = null;

  onLoad() {
    this.buttons.getChildByName("Play").on(NodeEventType.TOUCH_END, () => {});
    this.buttons.getChildByName("Exit").on(NodeEventType.TOUCH_END, () => {
      director.loadScene("login");
    });
  }

  init(players: GameOver["players"]) {
    const list = this.node.getChildByName("List");
    for (let data of players) {
      const item = instantiate(this.resultItemPrefab);
      item.getChildByName("Player").getComponent(Label).string = `${data.player.seatNumber + 1}号玩家(${
        data.player.name
      })`;
      const identityLabel = item.getChildByPath("Identity/Label").getComponent(Label);
      identityLabel.string = data.identity.name;
      identityLabel.color = color(data.identity.color)
      item.getChildByName("SecretTask").getComponent(RichText).string =
        data.identity instanceof MysteriousPerson ? `<color=black>${data.identity.secretTaskText}</color=black>` : "";

      if (data.isWinner) {
        item.getComponent(Sprite).color = color("#6DFF70")
        item.getChildByName("Flag").getComponent(Label).string = "赢";
      } else {
        item.getComponent(Sprite).color = color("#FF8181")
        item.getChildByName("Flag").getComponent(Label).string = "输";
      }
      if (data.isDeclarer) {
      }
      list.addChild(item);
    }
  }
}
