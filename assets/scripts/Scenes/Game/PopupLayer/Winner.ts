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
  find,
  sys,
} from "cc";
import { GameOver } from "../../../Event/GameEventType";
import { NetworkManager } from "../../../Network/NetworkManager";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import config from "../../../config";
import md5 from "ts-md5";
import { MysteriousPerson } from "../../../Components/Identity/IdentityClass/MysteriousPerson";
import { DataManager } from "../../../Manager/DataManager";
const { ccclass, property } = _decorator;

@ccclass("Winner")
export class Winner extends Component {
  @property(Prefab)
  resultItemPrefab: Prefab | null = null;
  @property(Node)
  buttons: Node | null = null;

  onLoad() {
    this.buttons.getChildByName("Play").on(NodeEventType.TOUCH_END, () => {
      const name = sys.localStorage.getItem("userName");
      NetworkEventCenter.emit(NetworkEventToS.JOIN_ROOM_TOS, {
        version: config.version,
        name,
        password: md5.Md5.hashStr(sys.localStorage.getItem("password")),
        device: md5.Md5.hashStr(name),
      });
    });
    this.buttons.getChildByName("Exit").on(NodeEventType.TOUCH_END, () => {
      director.loadScene("login", () => {
        find("Resident").getComponent(NetworkManager).reconnect();
      });
    });
  }

  init(players: GameOver["players"], isRecord: boolean) {
    const list = this.node.getChildByName("List");
    for (let data of players) {
      const item = instantiate(this.resultItemPrefab);
      item.getChildByName("Player").getComponent(Label).string = `${data.player.seatNumber + 1}号玩家(${
        data.player.character.name
      })`;
      const identityLabel = item.getChildByPath("Identity/Label").getComponent(Label);
      identityLabel.string = data.identity.name;
      identityLabel.color = color(data.identity.color);
      item.getChildByName("SecretTask").getComponent(RichText).string =
        data.identity instanceof MysteriousPerson ? `<color=black>${data.identity.secretTaskText}</color=black>` : "";

      if (data.isWinner) {
        item.getComponent(Sprite).color = color("#6DFF70");
        item.getChildByName("Flag").getComponent(Label).string = "赢";
      } else {
        item.getComponent(Sprite).color = color("#FF8181");
        item.getChildByName("Flag").getComponent(Label).string = "输";
      }
      if (data.isDeclarer) {
      }
      list.addChild(item);
    }

    if (isRecord) {
      this.buttons.getChildByName("Play").active = false;
      this.buttons.getChildByName("Exit").getComponentInChildren(Label).string = "结束播放";
    } else {
      this.buttons.getChildByName("Play").active = true;
      this.buttons.getChildByName("Exit").getComponentInChildren(Label).string = "退出登录";
    }
  }
}
