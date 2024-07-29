import { _decorator, Component, Label } from "cc";
import { PlayerInfo } from "./Room";
const { ccclass, property } = _decorator;

@ccclass("PlayerInfoTemplate")
export class PlayerInfoTemplate extends Component {
  @property(Label)
  public userName: Label | null = null;
  @property(Label)
  public winCount: Label | null = null;
  @property(Label)
  public title: Label | null = null;

  init(data?: PlayerInfo) {
    if (data) {
      data.userName && (this.userName.string = data.userName);
      if (data.rank) {
        this.winCount.string = `段位：${data.rank}（${data.score}）`;
        this.title.string = `历史勋章：${data.title || "无"}`;
      } else {
        this.winCount.string = `机器人`;
      }
    } else {
      this.userName.string = "";
      this.winCount.string = "";
      this.title.string = "";
    }
  }
}
