import { _decorator, Component, Label } from "cc";
import { PlayerInfo } from "./Room";
const { ccclass, property } = _decorator;

@ccclass("PlayerInfoTemplate")
export class PlayerInfoTemplate extends Component {
  @property(Label)
  public userName: Label | null = null;
  @property(Label)
  public winCounts: Label | null = null;

  init(data?: PlayerInfo) {
    if (data) {
      data.userName && (this.userName.string = data.userName);
      data.winCounts !== null && (this.winCounts.string = "胜场：" + data?.winCounts.toString());
    } else {
      this.userName.string = "";
      this.winCounts.string = "";
    }
  }
}
