import { _decorator, Component, Label } from "cc";
import { PlayerInfo } from "./PlayerList";
const { ccclass, property } = _decorator;

@ccclass("PlayerInfoTemplate")
export class PlayerInfoTemplate extends Component {
  @property(Label)
  public userName: Label | null = null;
  @property(Label)
  public winCounts: Label | null = null;

  init(data: PlayerInfo) {
    this.userName.string = data?.userName;
    this.winCounts.string = data?.winCounts.toString();
  }
}
