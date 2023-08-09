import { _decorator, Label, Node, Sprite, color } from "cc";
import { Player } from "./Player";
import { GameObject } from "../../GameObject";
import { PlayerStatus } from "./type";
import { CardColor } from "../Card/type";
import { Identity } from "../Identity/Identity";
import { CharacterObject } from "../Chatacter/CharacterObject";
import { NoIdentity } from "../Identity/IdentityClass/NoIdentity";
import { ProgressControl } from "../Utils/ProgressControl";

const { ccclass, property } = _decorator;

@ccclass("PlayerObject")
export class PlayerObject extends GameObject<Player> {
  @property(Node)
  characterPanting: Node | null = null;
  @property(Node)
  progress: Node | null = null;
  @property(Node)
  phaseLabel: Node | null = null;
  @property(Node)
  messageCounts: Node | null = null;

  public static readonly seatNumberText: string[] = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
  private _selectable: boolean = true;
  private _locked: boolean = false;
  private _selectedIdentity: Identity | null = null;

  get data() {
    return this._data;
  }

  set data(data: Player) {
    super.setData(data);
    if (data) {
      this.characterPanting.getComponent(CharacterObject).data = data.character;
      if (data.name === "惑星") {
        this.node.getChildByPath("Border/UserName/Label").getComponent(Label).string = data.name + "·设计大师";
      } else {
        this.node.getChildByPath("Border/UserName/Label").getComponent(Label).string = data.name;
      }
      this.refreshIdentityList();
      this.refreshHandCardCount();
      this.refreshLockState();
      this.refreshMessageCount();
      this.refreshStatus();
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
    this.phaseLabel.getComponent(Label).spacingX = 4;
  }

  onEnable() {
    this.node.getChildByPath("Border/Identity").on(
      Node.EventType.TOUCH_END,
      () => {
        this.changeSelectedIdentity();
      },
      this
    );
  }

  onDisable() {
    this.node.getChildByPath("Border/Identity").off(Node.EventType.TOUCH_END);
  }

  //设置座位文字
  setSeat() {
    if (this.data.seatNumber)
      this.node.getChildByName("SeatNumber").getComponent(Label).string =
        PlayerObject.seatNumberText[this.data.seatNumber];
  }

  setNetWorkStatusText(text) {
    this.node.getChildByPath("Border/NetworkStatus").getComponent(Label).string = text;
  }

  //倒计时
  startCoundDown(seconds) {
    this.progress.getComponent(ProgressControl).startCoundDown(seconds);
  }

  stopCountDown() {
    this.progress.getComponent(ProgressControl).stopCountDown();
  }

  showPhaseText(text) {
    this.phaseLabel.getComponent(Label).string = text;
    this.phaseLabel.active = true;
  }

  hidePhaseText() {
    this.phaseLabel.getComponent(Label).string = "";
    this.phaseLabel.active = false;
  }

  //刷新手牌数量
  refreshHandCardCount() {
    this.messageCounts.getChildByPath("HandCard/Label").getComponent(Label).string = this.data.handCardCount.toString();
  }

  showBannedIcon() {
    this.node.getChildByPath("Border/Banned").active = true;
  }

  hideBannedIcon() {
    this.node.getChildByPath("Border/Banned").active = false;
  }

  refreshMessageCount() {
    this.messageCounts.getChildByPath("Black/Label").getComponent(Label).string =
      this.data.messageCounts[CardColor.BLACK].toString();
    this.messageCounts.getChildByPath("Red/Label").getComponent(Label).string =
      this.data.messageCounts[CardColor.RED].toString();
    this.messageCounts.getChildByPath("Blue/Label").getComponent(Label).string =
      this.data.messageCounts[CardColor.BLUE].toString();
  }

  refreshSelectableState() {
    if (this.data && this.data.isAlive) {
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

  changeSelectedIdentity(identity?: Identity) {
    if (identity) {
      this._selectedIdentity = identity;
    } else if (!this.data) {
      return;
    } else {
      const index = this.data.identityList.indexOf(this._selectedIdentity);
      if (index === -1) {
        this._selectedIdentity = this.data.identityList[0];
      } else {
        if (this.data.identityList.length === 1) {
          this._selectedIdentity = this.data.identityList[0];
        } else if (index === this.data.identityList.length - 1) {
          this._selectedIdentity = null;
        } else {
          this._selectedIdentity = this.data.identityList[index + 1];
        }
      }
    }

    const identityColor = this.node.getChildByPath("Border/Identity/Mask/IdentityColor").getComponent(Sprite);
    const identityLabel = this.node.getChildByPath("Border/Identity/Mask/Label").getComponent(Label);

    if (!this._selectedIdentity) {
      identityColor.color = color("#646464");
      identityLabel.string = "?";
      identityLabel.fontSize = 28;
      identityLabel.lineHeight = 22;
    } else {
      if (this._selectedIdentity instanceof NoIdentity) {
        identityColor.color = color("#FFFFFF");
        identityLabel.string = "";
      } else {
        identityColor.color = color(this._selectedIdentity.color);
        identityLabel.string = this._selectedIdentity.name[0];
        identityLabel.fontSize = 18;
        identityLabel.lineHeight = 20;
      }
    }
  }

  refreshIdentityList() {
    if (this.data.identityList.length === 1) {
      this.changeSelectedIdentity(this.data.identityList[0]);
    } else if (this._selectedIdentity && this.data.identityList.indexOf(this._selectedIdentity) === -1) {
      this.changeSelectedIdentity();
    }
  }
}
