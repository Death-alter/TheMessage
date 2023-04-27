import { CardStatus, CardOption, CardDirection, CardType, CardColor, CardOnEffectParams } from "./type";
import { DataBasic } from "../../DataBasic";
import { CardObject } from "./CardObject";
import { GameData } from "../../UI/Game/GameWindow/GameData";
import { Tween, Node } from "cc";

export abstract class Card extends DataBasic<CardObject> {
  protected _id: number;
  protected _name: string;
  protected _type: CardType;
  protected _sprite: string;
  protected _status: CardStatus;
  protected _direction: CardDirection;
  protected _color: CardColor[];
  protected _lockable: boolean;
  public action: Tween<Node> | null = null;

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
    this._sprite = option.sprite;
    this._type = option.type;
    this._status = option.status == null ? CardStatus.FACE_UP : option.status;
    this._direction = option.direction;
    this._color = option.color;
    this._lockable = option.lockable;
    if (option.gameObject) {
      this.gameObject = option.gameObject;
    }
  }

  //当做功能牌打出
  onPlay(...args: any[]): void {}

  //当做情报传递
  onSend(...args: any[]): void {}

  onSelectAsFunctionCard() {}

  onSelectAsMessage() {}

  onSelectAsHandCard() {}

  abstract onConfirmPlay(gameData: GameData): void;

  abstract onEffect(gameData: GameData, params: CardOnEffectParams): void;

  //翻面
  flip() {
    if (this._status === CardStatus.FACE_UP) {
      this._status = CardStatus.FACE_DOWN;
    } else {
      this._status = CardStatus.FACE_UP;
    }
    if (this.gameObject.flip) {
      return this.gameObject.flip();
    }
  }
}
