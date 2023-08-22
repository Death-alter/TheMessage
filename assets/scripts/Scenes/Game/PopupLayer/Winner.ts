import { _decorator, Component, director, instantiate, Label, Node, NodeEventType, Prefab, find, sys } from "cc";
import { NetworkManager } from "../../../Network/NetworkManager";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import config from "../../../config";
import md5 from "ts-md5";
import { WinnerPlayer, WinnerTemplate } from "./WinnerPlayerTemplate";
import { Lurker } from "../../../Components/Identity/IdentityClass/Lurker";
import { Agent } from "../../../Components/Identity/IdentityClass/Agent";
const { ccclass, property } = _decorator;

@ccclass("Winner")
export class Winner extends Component {
  @property(Prefab)
  winnerPlayerIndoPrefab: Prefab | null = null;
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

  init(winners: WinnerTemplate[], isRecord: boolean) {
    const list = this.node.getChildByPath("List/Players");
    const list2 = this.node.getChildByPath("List2/Players");
    const list3 = this.node.getChildByPath("List3/Players");

    const luckerList = [];
    const agentList = [];
    const mysteriousPersonList = [];

    for (let winner of winners) {
      if (winner.identity instanceof Lurker) {
        luckerList.push(winner);
      } else if (winner.identity instanceof Agent) {
        agentList.push(winner);
      } else {
        mysteriousPersonList.push(winner);
      }
    }

    for (let item of luckerList.sort((a, b) => a.player.seatNumber - b.player.seatNumber)) {
      const node = instantiate(this.winnerPlayerIndoPrefab);
      node.getComponent(WinnerPlayer).init(item);
      list.addChild(node);
    }

    for (let item of agentList.sort((a, b) => a.player.seatNumber - b.player.seatNumber)) {
      const node = instantiate(this.winnerPlayerIndoPrefab);
      node.getComponent(WinnerPlayer).init(item);
      list2.addChild(node);
    }

    for (let item of mysteriousPersonList.sort((a, b) => a.player.seatNumber - b.player.seatNumber)) {
      const node = instantiate(this.winnerPlayerIndoPrefab);
      node.getComponent(WinnerPlayer).init(item);
      list3.addChild(node);
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
