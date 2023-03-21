import { CardStatus, CardUsage, CardOption, CardDirection, CardType, CardColor } from "./type";
import { DataBasic } from "../DataBasic";
import { CardObject } from "../../Game/Card/CardObject";

export class Card extends DataBasic<CardObject> {
  protected _id: number;
  protected _name: string;
  protected _type: CardType;
  protected _sprite: string;
  protected _status: CardStatus;
  protected _usage: CardUsage;
  protected _direction: CardDirection;
  protected _color: CardColor[];
  protected _lockable: boolean;

  public static readonly backSprite: string = "images/cards/CardBack";

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get sprite() {
    return this._sprite;
  }

  get status() {
    return this._status;
  }
  set status(status) {
    if (status == null || status === this._status) return;
    this._status = status;
    this._gameObject.refresh(this);
  }

  get usage() {
    return this._usage;
  }
  set usage(usage) {
    if (usage == null || usage === this._usage) return;
    this._usage = usage;
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
    this._sprite = option.sprite;
    this._type = option.type;
    this._status = option.status || CardStatus.FACE_UP;
    this._usage = option.usage || CardUsage.UNKNOWN;
    this._direction = option.direction;
    this._color = option.color;
    this._lockable = option.lockable;
    if (option.gameObject) {
      this.gameObject = option.gameObject;
    }
  }

  //当做功能牌打出
  onPlay(...args: any[]): void {
    this.usage = CardUsage.FUNCTION_CARD;
  }

  //当做情报传递
  onSend(...args: any[]): void {
    this.usage = CardUsage.MESSAGE_CARD;
  }

  //翻面
  flip() {
    if (this._status === CardStatus.FACE_UP) {
      this._status = CardStatus.FACE_DOWN;
    } else {
      this._status = CardStatus.FACE_UP;
    }
    return this.gameObject.flip();
  }
}

export class UnknownCard extends DataBasic<CardObject> {
  public readonly id: number = 0;
  public readonly status: CardStatus = CardStatus.FACE_DOWN;
  public readonly backSprite: string = "images/cards/CardBack";

  public usage: CardUsage;

  constructor(gameObject?: CardObject) {
    super();
    if (gameObject) {
      this.gameObject = gameObject;
    }
  }
}
