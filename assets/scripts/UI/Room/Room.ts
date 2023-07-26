import { _decorator, Component, Prefab, Node, Label, UITransform, instantiate } from "cc";
import { ProcessEventCenter } from "../../Event/EventTarget";
import { ProcessEvent } from "../../Event/type";
import { PlayerInfoTemplate } from "./PlayerInfoTemplate";
import { CreateRoom } from "../../Event/ProcessEventType";
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
  @property(Prefab)
  playerInfoPrefab: Prefab | null = null;
  @property(Node)
  playerListNode: Node | null = null;
  @property(Node)
  onlineCountNode: Node | null = null;

  private playerList: PlayerInfo[] = [];
  private onlineCount: number = 0;

  protected onEnable(): void {
    //收到房间信息
    ProcessEventCenter.on(ProcessEvent.CREATE_ROOM, (data: CreateRoom) => {
      this.playerList = new Array(data.players.length);
      this.onlineCount = data.onlineCount;
      this.onlineCountNode.getChildByName("Label").getComponent(Label).string =
        "当前在线人数：" + this.onlineCount.toString();
      for (let i = 0; i < data.players.length; i++) {
        if (data.players[i].name) {
          this.playerList[i] = {
            userName: data.players[i].name,
            winCounts: data.players[i].winCount,
          };
        }
        const player = instantiate(this.playerInfoPrefab);
        this.playerListNode.addChild(player);
        player.getComponent(PlayerInfoTemplate).init(this.playerList[i]);
      }
      this.refreshPlayerListUI();
    });

    //收到添加空位
    ProcessEventCenter.on(ProcessEvent.ADD_ROOM_POSITION, () => {
      this.playerList[this.playerList.length] = undefined;
      const player = instantiate(this.playerInfoPrefab);
      this.playerListNode.addChild(player);
      this.refreshPlayerListUI();
    });

    //收到移除空位
    ProcessEventCenter.on(ProcessEvent.REMOVE_ROOM_POSITION, (data) => {
      this.playerList.splice(data.position, 1);
      this.playerListNode.removeChild(this.playerListNode.children[data.position]);
      this.refreshPlayerListUI();
    });

    //有人加入房间
    ProcessEventCenter.on(ProcessEvent.JOIN_ROOM, (data) => {
      this.playerList[data.position] = { userName: data.name, winCounts: data.winCount || 0 };
      this.playerListNode.children[data.position].getComponent(PlayerInfoTemplate).init(this.playerList[data.position]);
    });

    //有人离开房间
    ProcessEventCenter.on(ProcessEvent.LEAVE_ROOM, (data) => {
      this.playerList[data.position] = undefined;
      this.playerListNode.children[data.position].getComponent(PlayerInfoTemplate).init();
    });

    //更新在线人数
    ProcessEventCenter.on(ProcessEvent.UPDATE_ONLINE_COUNT, (data) => {
      if (data.onlineCount !== this.onlineCount) {
        this.onlineCount = data.onlineCount;
        this.onlineCountNode.getChildByName("Label").getComponent(Label).string =
          "当前在线人数：" + this.onlineCount.toString();
      }
    });
  }

  protected onDisable(): void {
    //移除事件监听
    ProcessEventCenter.off(ProcessEvent.CREATE_ROOM);
    ProcessEventCenter.off(ProcessEvent.ADD_ROOM_POSITION);
    ProcessEventCenter.off(ProcessEvent.REMOVE_ROOM_POSITION);
    ProcessEventCenter.off(ProcessEvent.JOIN_ROOM);
    ProcessEventCenter.off(ProcessEvent.LEAVE_ROOM);
    ProcessEventCenter.off(ProcessEvent.UPDATE_ONLINE_COUNT);
  }

  private refreshPlayerListUI() {
    this.playerListNode.getComponent(UITransform).height = 70 * this.playerList.length;
  }
}
