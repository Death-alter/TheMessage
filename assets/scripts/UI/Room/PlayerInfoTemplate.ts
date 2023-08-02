import { _decorator, Component, Label } from "cc";
import { PlayerInfo } from "./Room";
const { ccclass, property } = _decorator;

@ccclass("PlayerInfoTemplate")
export class PlayerInfoTemplate extends Component {
  @property(Label)
  public userName: Label | null = null;
  @property(Label)
  public winCount: Label | null = null;

  init(data?: PlayerInfo) {
    if (data) {
      data.userName && (this.userName.string = data.userName);
      let str;
      if (data.winCount === 0) {
        str = `总场数：${data.gameCount}    胜率：0%`;
      } else {
        str = `总场数：${data.gameCount}    胜率：${((data.winCount / data.gameCount) * 100).toFixed(2)}%`;
      }
      this.winCount.string = str;
    } else {
      this.userName.string = "";
      this.winCount.string = "";
    }
  }
}
