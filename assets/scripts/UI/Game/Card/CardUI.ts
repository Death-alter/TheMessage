import { _decorator, Component, resources, Animation, Sprite, SpriteFrame, Node, Vec3, Color, Quat } from "cc";
import { CardDirection, CardStatus, CardUsage, GameCard } from "../../../Data/Cards/type";
import { Card, UnknownCard } from "../../../Data/Cards/Card";
import EventTarget from "../../../Event/EventTarget";
import { ProcessEvent } from "../../../Event/type";
const { ccclass, property } = _decorator;

@ccclass("CardUI")
export class CardUI extends Component {
  private _card: GameCard;
  private _animationComponent: Animation;
  private _selected: boolean = false;

  public static readonly colors = ["#222222", "#e10602", "#2932e1"];

  get card() {
    return this._card;
  }

  private set card(card: GameCard) {
    this._card = card;
    this.refresh(card);
  }

  get selected() {
    return this._selected;
  }

  set selected(selected) {
    if (this._selected !== selected) {
      this._selected = selected;
      if (selected) {
        this.node.position = new Vec3(this.node.position.x, 20, 0);
      } else {
        this.node.position = new Vec3(this.node.position.x, 0, 0);
      }
    }
  }

  onEnable() {
    this.node.on(Node.EventType.TOUCH_END, (event) => {
      if (this.card instanceof Card && this.card.usage === CardUsage.HAND_CARD) {
        if (this.selected) {
          this.selected = false;
        } else {
          this.selected = true;
          EventTarget.emit(ProcessEvent.SELECT_HAND_CARD, this.node);
        }
      }
    });
  }

  init(card: GameCard) {
    this.card = card;
    this._animationComponent = this.node.getComponent(Animation);
    if (this._animationComponent && this._animationComponent.defaultClip) {
      const { defaultClip } = this._animationComponent;
      defaultClip.events.push({
        frame: 0.33,
        func: "changeCardSprite",
        params: [],
      });
    }
  }

  refresh(card: GameCard) {
    const sprite = this.node.getChildByName("Panting").getComponent(Sprite);
    if (card instanceof UnknownCard) {
      resources.load(card.backSprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame;
      });
    } else {
      const spriteUrl = card.status === CardStatus.FACE_DOWN ? card.backSprite : card.sprite;
      resources.load(spriteUrl + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame;
      });
      const colorNodeLeft = this.node.getChildByPath("Color/Left").getComponent(Sprite);
      const colorNodeRight = this.node.getChildByPath("Color/Right").getComponent(Sprite);
      if (card.color.length === 1) {
        Color.fromHEX(colorNodeLeft.color, CardUI.colors[card.color[0]]);
        Color.fromHEX(colorNodeRight.color, CardUI.colors[card.color[0]]);
      } else {
        Color.fromHEX(colorNodeLeft.color, CardUI.colors[card.color[0]]);
        Color.fromHEX(colorNodeRight.color, CardUI.colors[card.color[1]]);
      }
      if (card.direction === CardDirection.LEFT) {
        Quat.fromAngleZ(this.node.getChildByName("Arrow").rotation, 90);
      } else if (card.direction === CardDirection.RIGHT) {
        Quat.fromAngleZ(this.node.getChildByName("Arrow").rotation, -90);
      }
      if (card.lockable) {
        this.node.getChildByName("Lock").active = true;
      } else {
        this.node.getChildByName("Lock").active = false;
      }
    }
  }

  flip(card?: Card) {
    if (!this.card) return;
    if (this.card instanceof UnknownCard) {
      if (!card) {
        return;
      } else {
        this.card = card;
        card.flip();
        this._animationComponent.play();
      }
    } else {
      this.card.flip();
      this._animationComponent.play();
    }
  }

  changeCardSprite() {
    if (this.card instanceof UnknownCard) return;
    const sprite = this.node.getChildByName("Panting").getComponent(Sprite);
    if (this.card.status === CardStatus.FACE_DOWN) {
      resources.load(this.card.backSprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame;
      });
    } else {
      resources.load(this.card.sprite + "/spriteFrame", SpriteFrame, (err, spriteFrame) => {
        sprite.spriteFrame = spriteFrame;
      });
    }
  }
}
