import { _decorator, Component, Prefab, Node, Label, UITransform, instantiate, sys } from "cc";
import { ProcessEventCenter } from "../../Event/EventTarget";
import { ProcessEvent } from "../../Event/type";
import { PlayerInfoTemplate } from "./PlayerInfoTemplate";
import { CreateRoom } from "../../Event/ProcessEventType";
const { ccclass, property } = _decorator;

export interface PlayerInfo {
  userName: string;
  winCount: number;
  gameCount: number;
  rank: string;
  score: number;
}

@ccclass("Room")
export class PlayerList extends Component {
  @property(Prefab)
  playerInfoPrefab: Prefab | null = null;
  @property(Node)
  playerListNode: Node | null = null;
  @property(Node)
  onlineCountNode: Node | null = null;
  @property(Node)
  noticeNode: Node | null = null;
  @property(Node)
  countDownNode: Node | null = null;

  private playerList: PlayerInfo[] = [];
  private onlineCount: number = 0;
  private inGameCount: number = 0;
  private timer: number = 0;

  protected onEnable(): void {
    //收到房间信息
    ProcessEventCenter.on(ProcessEvent.CREATE_ROOM, (data: CreateRoom) => {
      let isFull = true;
      this.playerList = new Array(data.players.length);
      this.onlineCount = data.onlineCount;
      this.inGameCount = data.inGameCount;
      this.onlineCountNode.getChildByName("Label").getComponent(Label).string =
        "当前在线人数：" + this.onlineCount.toString() + "\n" + "游戏中房间数：" + this.inGameCount.toString();
      this.noticeNode.getComponent(Label).string = data.notice;
      sys.localStorage.setItem("playerCount", data.players.length.toString());
      for (let i = 0; i < data.players.length; i++) {
        if (data.players[i].name) {
          this.playerList[i] = {
            userName: data.players[i].name,
            winCount: data.players[i].winCount,
            gameCount: data.players[i].gameCount,
            rank: data.players[i].rank,
            score: data.players[i].score,
          };
        } else {
          isFull = false;
        }
        const player = instantiate(this.playerInfoPrefab);
        this.playerListNode.addChild(player);
        player.getComponent(PlayerInfoTemplate).init(this.playerList[i]);
      }

      if (isFull) {
        this.setGameStartCountDown();
      }
      this.refreshPlayerListUI();
    });

    //收到添加空位
    ProcessEventCenter.on(ProcessEvent.ADD_ROOM_POSITION, () => {
      this.playerList[this.playerList.length] = undefined;
      const player = instantiate(this.playerInfoPrefab);
      this.playerListNode.addChild(player);
      this.refreshPlayerListUI();
      this.removeGameStartCountDown();
      sys.localStorage.setItem("playerCount", this.playerList.length.toString());
    });

    //收到移除空位
    ProcessEventCenter.on(ProcessEvent.REMOVE_ROOM_POSITION, (data) => {
      this.playerList.splice(data.position, 1);
      this.playerListNode.removeChild(this.playerListNode.children[data.position]);
      this.refreshPlayerListUI();
      this.setGameStartCountDown();
      sys.localStorage.setItem("playerCount", this.playerList.length.toString());
    });

    //有人加入房间
    ProcessEventCenter.on(ProcessEvent.JOIN_ROOM, (data) => {
      this.playerList[data.position] = {
        userName: data.name,
        winCount: data.winCount || 0,
        gameCount: data.gameCount || 0,
        rank: data.rank || "",
        score: data.score || 0,
      };
      this.playerListNode.children[data.position].getComponent(PlayerInfoTemplate).init(this.playerList[data.position]);
      this.setGameStartCountDown();
    });

    //有人离开房间
    ProcessEventCenter.on(ProcessEvent.LEAVE_ROOM, (data) => {
      this.playerList[data.position] = undefined;
      this.playerListNode.children[data.position].getComponent(PlayerInfoTemplate).init();
      this.removeGameStartCountDown();
    });

    //更新在线人数
    ProcessEventCenter.on(ProcessEvent.UPDATE_ONLINE_COUNT, (data) => {
      if (data.onlineCount !== this.onlineCount) {
        this.onlineCount = data.onlineCount;
        this.onlineCountNode.getChildByName("Label").getComponent(Label).string =
          "当前在线人数：" + this.onlineCount.toString() + "\n" + "游戏中房间数：" + this.inGameCount.toString();
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

  private setGameStartCountDown() {
    if (this.timer) return;
    for (const item of this.playerList) {
      if (!item || !item.userName) return;
    }
    const countDownText = this.countDownNode.getComponent(Label);
    let s = 5;
    countDownText.string = `游戏将在${s}秒后开始`;
    this.countDownNode.active = true;
    this.timer = setInterval(() => {
      --s;
      if (s > 0) {
        countDownText.string = `游戏将在${s}秒后开始`;
      } else {
        countDownText.string = `游戏即将开始`;
        clearInterval(this.timer);
        this.timer = 0;
      }
    }, 1000);
  }

  private removeGameStartCountDown() {
    if (!this.timer) return;
    this.countDownNode.active = false;
    clearInterval(this.timer);
    this.timer = 0;
  }
}
