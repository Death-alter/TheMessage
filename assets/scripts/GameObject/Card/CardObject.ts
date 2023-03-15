import { _decorator, resources, Animation, Sprite, SpriteFrame, Node, Vec3, Color, Quat } from "cc";
import { CardDirection, CardStatus, CardUsage, GameCard } from "../../Data/Cards/type";
import { Card, UnknownCard } from "../../Data/Cards/Card";
import EventTarget from "../../Event/EventTarget";
import { ProcessEvent } from "../../Event/type";
import { GameObject } from "../GameObject";
const { ccclass, property } = _decorator;

@ccclass("CardObject")
export class CardObject extends GameObject<GameCard> {
  @property(Node)
  detailNode: Node | null = null;

  private _animationComponent: Animation;
  private _selected: boolean = false;

  public static readonly colors = ["#222222", "#e10602", "#2932e1"];

  get selected() {
    return this._selected;
  }

  set selected(selected) {
    if (selected == null || this._selected === selected) return;
    this._selected = selected;
    if (selected) {
      this.node.position = new Vec3(this.node.position.x, 20, 0);
    } else {
      this.node.position = new Vec3(this.node.position.x, 0, 0);
    }
  }

  start() {
    this._animationComponent = this.node.getComponent(Animation);
    if (this._animationComponent && this._animationComponent.defaultClip) {
      const { defaultClip } = this._animationComponent;
      defaultClip.events.push({
        frame: 0.33,
        func: "changeCardSprite",
        params: [],
      });
    }
    this.node.on(Node.EventType.TOUCH_END, (event) => {
      if (this.data instanceof Card && this.data.usage === CardUsage.HAND_CARD) {
        if (this.selected) {
          this.selected = false;
        } else {
          this.selected = true;
          EventTarget.emit(ProcessEvent.SELECT_HAND_CARD, this.node);
        }
      }
    });
  }

  refresh(card: GameCard) {
    const sprite = this.node.getChildByName("Panting").getComponent(Sprite);
    if (card instanceof UnknownCard) {
      this.detailNode.active = false;
      resources.load(card.backSprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame;
      });
    } else {
      this.detailNode.active = true;
      const spriteUrl = card.status === CardStatus.FACE_DOWN ? Card.backSprite : card.sprite;
      resources.load(spriteUrl + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame;
      });
      const colorNodeLeft = this.detailNode.getChildByPath("Color/Left").getComponent(Sprite);
      const colorNodeRight = this.detailNode.getChildByPath("Color/Right").getComponent(Sprite);
      if (card.color.length === 1) {
        Color.fromHEX(colorNodeLeft.color, CardObject.colors[card.color[0]]);
        Color.fromHEX(colorNodeRight.color, CardObject.colors[card.color[0]]);
      } else {
        Color.fromHEX(colorNodeLeft.color, CardObject.colors[card.color[0]]);
        Color.fromHEX(colorNodeRight.color, CardObject.colors[card.color[1]]);
      }
      if (card.direction === CardDirection.LEFT) {
        Quat.fromAngleZ(this.detailNode.getChildByName("Arrow").rotation, 90);
      } else if (card.direction === CardDirection.RIGHT) {
        Quat.fromAngleZ(this.detailNode.getChildByName("Arrow").rotation, -90);
      }
      if (card.lockable) {
        this.detailNode.getChildByName("Lock").active = true;
      } else {
        this.detailNode.getChildByName("Lock").active = false;
      }
    }
  }

  flip() {
    if (!this.data || this.data instanceof UnknownCard) {
      return;
    } else {
      this.data.flip();
      this._animationComponent.play();
    }
  }

  changeCardSprite() {
    if (this.data instanceof UnknownCard) return;
    const sprite = this.node.getChildByName("Panting").getComponent(Sprite);
    if (this.data.status === CardStatus.FACE_DOWN) {
      resources.load(Card.backSprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame;
      });
    } else {
      resources.load(this.data.sprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame;
      });
    }
  }
}
