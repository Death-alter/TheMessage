import { _decorator, resources, Animation, Sprite, SpriteFrame, Label, Vec3, Color, Quat, tween, UIOpacity } from "cc";
import { CardDirection, CardStatus } from "./type";
import { GameObject } from "../../GameObject";
import { UnknownCard } from "./CardClass/UnknownCard";
import { Card } from "./Card";
const { ccclass, property } = _decorator;

@ccclass("CardObject")
export class CardObject extends GameObject<Card> {
  public static readonly colors = ["#222222", "#e10602", "#2932e1"];

  get data() {
    return this._data;
  }

  set data(data: Card) {
    super.data = data;
    if (data) {
      this.refresh(data);
    }
  }

  refresh(card: Card) {
    const coverNode = this.node.getChildByPath("Inner/Panting/Cover");
    const imageNode = this.node.getChildByPath("Inner/Panting/Image");
    const detailNode = imageNode.getChildByName("CardDetail");
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
        colorNodeLeft.active = true;
        colorNodeRight.active = true;
        if (card.color.length === 1) {
          Color.fromHEX(colorNodeLeft.getComponent(Sprite).color, CardObject.colors[card.color[0]]);
          Color.fromHEX(colorNodeRight.getComponent(Sprite).color, CardObject.colors[card.color[0]]);
        } else {
          Color.fromHEX(colorNodeLeft.getComponent(Sprite).color, CardObject.colors[card.color[0]]);
          Color.fromHEX(colorNodeRight.getComponent(Sprite).color, CardObject.colors[card.color[1]]);
        }
      }

      const arrow = detailNode.getChildByName("Arrow");
      if (card.direction != null) {
        arrow.active = true;
        if (card.direction === CardDirection.LEFT) {
          Quat.fromAngleZ(arrow.rotation, 90);
        } else if (card.direction === CardDirection.RIGHT) {
          Quat.fromAngleZ(arrow.rotation, -90);
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
        coverNode.getComponent(Animation).play();
      }
    }
  }

  flip() {
    return new Promise((reslove, reject) => {
      const node = this.node.getChildByName("Inner");
      //未知卡牌不能翻面
      if (!this.data || this.data instanceof UnknownCard) {
        reject();
      } else {
        //翻面动画
        tween(node)
          .to(0.3, { scale: new Vec3(0, 1, 1) })
          .call(() => {
            if (this.data) {
              this.refresh(this.data);
            }
          })
          .to(0.3, { scale: new Vec3(1, 1, 1) })
          .call(() => {
            reslove(null);
          })
          .start();
      }
    });
  }
}
