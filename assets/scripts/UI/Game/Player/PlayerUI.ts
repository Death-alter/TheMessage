import { _decorator, Component, Label, Node, UITransform, tween, Tween } from "cc";
const { ccclass, property } = _decorator;
import { CharacterPanting } from "../Character/CharacterPanting";
import { CardUsage, CardStatus, GameCard } from "../../../Cards/type";
import { Card } from "../../../Cards/Card";
import Player from "../../../Game/Player";
import EventTarget from "../../../Event/EventTarget";
import { GameEvent } from "../../../Event/type";
import { ProgressControl } from "../../../Utils/ProgressControl";

@ccclass("PlayerUI")
export class PlayerUI extends Component {
  @property(Node)
  characterPanting: Node | null = null;
  @property(Node)
  progress: Node | null = null;
  @property(Node)
  messageCounts: Node | null = null;

  private _player: Player;
  private _messages: Card[] = [];
  private _handCards: GameCard[] = [];

  get messages() {
    return this._messages;
  }

  get handCards() {
    return this._handCards;
  }

  init(player: Player) {
    this._player = player;
    this.characterPanting.getComponent(CharacterPanting).character = player.character;
    this.node.getChildByPath("Border/UserName/Label").getComponent(Label).string = player.name;
    this.progress.active = false;
  }

  //设置座位文字
  setSeat(seatNumber: number) {
    this._player.seatNumber = seatNumber;
    this.node.getChildByName("SeatNumber").getComponent(Label).string = Player.seatNumberText[seatNumber];
  }

  //倒计时
  startCoundDown(secondes) {
    this.progress.getComponent(ProgressControl).startCoundDown(secondes);
  }

  stopCountDown() {
    this.progress.getComponent(ProgressControl).stopCountDown();
  }

  //设置当前回合玩家
  setTurnPlayer(boolean) {
    this._player.isTurnPlayer = boolean;
  }

  //增加手牌
  addCard(card) {
    this._handCards.push(card);
    this.messageCounts.getChildByPath("HandCard/Label").getComponent(Label).string = this._handCards.length.toString();
  }

  addCards(cardList: GameCard[]) {
    this._handCards = [...this._handCards, ...cardList];
    this.messageCounts.getChildByPath("HandCard/Label").getComponent(Label).string = this._handCards.length.toString();
  }

  //弃牌
  disCard(cardList: GameCard[]) {
    for (let card of cardList) {
      for (let i = 0; i < this._handCards.length; i++) {
        if (card === this._handCards[i]) {
          this._handCards.splice(i, 1)[0];
          break;
        }
      }
    }
  }

  disCardAllHandCards() {
    this._handCards = [];
  }

  //情报置入情报区
  addMessage(message: Card): void {
    if (message.usage !== CardUsage.MESSAGE_CARD) message.usage = CardUsage.MESSAGE_CARD;
    if (message.status !== CardStatus.FACE_UP) message.status = CardStatus.FACE_UP;
    this._messages.push(message);
  }

  //从情报区移除情报
  removeMessage(message: Card): Card | null {
    for (let i = 0; i < this._messages.length; i++) {
      if (message === this._messages[i]) {
        return this._messages.splice(i, 1)[0];
      }
    }
    return null;
  }

  removeAllMessage() {
    this._messages = [];
  }
}
