import { direction, card_type, phase } from "../../Protobuf/proto";
import { CardStatus, CardUseage, CardOption } from "./types";
import EventTarget from "../Event/EventTarget";
import { GameEvent } from "../Event/types";

export class Card {
  protected _id: number;
  protected _name: string;
  protected _type: card_type;
  protected _spirit: string;
  protected _status: CardStatus;
  protected _useage: CardUseage;
  protected _direction: direction;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get spirit() {
    return this._spirit;
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

  get useage() {
    return this._useage;
  }
  set useage(useage) {
    if (useage !== this._useage) {
      this._useage = useage;
      EventTarget.emit(GameEvent.CARD_USEAGE_CHANGE, useage);
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
    this._useage = option.useage || CardUseage.UNKONWN;
    this._direction = option.direction;
  }

  //当做功能牌打出
  onPlay(...args: any[]): void {
    this.useage = CardUseage.FUNCTION_CARD;
  }

  //当做情报传递
  onSend(...args: any[]): void {
    this.useage = CardUseage.MESSAGE_CARD;
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
