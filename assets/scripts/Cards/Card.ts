import { CardStatus, CardUsage, CardOption, CardDirection, CardType } from "./type";
import EventTarget from "../Event/EventTarget";
import { GameEvent } from "../Event/type";

export class Card {
  protected _id: number;
  protected _name: string;
  protected _type: CardType;
  protected _sprite: string;
  protected _status: CardStatus;
  protected _usage: CardUsage;
  protected _direction: CardDirection;

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
    if (status !== this._status) {
      this._status = status;
      EventTarget.emit(GameEvent.CARD_STATUS_CHANGE, status);
    }
  }

  get usage() {
    return this._usage;
  }
  set usage(usage) {
    if (usage !== this._usage) {
      this._usage = usage;
      EventTarget.emit(GameEvent.CARD_USEAGE_CHANGE, usage);
    }
  }

  get direction() {
    return this._direction;
  }

  constructor(option: CardOption) {
    this._id = option.id;
    this._name = option.name;
    this._type = option.type;
    this._status = option.status || CardStatus.FACE_UP;
    this._usage = option.usage || CardUsage.UNKNOWN;
    this._direction = option.direction;
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
    if (this.status === CardStatus.FACE_UP) {
      this.status = CardStatus.FACE_DOWN;
    } else {
      this.status = CardStatus.FACE_UP;
    }
  }
}
