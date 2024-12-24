import { _decorator, Label, Node, Sprite, color, EventMouse, sys } from "cc";
import { Player } from "./Player";
import { Entity } from "../../Entity";
import { PlayerStatus } from "./type";
import { CardColor } from "../Card/type";
import { Identity } from "../Identity/Identity";
import { CharacterEntity } from "../Character/CharacterEntity";
import { ProgressControl } from "../Utils/ProgressControl";
import { Skill } from "../Skill/Skill";
import { IdentityEntity } from "../Identity/IdentityEntity";
import { UIEventCenter } from "../../Event/EventTarget";
import { UIEvent } from "../../Event/type";
import { MysteriousPerson } from "../Identity/IdentityClass/MysteriousPerson";

const { ccclass, property } = _decorator;

@ccclass("PlayerEntity")
export class PlayerEntity extends Entity<Player> {
  @property(Node)
  characterPanting: Node | null = null;
  @property(Node)
  progress: Node | null = null;
  @property(Node)
  phaseLabel: Node | null = null;
  @property(Node)
  messageCounts: Node | null = null;
  @property(Node)
  identityNode: Node | null;

  public static readonly seatNumberText: string[] = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
  private _selectable: boolean = true;
  private _locked: boolean = false;
  private _enableSelectIdentity: boolean = true;

  get data() {
    return this._data;
  }

  set data(data: Player) {
    super.setData(data);
    if (data) {
      this.characterPanting.getComponent(CharacterEntity).data = data.character;
      if (data.name === "惑星" || data.name === "狗卡风声") {
        const arr = ["傲视群雄", "设计大师", "复读机"];
        const n = Math.floor(Math.random() * arr.length);
        this.node.getChildByPath("Border/UserName/Label").getComponent(Label).string = data.name + "·" + arr[n];
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

  get enableSelectIdentity() {
    return this._enableSelectIdentity;
  }

  set enableSelectIdentity(value: boolean) {
    this._enableSelectIdentity = value;
  }

  onLoad() {
    this.progress.active = false;
    this.phaseLabel.getComponent(Label).spacingX = 4;
    const sprite = this.node.getChildByPath("Border/InnerGlow").getComponent(Sprite);
    sprite.material = sprite.customMaterial;
  }

  onEnable() {
    if (!this.data || this.data.id === 0) return;
    if (sys.isMobile) {
      this.node.getChildByPath("Border/Identity").on(
        "tap",
        () => {
          this.changeSelectedIdentity();
        },
        this,
      );
      this.node.getChildByPath("Border/Identity").on(
        "longtap",
        () => {
          this.selectIdentity();
        },
        this,
      );
    } else {
      this.node.getChildByPath("Border/Identity").on(
        Node.EventType.MOUSE_UP,
        (event: EventMouse) => {
          if (this.data.identityList.length > 1 || this.data.identityList[0] instanceof MysteriousPerson) {
            if (event.getButton() === EventMouse.BUTTON_LEFT) {
              this.changeSelectedIdentity();
            } else if (event.getButton() === EventMouse.BUTTON_RIGHT) {
              this.selectIdentity();
            }
          }
        },
        this,
      );
    }
  }

  onDisable() {
    if (!this.data ||this.data.id === 0) return;
    this.node.getChildByPath("Border/Identity").off(Node.EventType.TOUCH_END);
  }

  //设置座位文字
  setSeat() {
    if (this.data.seatNumber)
      this.node.getChildByName("SeatNumber").getComponent(Label).string =
        PlayerEntity.seatNumberText[this.data.seatNumber];
  }

  setNetWorkStatusText(text) {
    this.node.getChildByPath("Border/NetworkStatus").getComponent(Label).string = text;
  }

  //倒计时
  startCountDown(seconds) {
    this.progress.getComponent(ProgressControl).startCountDown(seconds);
  }

  setSkillOnUse(skill: Skill) {
    if (skill) {
      this.node.getChildByPath("Border/SkillOnUse").getComponent(Label).string = skill.name;
    } else {
      this.node.getChildByPath("Border/SkillOnUse").getComponent(Label).string = "";
    }
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

  showSkillBannedIcon() {
    this.node.getChildByPath("Border/Banned/SkillBanned").active = true;
  }

  hideSkillBannedIcon() {
    this.node.getChildByPath("Border/Banned/SkillBanned").active = false;
  }

  showCardBannedIcon() {
    if (!this.node.getChildByPath("Border/Banned/AllCardBanned").active) {
      this.node.getChildByPath("Border/Banned/CardBanned").active = true;
    }
  }

  hideCardBannedIcon() {
    this.node.getChildByPath("Border/Banned/CardBanned").active = false;
  }

  showAllCardBannedIcon() {
    this.hideCardBannedIcon();
    this.node.getChildByPath("Border/Banned/AllCardBanned").active = true;
  }

  hideAllCardBannedIcon() {
    this.node.getChildByPath("Border/Banned/AllCardBanned").active = false;
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
    if (!this._enableSelectIdentity) return;
    const identityEntity = this.identityNode.getComponent(IdentityEntity);
    if (identity !== undefined) {
      identityEntity.data = identity;
    } else if (!this.data) {
      return;
    } else {
      const index = this.data.identityList.indexOf(identityEntity.data);
      if (index === -1) {
        identityEntity.data = this.data.identityList[0];
      } else {
        if (this.data.identityList.length === 1) {
          identityEntity.data = this.data.identityList[0];
        } else if (index === this.data.identityList.length - 1) {
          identityEntity.data = null;
        } else {
          identityEntity.data = this.data.identityList[index + 1];
        }
      }
    }
  }

  selectIdentity() {
    this.identityNode.getComponent(IdentityEntity).data = null;
    const list = [...this.data.identityList];
    UIEventCenter.emit(UIEvent.START_MARK_IDENTITY, {
      identityList: list,
      playerEntity: this,
    });
  }

  refreshIdentityList() {
    const identityEntity = this.identityNode.getComponent(IdentityEntity);
    if (this.data.identityList.length === 1) {
      this.changeSelectedIdentity(this.data.identityList[0]);
    } else if (identityEntity.data && this.data.identityList.indexOf(identityEntity.data) === -1) {
      this.changeSelectedIdentity(null);
    }
  }

  showInnerGlow(c?: string) {
    const glowNode = this.node.getChildByPath("Border/InnerGlow");
    const sprite = glowNode.getComponent(Sprite);
    if (c) {
      sprite.material.setProperty("lightColor", color(c));
    }
    glowNode.active = true;
  }

  hideInnerGlow() {
    this.node.getChildByPath("Border/InnerGlow").active = false;
  }
}
