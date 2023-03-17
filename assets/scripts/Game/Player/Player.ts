import { Character } from "../Character/Character";
import { Identity } from "../Identity/Identity";
import { CharacterObject } from "../Character/CharacterObject";
import { PlayerObject } from "./PlayerObject";
import { PlayerOption } from "./type";
import { DataBasic } from "../DataBasic";
import { GameCard, CardUsage, CardStatus, CardColor } from "../Card/type";
import { Card, UnknownCard } from "../Card/Card";

export class Player extends DataBasic<PlayerObject> {
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
      this.character.gameObject = this.gameObject.node
        .getChildByPath("Border/CharacterPanting")
        .getComponent(CharacterObject);
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

  get handCardCount() {
    return this._handCards.length;
  }

  get messageCounts() {
    const data = { black: 0, red: 0, blue: 0 };
    for (let message of this._messages) {
      for (let color of message.color) {
        switch (color) {
          case CardColor.BLACK:
            ++data.black;
            break;
          case CardColor.RED:
            ++data.red;
            break;
          case CardColor.BLUE:
            ++data.blue;
            break;
        }
      }
    }
    return data;
  }

  get alive() {
    return this._alive;
  }

  constructor(option: PlayerOption) {
    super();
    this._id = option.id;
    this._name = option.name;
    this.character = option.character;
    if (option.identity != null) {
    }
    if (option.gameObject) {
      this.gameObject = option.gameObject;
    }
  }

  //抽牌
  addHandCard(cards: GameCard | GameCard[]) {
    if (!(cards instanceof Array)) {
      cards = [cards];
    }
    this._handCards = [...this._handCards, ...cards];
    this.gameObject.refreshHandCardCount();
  }

  //弃牌
  removeHandCard(cardIds: number | number[] | null): GameCard[] {
    if (typeof cardIds === "number") {
      cardIds = [cardIds];
    }
    const arr = [];
    if (cardIds) {
      for (let cardId of cardIds) {
        for (let i = 0; i < this._handCards.length; i++) {
          if (cardId === (<Card>this._handCards[i]).id) {
            arr.push(this._handCards.splice(i, 1)[0]);
            break;
          }
        }
      }
    }
    this.gameObject.refreshHandCardCount();
    return arr;
  }

  //丢弃所有手牌
  removeAllHandCards() {
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
