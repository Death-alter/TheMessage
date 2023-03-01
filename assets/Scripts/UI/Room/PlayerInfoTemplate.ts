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
      this.userName.string = data.userName;
      this.winCounts.string = data.winCounts !== null ? "胜场：" + data?.winCounts.toString() : "";
    }
  }
}
