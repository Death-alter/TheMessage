import { _decorator, resources, Animation, Sprite, SpriteFrame, Node, Vec3, Color, Quat, tween } from "cc";
import { CardDirection, CardStatus, GameCard } from "./type";
import { UnknownCard } from "./Card";
import { GameObject } from "../GameObject";
const { ccclass, property } = _decorator;

@ccclass("CardObject")
export class CardObject extends GameObject<GameCard> {
  public static readonly colors = ["#222222", "#e10602", "#2932e1"];

  get data() {
    return this._data;
  }

  set data(data: GameCard) {
    super.data = data;
    if (data) {
      this.refresh(data);
    }
  }

  refresh(card: GameCard) {
    const coverNode = this.node.getChildByPath("Inner/Panting/Cover");
    const imageNode = this.node.getChildByPath("Inner/Panting/Image");
    const detailNode = imageNode.getChildByName("CardDetail");
    const sprite = imageNode.getComponent(Sprite);
    if (card instanceof UnknownCard) {
      imageNode.active = false;
      coverNode.active = true;
    } else {
      console.log(card);
      imageNode.active = true;
      resources.load(card.sprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame;
      });
      const colorNodeLeft = detailNode.getChildByPath("Color/Left").getComponent(Sprite);
      const colorNodeRight = detailNode.getChildByPath("Color/Right").getComponent(Sprite);
      if (card.color.length === 1) {
        Color.fromHEX(colorNodeLeft.color, CardObject.colors[card.color[0]]);
        Color.fromHEX(colorNodeRight.color, CardObject.colors[card.color[0]]);
      } else {
        Color.fromHEX(colorNodeLeft.color, CardObject.colors[card.color[0]]);
        Color.fromHEX(colorNodeRight.color, CardObject.colors[card.color[1]]);
      }
      if (card.direction === CardDirection.LEFT) {
        Quat.fromAngleZ(detailNode.getChildByName("Arrow").rotation, 90);
      } else if (card.direction === CardDirection.RIGHT) {
        Quat.fromAngleZ(detailNode.getChildByName("Arrow").rotation, -90);
      }
      if (card.lockable) {
        detailNode.getChildByName("Lock").active = true;
      } else {
        detailNode.getChildByName("Lock").active = false;
      }

      if (card.status === CardStatus.FACE_UP) {
        coverNode.active = false;
        coverNode.getComponent(Animation).stop();
      } else {
        coverNode.active = true;
        coverNode.getComponent(Animation).play();
      }
    }
  }

  flip() {
    const node = this.node.getChildByName("Inner");
    //未知卡牌不能翻面
    if (!this.data || this.data instanceof UnknownCard) {
      return;
    } else {
      //翻面动画
      return new Promise((reslove, reject) => {
        const scale = node.scale;
        tween(node)
          .to(0.5, { scale: new Vec3(0, 1, 1) })
          .call(() => {
            console.log(this.data);
            if (this.data) {
              this.refresh(this.data);
            }
          })
          .to(0.5, { scale })
          .call(() => {
            reslove(null);
          })
          .start();
      });
    }
  }
}
