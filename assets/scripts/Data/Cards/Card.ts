import { CardStatus, CardUsage, CardOption, CardDirection, CardType, CardColor } from "./type";
import EventTarget from "../../Event/EventTarget";
import { GameEvent } from "../../Event/type";
import { DataClass } from "../DataClass";
import { CardUI } from "../../UI/Game/Card/CardUI";

export class Card extends DataClass {
  protected _id: number;
  protected _name: string;
  protected _type: CardType;
  protected _sprite: string;
  protected _status: CardStatus;
  protected _usage: CardUsage;
  protected _direction: CardDirection;
  protected _color: CardColor[];
  protected _lockable: boolean;
  protected _UI: CardUI;

  public readonly backSprite: string = "images/cards/CardBack";

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
    EventTarget.emit(GameEvent.CARD_STATUS_CHANGE, status);
  }

  get usage() {
    return this._usage;
  }
  set usage(usage) {
    if (usage == null || usage === this._usage) return;
    this._usage = usage;
    EventTarget.emit(GameEvent.CARD_USEAGE_CHANGE, usage);
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

  get UI(): CardUI {
    return this._UI;
  }
  set UI(UI: CardUI | null) {
    if (UI === this._UI) return;
    if (UI) {
      this._UI = UI;
      if (this._UI.card !== this) this._UI.card = this;
    } else if (this._UI) {
      const UI = this._UI;
      this._UI = null;
      UI.card = null;
    }
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
    if (option.UI) {
      this.UI = option.UI;
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
    if (this.status === CardStatus.FACE_UP) {
      this.status = CardStatus.FACE_DOWN;
    } else {
      this.status = CardStatus.FACE_UP;
    }
    this.UI.flip();
  }
}

export class UnknownCard extends DataClass {
  public readonly status: CardStatus = CardStatus.FACE_DOWN;
  public readonly backSprite: string = "images/cards/CardBack";
  protected _UI: CardUI;

  get UI(): CardUI {
    return this._UI;
  }
  set UI(UI: CardUI | null) {
    if (UI === this._UI) return;

    if (UI) {
      this._UI = UI;
      if (this._UI.card !== this) this._UI.card = this;
    } else if (this._UI) {
      const UI = this._UI;
      this._UI = null;
      UI.card = null;
    }
  }

  constructor(UI?) {
    super();
    if (UI) {
      this.UI = UI;
    }
  }
}
