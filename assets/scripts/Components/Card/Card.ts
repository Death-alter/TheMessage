import { CardStatus, CardOption, CardDirection, CardType, CardColor, CardOnEffectParams } from "./type";
import { DataBasic } from "../../DataBasic";
import { CardObject } from "./CardObject";
import { GameData } from "../../Manager/GameData";
import { Tween, Node } from "cc";
import { GamePhase } from "../../Manager/type";
import { GameManager } from "../../Manager/GameManager";

export abstract class Card extends DataBasic<CardObject> {
  public static readonly colors = ["#222222", "#e10602", "#2932e1"];

  protected _id: number;
  protected _name: string;
  protected _type: CardType;
  protected _status: CardStatus;
  protected _direction: CardDirection;
  protected _color: CardColor[];
  protected _lockable: boolean;
  public action: Tween<Node> | null = null;

  public static readonly backSprite: string = "images/cards/CardBack";
  public abstract readonly availablePhases: GamePhase[];

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get status() {
    return this._status;
  }
  set status(status) {
    if (status == null || status === this._status) return;
    this._status = status;
    if (this._gameObject) {
      this._gameObject.refresh(this);
    }
  }

  get direction() {
    return this._direction;
  }

  get color() {
    return this._color;
  }

  get lockable() {
    return this._lockable;
  }

  constructor(option: CardOption) {
    super();
    this._id = option.id;
    this._name = option.name;
    this._type = option.type;
    this._status = option.status == null ? CardStatus.FACE_UP : option.status;
    this._direction = option.direction;
    this._color = option.color;
    this._lockable = option.lockable;
    if (option.gameObject) {
      this.gameObject = option.gameObject;
    }
  }

  onPlay(gui: GameManager): void {}

  onEffect(gameData: GameData, params: CardOnEffectParams): boolean | void {
    return true;
  }

  onFinish(gui: GameManager): boolean | void {
    return true;
  }

  //翻面
  flip() {
    if (this._status === CardStatus.FACE_UP) {
      this._status = CardStatus.FACE_DOWN;
    } else {
      this._status = CardStatus.FACE_UP;
    }
    if (this.gameObject) {
      return this.gameObject.flip();
    }
  }

  static hasColor(card: Card, color: CardColor): boolean;
  static hasColor(cards: Card[], color: CardColor): boolean;
  static hasColor(card: Card | Card[], color: CardColor): boolean {
    if (card instanceof Card) {
      return card.color.indexOf(color) !== -1;
    } else {
      for (let c of card) {
        if (c.color.indexOf(color) !== -1) {
          return true;
        }
      }
      return false;
    }
  }
}
