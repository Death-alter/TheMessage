import { _decorator, Component, Prefab, Node, Label, UITransform, instantiate } from "cc";
import EventTarget from "../../Event/EventTarget";
import { PlayerInfoTemplate } from "./PlayerInfoTemplate";
const { ccclass, property } = _decorator;

@ccclass("PlayerInfo")
export class PlayerInfo {
  @property
  userName: string = "";
  @property
  winCounts: number = 0;
}

@ccclass("Room")
export class PlayerList extends Component {
  private playerList: PlayerInfo[] = [];
  private onlineCount: number = 0;
  @property(Prefab)
  playerInfoPrefab: Prefab | null = null;
  @property(Node)
  playerListNode: Node | null = null;
  @property(Node)
  onlineCountNode: Node | null = null;

  protected onEnable(): void {
    //收到房间信息
    EventTarget.on("get_room_info_toc", (data) => {
      this.playerList = new Array(data.names.length);
      this.onlineCount = data.onlineCount;
      this.onlineCountNode.getChildByName("Label").getComponent(Label).string =
        "当前在线人数：" + this.onlineCount.toString();
      for (let i = 0; i < data.names.length; i++) {
        if (data.names[i]) {
          this.playerList[i] = {
            userName: data.names[i],
            winCounts: data.winCounts[0],
          };
        }
        const player = instantiate(this.playerInfoPrefab);
        this.playerListNode.addChild(player);
        player.getComponent(PlayerInfoTemplate).init(this.playerList[i]);
      }
      this.refreshPlayerListUI();
    });

    //收到添加空位
    EventTarget.on("add_one_position_toc", () => {
      this.playerList[this.playerList.length] = undefined;
      const player = instantiate(this.playerInfoPrefab);
      this.playerListNode.addChild(player);
      this.refreshPlayerListUI();
    });

    //收到移除空位
    EventTarget.on("remove_one_position_toc", (data) => {
      this.playerList.splice(data.position, 1);
      this.playerListNode.removeChild(this.playerListNode.children[data.position]);
      this.refreshPlayerListUI();
    });
  }

  protected onDisable(): void {
    //移除事件监听
    EventTarget.off("get_room_info_toc");
    EventTarget.off("add_one_position_toc");
    EventTarget.off("remove_one_position_toc");
  }

  private refreshPlayerListUI() {
    this.playerListNode.getComponent(UITransform).height = 60 * this.playerList.length;
  }
}
