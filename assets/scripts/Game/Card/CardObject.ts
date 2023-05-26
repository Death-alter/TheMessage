import {
  _decorator,
  resources,
  Node,
  Animation,
  Sprite,
  SpriteFrame,
  Label,
  Vec3,
  Color,
  color,
  Quat,
  tween,
  UIOpacity,
  Material,
  UITransform,
  Vec2,
} from "cc";
import { CardDirection, CardStatus } from "./type";
import { GameObject } from "../../GameObject";
import { UnknownCard } from "./CardClass/UnknownCard";
import { Card } from "./Card";
const { ccclass, property } = _decorator;

@ccclass("CardObject")
export class CardObject extends GameObject<Card> {
  public static readonly colors = ["#222222", "#e10602", "#2932e1"];

  private defaultMaterial: Material = null;
  private showOuterGlow: boolean = false;

  get data() {
    return this._data;
  }

  set data(data: Card) {
    super.data = data;
    if (this.data) {
      this.refresh(this.data);
    }
  }

  update() {
    if (this.showOuterGlow) {
      this.refreshOuterGlow();
    }
  }

  openOuterGlow(c?: string) {
    const imageNode = this.node.getChildByPath("Inner/Panting/Image");
    if (this.defaultMaterial && imageNode.getComponent(Sprite).material !== this.defaultMaterial) return;
    resources.load("material/rectOuterGlow", Material, (err, material) => {
      material.addRef();
      const transform = imageNode.getComponent(UITransform);
      material.setProperty("texSize", new Vec2(transform.width, transform.height));
      if (c) {
        material.setProperty("lightColor", color(c));
      }
      imageNode.getComponent(Sprite).customMaterial = material;
      this.showOuterGlow = true;
    });
  }

  refreshOuterGlow() {
    const imageNode = this.node.getChildByPath("Inner/Panting/Image");
    const material = imageNode.getComponent(Sprite).material;
    const p = material.passes[0].getHandle("worldPosition");
    material.passes[0].setUniform(p, new Vec2(imageNode.worldPosition.x, imageNode.worldPosition.y));
  }

  closeOuterGlow() {
    this.node.getChildByPath("Inner/Panting/Image").getComponent(Sprite).customMaterial = null;
    this.showOuterGlow = false;
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
      console.log(card.color);
      if (!card.color || card.color.length === 0) {
        colorNodeLeft.active = false;
        colorNodeRight.active = false;
      } else {
        if (card.color.length === 1) {
          Color.fromHEX(colorNodeLeft.getComponent(Sprite).color, CardObject.colors[card.color[0]]);
          Color.fromHEX(colorNodeRight.getComponent(Sprite).color, CardObject.colors[card.color[0]]);
          console.log(CardObject.colors[card.color[0]]);
        } else {
          Color.fromHEX(colorNodeLeft.getComponent(Sprite).color, CardObject.colors[card.color[0]]);
          Color.fromHEX(colorNodeRight.getComponent(Sprite).color, CardObject.colors[card.color[1]]);
          console.log(CardObject.colors[card.color[0]]);
          console.log(CardObject.colors[card.color[1]]);
        }
        colorNodeLeft.active = true;
        colorNodeRight.active = true;
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
        if (card.id) {
          coverNode.getComponent(Animation).play();
        }
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
          .to(0.3, { scale: new Vec3(0, 1, 1) })
          .call(() => {
            if (this.data) {
              this.refresh(this.data);
            }
          })
          .to(0.3, { scale: new Vec3(1, 1, 1) })
          .delay(0.2)
          .call(() => {
            reslove(null);
          })
          .start();
      }
    });
  }
}
