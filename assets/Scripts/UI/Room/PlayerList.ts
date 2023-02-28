import { _decorator, Component, Prefab, UITransform, instantiate } from "cc";
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

@ccclass("PlayerList")
export class PlayerList extends Component {
  private playerList: PlayerInfo[] = [];
  private onlineCount: number = 0;
  @property(Prefab)
  playerInfoPrefab: Prefab | null = null;

  protected onEnable(): void {
    EventTarget.on("get_room_info_toc", (data) => {
      this.playerList = [];
      this.onlineCount = data.onlineCount;
      this.node.getComponent(UITransform).height = 60 * data.names.length;
      for (let i = 0; i < data.names.length; i++) {
        if (data.names[i]) {
          this.playerList[i] = {
            userName: data.names[i],
            winCounts: data.winCounts[0],
          };
        }
        const player = instantiate(this.playerInfoPrefab);
        this.node.addChild(player);
        player.setPosition(0, 0);
        player.getComponent(PlayerInfoTemplate).init(this.playerList[i]);
      }
    });
  }

  protected onDisable(): void {
    EventTarget.off("get_room_info_toc");
  }

  update(deltaTime: number) {}
}
