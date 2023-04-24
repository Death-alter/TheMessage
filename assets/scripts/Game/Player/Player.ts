import { Character } from "../Character/Character";
import { Identity } from "../Identity/Identity";
import { CharacterObject } from "../Character/CharacterObject";
import { PlayerObject } from "./PlayerObject";
import { PlayerOption, PlayerStatus } from "./type";
import { DataBasic } from "../../DataBasic";
import { CardUsage, CardStatus, CardColor } from "../Card/type";
import { Card } from "../Card/Card";
import { Agent } from "../Identity/IdentityClass/Agent";
import { Lurker } from "../Identity/IdentityClass/Lurker";
import { MysteriousPerson } from "../Identity/IdentityClass/MysteriousPerson";

export class Player extends DataBasic<PlayerObject> {
  private _id: number;
  private _name: string;
  private _character: Character;
  private _identityList: Identity[] = [new Agent(), new Lurker(), new MysteriousPerson()];
  private _seatNumber: number;
  private _handCards: Card[] = [];
  private _messages: Card[] = [];
  private _status: PlayerStatus = PlayerStatus.ALIVE;

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

  get seatNumber() {
    return this._seatNumber;
  }
  set seatNumber(number) {
    if (number == null || number === this._seatNumber) return;
    this._seatNumber = number;
    this.gameObject?.setSeat(number);
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

  get status() {
    return this._status;
  }

  set status(status: PlayerStatus) {
    if (!status || status === this._status) return;
    this._status = status;
    if (this.gameObject) {
      this.gameObject.refreshStatus();
    }
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
  addHandCard(cards: Card | Card[]) {
    if (!(cards instanceof Array)) {
      cards = [cards];
    }
    this._handCards = [...this._handCards, ...cards];
    this.gameObject.refreshHandCardCount();
  }

  //弃牌
  removeHandCard(cardId: number): Card;
  removeHandCard(cardIds: number[]): Card[];
  removeHandCard(cardIds: number | number[]): Card | Card[] {
    if (typeof cardIds === "number") {
      let card = null;
      for (let i = 0; i < this._handCards.length; i++) {
        if (cardIds === this._handCards[i].id) {
          card = this._handCards.splice(i, 1)[0];
        }
      }
      this.gameObject.refreshHandCardCount();
      return card;
    } else {
      const arr = [];
      for (let cardId of cardIds) {
        for (let i = 0; i < this._handCards.length; i++) {
          if (cardId === this._handCards[i].id) {
            arr.push(this._handCards.splice(i, 1)[0]);
            break;
          }
        }
      }
      this.gameObject.refreshHandCardCount();
      return arr;
    }
  }

  //丢弃所有手牌
  removeAllHandCards() {
    const arr = this._handCards;
    this._handCards = [];
    this.gameObject.refreshHandCardCount();
    return arr;
  }

  //角色翻面
  flipCharacter() {
    this._character.flip();
  }

  //情报置入情报区
  addMessage(messages: Card | Card[]) {
    if (!(messages instanceof Array)) {
      messages = [messages];
    }
    messages.forEach((message) => {
      if (message.usage !== CardUsage.MESSAGE_CARD) message.usage = CardUsage.MESSAGE_CARD;
      if (message.status !== CardStatus.FACE_UP) message.status = CardStatus.FACE_UP;
    });

    this._messages = [...this._messages, ...messages];
    this.gameObject.refreshMessageCount();
  }

  //从情报区移除情报
  removeMessage(messageIds: number | number[]): Card[] {
    if (typeof messageIds === "number") {
      messageIds = [messageIds];
    }
    const arr = [];
    for (let messageId of messageIds) {
      for (let i = 0; i < this._messages.length; i++) {
        if (messageId === this._messages[i].id) {
          arr.push(this._messages.splice(i, 1)[0]);
          break;
        }
      }
    }
    this.gameObject.refreshMessageCount();
    return arr;
  }

  //移除所有情报
  removeAllMessage() {
    const arr = this._messages;
    this._messages = [];
    this.gameObject.refreshMessageCount();
    return arr;
  }

  //确认玩家是某个身份
  confirmIdentity(identity: Identity) {
    this._identityList = [identity];
  }

  //排除玩家是某个身份
  ruleOutIdentity(identity) {
    for (let i = 0; i < this._identityList.length; i++) {
      if (this._identityList[i].type === identity.type) {
        this._identityList.splice(i, 1);
        break;
      }
    }
  }
}
