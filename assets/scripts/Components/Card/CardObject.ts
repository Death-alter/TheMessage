import {
  _decorator,
  resources,
  Node,
  Animation,
  Sprite,
  SpriteFrame,
  Label,
  Vec3,
  color,
  tween,
  UIOpacity,
  find,
  sys,
} from "cc";
import { CardDirection, CardStatus, CardType, CardUsableStatus } from "./type";
import { GameObject } from "../../GameObject";
import { UnknownCard } from "./CardClass/UnknownCard";
import { Card } from "./Card";
import { ShiTan } from "./CardClass/ShiTan";
import { MiLing } from "./CardClass/MiLing";
import { Identity } from "../Identity/Identity";
import { GameManager } from "../../Manager/GameManager";
import { getCardTypeText } from "./index";

const { ccclass, property } = _decorator;

@ccclass("CardObject")
export class CardObject extends GameObject<Card> {
  private _usableStatus: CardUsableStatus = CardUsableStatus.USABLE;

  get data() {
    return this._data;
  }

  set data(data: Card) {
    super.setData(data);
    if (this._data) {
      this.refresh(this._data);
    }
  }

  get usableStatus() {
    return this._usableStatus;
  }

  set usableStatus(status: CardUsableStatus) {
    this._usableStatus = status;
    this.refreshUseable(status);
  }

  onEnable() {
    if (sys.isMobile) {
      this.node.on("longtap", () => {
        find("Canvas").getComponent(GameManager).popupLayer.showCardInfo(this.data);
      });
    } else {
      this.node.on(Node.EventType.MOUSE_ENTER, () => {
        find("Canvas").getComponent(GameManager).popupLayer.showCardInfo(this.data);
      });
      this.node.on(Node.EventType.MOUSE_LEAVE, () => {
        find("Canvas").getComponent(GameManager).popupLayer.hideCardInfo();
      });
    }
  }

  onDisable() {
    if (sys.isMobile) {
      this.node.off("longtap");
    } else {
      this.node.off(Node.EventType.MOUSE_ENTER);
      this.node.off(Node.EventType.MOUSE_LEAVE);
    }
  }

  refresh(card: Card) {
    const coverNode = this.node.getChildByPath("Inner/Panting/Cover");
    const imageNode = this.node.getChildByPath("Inner/Panting/Image");
    const detailNode = imageNode.getChildByName("CardDetail");
    const otherNode = detailNode.getChildByName("Other");
    const sprite = imageNode.getComponent(Sprite);

    detailNode.getChildByPath("Name/Label").getComponent(Label).string = card.name;

    if (card.type != null && card.type !== CardType.UNKNOWN) {
      imageNode.active = true;
      resources.load(`images/cards/${getCardTypeText(card.type)}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame;
      });

      const colorNodeLeft = detailNode.getChildByPath("Color/Left");
      const colorNodeRight = detailNode.getChildByPath("Color/Right");
      if (!card.color || card.color.length === 0) {
        colorNodeLeft.active = false;
        colorNodeRight.active = false;
      } else {
        if (card.color.length === 1) {
          colorNodeLeft.getComponent(Sprite).color = color(Card.colors[card.color[0]]);
          colorNodeRight.getComponent(Sprite).color = color(Card.colors[card.color[0]]);
        } else {
          colorNodeLeft.getComponent(Sprite).color = color(Card.colors[card.color[0]]);
          colorNodeRight.getComponent(Sprite).color = color(Card.colors[card.color[1]]);
        }
        colorNodeLeft.active = true;
        colorNodeRight.active = true;
      }

      const arrow = detailNode.getChildByName("Arrow");
      if (card.direction != null) {
        arrow.active = true;
        if (card.direction === CardDirection.LEFT) {
          arrow.angle = 90;
        } else if (card.direction === CardDirection.RIGHT) {
          arrow.angle = -90;
        } else {
          arrow.angle = 0;
        }
      } else {
        arrow.active = false;
      }

      if (card.lockable) {
        detailNode.getChildByName("Lock").active = true;
      } else {
        detailNode.getChildByName("Lock").active = false;
      }

      if (card.status === CardStatus.FACE_UP) {
        coverNode.active = false;
        coverNode.getComponent(Animation).stop();
        coverNode.getComponent(UIOpacity).opacity = 255;
      } else {
        coverNode.active = true;
        if (card.id) {
          coverNode.getComponent(Animation).play();
        }
      }

      if (card instanceof ShiTan && card.drawCardColor) {
        for (let i = 0; i < 3; i++) {
          otherNode.children[i].getComponent(Sprite).color = color(Identity.colors[i]);
          if (card.drawCardColor.indexOf(i) === -1) {
            otherNode.children[i].getComponentInChildren(Label).string = "-1";
          } else {
            otherNode.children[i].getComponentInChildren(Label).string = "+1";
          }
        }
        otherNode.active = true;
      } else if (card instanceof MiLing && card.secretColor) {
        const arr = ["东", "西", "静"];
        for (let i = 0; i < card.secretColor.length; i++) {
          otherNode.children[i].getComponent(Sprite).color = color(Card.colors[card.secretColor[i]]);
          otherNode.children[i].getComponentInChildren(Label).string = arr[i];
        }
        otherNode.active = true;
      } else {
        otherNode.active = false;
      }
    } else {
      imageNode.active = false;
      coverNode.active = true;
    }
  }

  refreshUseable(status: CardUsableStatus) {
    const coverNode = this.node.getChildByPath("Cover");
    const bannedNode = this.node.getChildByPath("Banned");

    switch (status) {
      case CardUsableStatus.USABLE:
        coverNode.active = false;
        bannedNode.active = false;
        break;
      case CardUsableStatus.UNUSABLE:
        coverNode.active = true;
        bannedNode.active = false;
        break;
      case CardUsableStatus.BANNED:
        coverNode.active = true;
        bannedNode.active = true;
        break;
    }
  }

  flip() {
    return new Promise((resolve, reject) => {
      const node = this.node.getChildByName("Inner");
      if (!this.data || this.data instanceof UnknownCard) {
        resolve(null);
      } else {
        //翻面动画
        tween(node)
          .to(0.2, { scale: new Vec3(0, 1, 1) })
          .call(() => {
            if (this.data) {
              this.refresh(this.data);
            }
          })
          .to(0.2, { scale: new Vec3(1, 1, 1) })
          .delay(0.1)
          .call(() => {
            resolve(null);
          })
          .start();
      }
    });
  }
}
