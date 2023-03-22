import { _decorator, Label, Node } from "cc";
import { CharacterObject } from "../Character/CharacterObject";
import { Player } from "./Player";
import { ProgressControl } from "../../UI/Game/ProgressControl";
import { GameObject } from "../GameObject";
import { PlayerStatus } from "./type";

const { ccclass, property } = _decorator;

@ccclass("PlayerObject")
export class PlayerObject extends GameObject<Player> {
  @property(Node)
  characterPanting: Node | null = null;
  @property(Node)
  progress: Node | null = null;
  @property(Node)
  messageCounts: Node | null = null;

  public static readonly seatNumberText: string[] = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
  private _selectable = true;

  get data() {
    return this._data;
  }

  set data(data: Player) {
    super.data = data;
    if (data) {
      this.characterPanting.getComponent(CharacterObject).data = data.character;
      this.node.getChildByPath("Border/UserName/Label").getComponent(Label).string = data.name;
    }
  }

  get selectable() {
    return this._selectable;
  }

  onLoad() {
    this.progress.active = false;
  }

  //设置座位文字
  setSeat(seatNumber: number) {
    this.node.getChildByName("SeatNumber").getComponent(Label).string = PlayerObject.seatNumberText[seatNumber];
  }

  //倒计时
  startCoundDown(seconds) {
    this.progress.getComponent(ProgressControl).startCoundDown(seconds);
  }

  stopCountDown() {
    this.progress.getComponent(ProgressControl).stopCountDown();
  }

  //刷新手牌数量
  refreshHandCardCount() {
    this.messageCounts.getChildByPath("HandCard/Label").getComponent(Label).string = this.data.handCardCount.toString();
  }

  refreshMessageCount() {
    this.messageCounts.getChildByPath("Black/Label").getComponent(Label).string =
      this.data.messageCounts.black.toString();
    this.messageCounts.getChildByPath("Red/Label").getComponent(Label).string = this.data.messageCounts.red.toString();
    this.messageCounts.getChildByPath("Blue/Label").getComponent(Label).string =
      this.data.messageCounts.blue.toString();
  }

  refreshStatus() {
    switch (this.data.status) {
      case PlayerStatus.DEAD:
        this._selectable = false;
        break;
      case PlayerStatus.DYING:
        break;
      case PlayerStatus.ALIVE:
        this._selectable = true;
        break;
    }
  }
}
