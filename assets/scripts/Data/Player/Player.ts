import { Character } from "../Characters/Character";
import { Identity } from "../Identity/Identity";
import { CharacterPanting } from "../../UI/Game/Character/CharacterPanting";
import { PlayerUI } from "../../UI/Game/Player/PlayerUI";
import { PlayerOption } from "./type";
import { DataClass } from "../type";
import { GameCard, CardUsage, CardStatus } from "../Cards/type";
import { Card } from "../Cards/Card";

export default class Player extends DataClass {
  public static turnPlayerId: number;

  private _id: number;
  private _name: string;
  private _character: Character;
  private _identityList: Identity[] = [];
  private _seatNumber: number;
  private _handCards: GameCard[] = [];
  private _messages: Card[] = [];
  protected _UI: PlayerUI;

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
    this._character = character;
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
    this._seatNumber = number;
    this._UI.setSeat(number);
  }

  get handCards() {
    return this._handCards;
  }

  get messages() {
    return this._messages;
  }

  get UI() {
    return this._UI;
  }

  constructor(option: PlayerOption) {
    super(option.UI);
    this._id = option.id;
    this._name = option.name;
    this._character = option.character;
    if (option.identity != null) {
    }
  }

  //增加一张手牌
  addCard(card: GameCard) {
    this._handCards.push(card);
    this._UI.refreshHandCardCount();
  }

  //增加多张手牌
  addCards(cardList: GameCard[]) {
    this._handCards = [...this._handCards, ...cardList];
    this._UI.refreshHandCardCount();
  }

  //弃一张牌
  discardCard(card: GameCard) {
    for (let i = 0; i < this._handCards.length; i++) {
      if (card === this._handCards[i]) {
        this._handCards.splice(i, 1);
        break;
      }
    }
    this._UI.refreshHandCardCount();
  }

  //弃多张牌
  discardCards(cardList: GameCard[]) {
    for (let card of cardList) {
      for (let i = 0; i < this._handCards.length; i++) {
        if (card === this._handCards[i]) {
          this._handCards.splice(i, 1);
          break;
        }
      }
    }
    this._UI.refreshHandCardCount();
  }

  //丢弃所有手牌
  disCardAllHandCards() {
    this._handCards = [];
    this._UI.refreshHandCardCount();
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
    this._UI.refreshMessageCount();
  }

  //从情报区移除情报
  removeMessage(message: Card) {
    for (let i = 0; i < this._messages.length; i++) {
      if (message === this._messages[i]) {
        this._messages.splice(i, 1);
      }
    }
    this._UI.refreshMessageCount();
  }

  //移除所有情报
  removeAllMessage() {
    this._messages = [];
    this._UI.refreshMessageCount();
  }

  bindUI(script: PlayerUI) {
    this._UI = script;
    this._UI.player = this;
    this.character.bindUI(this._UI.node.getChildByPath("Border/CharacterPanting").getComponent(CharacterPanting));
  }
}
