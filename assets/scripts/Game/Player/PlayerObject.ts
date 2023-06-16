import { _decorator, Label, Node, Sprite, Color, color } from "cc";
import { CharacterObject } from "../Character/CharacterObject";
import { Player } from "./Player";
import { ProgressControl } from "../../UI/Game/ProgressControl";
import { GameObject } from "../../GameObject";
import { PlayerStatus } from "./type";
import { CardColor } from "../Card/type";

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
  private _selectable: boolean = true;
  private _locked: boolean = false;

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
    if (this.data) {
      if (this.data.status === PlayerStatus.DEAD) {
        return false;
      }
      return this._selectable;
    } else {
      return false;
    }
  }

  set selectable(selectable) {
    this._selectable = selectable;
    this.refreshSelectableState();
  }

  get locked() {
    return this._locked;
  }

  set locked(locked: boolean) {
    this._locked = locked;
    this.refreshLockState();
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
      this.data.messageCounts[CardColor.BLACK].toString();
    this.messageCounts.getChildByPath("Red/Label").getComponent(Label).string = this.data.messageCounts[CardColor.RED].toString();
    this.messageCounts.getChildByPath("Blue/Label").getComponent(Label).string =
      this.data.messageCounts[CardColor.BLUE].toString();
  }

  refreshSelectableState() {
    if (this.data.isAlive) {
      if (this._selectable) {
        this.node.getChildByPath("Cover").active = false;
      } else {
        this.node.getChildByPath("Cover").active = true;
      }
    }
  }

  refreshLockState() {
    if (this._locked) {
      this.node.getChildByName("PlayerLock").active = true;
    } else {
      this.node.getChildByName("PlayerLock").active = false;
    }
  }

  refreshStatus() {
    const statusTextNode = this.node.getChildByPath("Border/StatusText");
    console.log(statusTextNode)
    switch (this.data.status) {
      case PlayerStatus.DEAD:
        this.node.getChildByPath("Border/CharacterPanting/Mask/Image").getComponent(Sprite).grayscale = true;
        this.node.getChildByPath("Border/CharacterPanting/Mask/Cover").getComponent(Sprite).grayscale = true;
        const blue = this.node.getChildByPath("Border/Message/Blue").getComponent(Sprite);
        blue.grayscale = true;
        blue.color = color("#FFFFFF");
        const black = this.node.getChildByPath("Border/Message/Black").getComponent(Sprite);
        black.grayscale = true;
        black.color = color("#FFFFFF");
        const red = this.node.getChildByPath("Border/Message/Red").getComponent(Sprite);
        red.grayscale = true;
        red.color = color("#FFFFFF");
        const handCard = this.node.getChildByPath("Border/Message/HandCard").getComponent(Sprite);
        handCard.grayscale = true;
        handCard.color = color("#FFFFFF");
        statusTextNode.getComponent(Label).string = "死亡";
        statusTextNode.active = true;
        break;
      case PlayerStatus.DYING:
        statusTextNode.getComponent(Label).string = "濒死";
        statusTextNode.active = true;
        break;
      case PlayerStatus.ALIVE:
        statusTextNode.active = false;
        break;
    }
  }
}
