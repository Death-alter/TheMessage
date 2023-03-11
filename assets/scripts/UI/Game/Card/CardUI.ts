import { _decorator, Component, resources, Animation, Sprite, SpriteFrame, Node, Vec3, Color } from "cc";
import { CardStatus, CardUsage, GameCard } from "../../../Cards/type";
import { Card, UnknownCard } from "../../../Cards/Card";
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
        if (this._selected) {
          this._selected = false;
        } else {
          this._selected = true;
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
        frame: 0.33, // 第 0.5 秒时触发事件
        func: "changeCardSprite", // 事件触发时调用的函数名称
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
