import { Character } from "../Characters/Character";
import { Identity } from "../Identity/Identity";
import { CharacterObject } from "../../GameObject/Character/CharacterObject";
import { PlayerObject } from "../../GameObject/Player/PlayerObject";
import { PlayerOption } from "./type";
import { DataBasic } from "../DataBasic";
import { GameCard, CardUsage, CardStatus } from "../Cards/type";
import { Card } from "../Cards/Card";

export default class Player extends DataBasic<PlayerObject> {
  public static turnPlayerId: number;

  private _id: number;
  private _name: string;
  private _character: Character;
  private _identityList: Identity[] = [];
  private _seatNumber: number;
  private _handCards: GameCard[] = [];
  private _messages: Card[] = [];
  private _alive: boolean = true;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get character() {
    return this._character;
  }
  set character(character: Character) {
    if (!character || character === this._character) return;
    this._character = character;
    if (this.gameObject) {
      this.character.gameObject = this.gameObject.node.getChildByPath("Border/CharacterObject").getComponent(CharacterObject);
    }
  }

  get identityList() {
    return this._identityList;
  }

  get isTurnPlayer(): boolean {
    return this._id === Player.turnPlayerId;
  }

  get seatNumber() {
    return this._seatNumber;
  }
  set seatNumber(number) {
    if (number == null || number === this._seatNumber) return;
    this._seatNumber = number;
    this.gameObject.setSeat(number);
  }

  get handCards() {
    return this._handCards;
  }

  get messages() {
    return this._messages;
  }

  get alive() {
    return this._alive;
  }

  constructor(option: PlayerOption) {
    super();
    this._id = option.id;
    this._name = option.name;
    this._character = option.character;
    if (option.identity != null) {
    }
    if (option.gameObject) {
      this.gameObject = option.gameObject;
    }
  }

  //抽牌
  addCard(cards: GameCard | GameCard[]) {
    if (!(cards instanceof Array)) {
      cards = [cards];
    }
    this._handCards = [...this._handCards, ...cards];
    this.gameObject.refreshHandCardCount();
  }

  //弃牌
  discardCard(cardIds: number | number[]): GameCard[] {
    if (typeof cardIds === "number") {
      cardIds = [cardIds];
    }
    const arr = [];
    for (let cardId of cardIds) {
      for (let i = 0; i < this._handCards.length; i++) {
        if (cardId === (<Card>this._handCards[i]).id) {
          arr.push(this._handCards.splice(i, 1)[0]);
          break;
        }
      }
    }
    this.gameObject.refreshHandCardCount();
    return arr;
  }

  //丢弃所有手牌
  disCardAllHandCards() {
    this._handCards = [];
    this.gameObject.refreshHandCardCount();
  }

  //角色翻面
  flipCharacter() {
    this._character.flip();
  }

  //情报置入情报区
  addMessage(message: Card) {
    if (message.usage !== CardUsage.MESSAGE_CARD) message.usage = CardUsage.MESSAGE_CARD;
    if (message.status !== CardStatus.FACE_UP) message.status = CardStatus.FACE_UP;
    this._messages.push(message);
    this.gameObject.refreshMessageCount();
  }

  //从情报区移除情报
  removeMessage(message: Card) {
    for (let i = 0; i < this._messages.length; i++) {
      if (message === this._messages[i]) {
        this._messages.splice(i, 1);
      }
    }
    this.gameObject.refreshMessageCount();
  }

  //移除所有情报
  removeAllMessage() {
    this._messages = [];
    this.gameObject.refreshMessageCount();
  }

  dead() {
    this._alive = false;
  }
}
