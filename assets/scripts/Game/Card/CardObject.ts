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
import { CardDirection, CardStatus } from "./type";
import { GameObject } from "../../GameObject";
import { UnknownCard } from "./CardClass/UnknownCard";
import { Card } from "./Card";
import { GameUI } from "../../UI/Game/GameWindow/GameUI";
import { CardInfoWindow } from "../../UI/Game/GameWindow/CardInfoWindow";
import { copyCard } from "./index";
import { ShiTan } from "./CardClass/ShiTan";
import { MiLing } from "./CardClass/MiLing";
import { Identity } from "../Identity/Identity";
const { ccclass, property } = _decorator;

@ccclass("CardObject")
export class CardObject extends GameObject<Card> {
  private touchStartTime: number = 0;
  private isOnTouch = false;

  get data() {
    return this._data;
  }

  set data(data: Card) {
    super.setData(data);
    if (this._data) {
      this.refresh(this._data);
    }
  }

  onEnable() {
    if (sys.isMobile) {
      this.node.on("longtap", () => {
        const deltaTime = new Date().getTime() - this.touchStartTime;
        if (deltaTime > 500) {
          const cardInfoWindow = find("Canvas/GameUI").getComponent(GameUI).cardInfoWindow;
          const cardInfo = cardInfoWindow.getComponent(CardInfoWindow);
          cardInfo.card = copyCard(this.data);
          cardInfo.card.gameObject = cardInfoWindow.getComponentInChildren(CardObject);
          cardInfo.show();
        }
      });
    } else {
      this.node.on(Node.EventType.MOUSE_ENTER, () => {
        const cardInfoWindow = find("Canvas/GameUI").getComponent(GameUI).cardInfoWindow;
        const cardInfo = cardInfoWindow.getComponent(CardInfoWindow);
        cardInfo.card = copyCard(this.data);
        cardInfo.card.gameObject = cardInfoWindow.getComponentInChildren(CardObject);
        cardInfo.show();
      });
      this.node.on(Node.EventType.MOUSE_LEAVE, () => {
        find("Canvas/GameUI").getComponent(GameUI).cardInfoWindow.active = false;
      });
    }
  }

  onDisable() {
    if (sys.isMobile) {
      this.node.off(Node.EventType.TOUCH_START);
      this.node.off(Node.EventType.TOUCH_END);
      this.node.off(Node.EventType.TOUCH_CANCEL);
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

    if (card instanceof UnknownCard) {
      imageNode.active = false;
      coverNode.active = true;
    } else {
      imageNode.active = true;
      resources.load(card.sprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
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
    }
  }

  flip() {
    return new Promise((reslove, reject) => {
      const node = this.node.getChildByName("Inner");
      //未知卡牌不能翻面
      if (!this.data || this.data instanceof UnknownCard) {
        reject("未知卡牌不能翻面");
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
            reslove(null);
          })
          .start();
      }
    });
  }
}
