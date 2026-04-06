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
        switch (data.extension) {
          case 1:
            this.title.string = "基础";
            break;
          case 2:
            this.title.string = "基础+一扩";
            break;
          case 3:
            this.title.string = "基础+一扩+二扩";
            break;
        }
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
