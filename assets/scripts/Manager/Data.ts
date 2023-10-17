import { GameEvent } from "../Event/type";
import { GameEventCenter } from "../Event/EventTarget";
import { Player } from "../Components/Player/Player";
import { GamePhase } from "./type";
import { Card } from "../Components/Card/Card";
import { HandCardList } from "../Components/Container/HandCardList";
import { CardDirection } from "../Components/Card/type";
import { SecretTaskType } from "../Components/Identity/type";
import { Skill } from "../Components/Skill/Skill";

export interface Option {
  playerCount: number;
  secretTaskList: SecretTaskType[];
}

export class GameData {
  //对局信息
  private _playerCount: number = 0;
  private _secretTaskList: SecretTaskType[] = [];
  private _deckCardCount: number = 0;
  private _discardPile: Card[] = [];
  private _banishedCards: Card[] = [];

  get playerCount() {
    return this._playerCount;
  }

  get secretTaskList() {
    return [...this._secretTaskList];
  }

  set deckCardCount(count: number) {
    this._deckCardCount = count;
  }
  get deckCardCount() {
    return this._deckCardCount;
  }

  //玩家信息
  private _playerList: Player[];
  private _handCardList: HandCardList = new HandCardList();

  get playerList() {
    return this._playerList;
  }

  get selfPlayer() {
    return this._playerList[0];
  }

  get identity() {
    return this.selfPlayer.identityList[0];
  }

  get handCardList() {
    return this._handCardList;
  }

  //回合信息
  private _turnPlayerId: number = -1;
  private _gamePhase: GamePhase;

  get gamePhase() {
    return this._gamePhase;
  }
  set gamePhase(phase: GamePhase) {
    if (phase == null || phase === this._gamePhase) return;
    switch (this._gamePhase) {
      case GamePhase.DRAW_PHASE:
        GameEventCenter.emit(GameEvent.DRAW_PHASE_END);
        break;
      case GamePhase.MAIN_PHASE:
        GameEventCenter.emit(GameEvent.MAIN_PHASE_END);
        break;
      case GamePhase.SEND_PHASE:
        GameEventCenter.emit(GameEvent.SEND_PHASE_END);
        break;
      case GamePhase.FIGHT_PHASE:
        GameEventCenter.emit(GameEvent.FIGHT_PHASE_END);
        break;
      case GamePhase.RECEIVE_PHASE:
        this._senderId = -1;
        GameEventCenter.emit(GameEvent.RECEIVE_PHASE_END);
        break;
    }
    this._gamePhase = phase;
    GameEventCenter.emit(GameEvent.GAME_PHASE_CHANGE, { phase, turnPlayer: this.playerList[this.turnPlayerId] });
    switch (this._gamePhase) {
      case GamePhase.DRAW_PHASE:
        GameEventCenter.emit(GameEvent.DRAW_PHASE_START);
        break;
      case GamePhase.MAIN_PHASE:
        GameEventCenter.emit(GameEvent.MAIN_PHASE_START);
        break;
      case GamePhase.SEND_PHASE_START:
        GameEventCenter.emit(GameEvent.SEND_PHASE_START);
        break;
      case GamePhase.FIGHT_PHASE:
        this.lockedPlayerId = null;
        GameEventCenter.emit(GameEvent.FIGHT_PHASE_START);
        break;
      case GamePhase.RECEIVE_PHASE:
        GameEventCenter.emit(GameEvent.RECEIVE_PHASE_START);
        break;
    }
  }

  get turnPlayer() {
    return this._playerList[this._turnPlayerId];
  }

  set turnPlayerId(playerId: number) {
    if (playerId == null || playerId === this._turnPlayerId) return;
    this._turnPlayerId = playerId;
    GameEventCenter.emit(GameEvent.GAME_TURN_CHANGE, { turnPlayer: this.playerList[playerId] });
  }
  get turnPlayerId() {
    return this._turnPlayerId;
  }

  //正在使用的卡牌信息
  private _cardOnPlay: Card;

  //正在使用的技能信息
  private _skillOnUse: Skill;

  //正在传递的情报信息
  private _messageInTransmit: Card | null = null;
  private _messageDirection: CardDirection;
  private _senderId: number = -1;
  private _messagePlayerId: number = -1;
  private _lockedPlayerId: number = -1;

  get sender() {
    return this._playerList[this._senderId];
  }

  get senderId() {
    return this._senderId;
  }
  set senderId(playerId: number) {
    this._senderId = playerId;
  }

  get lockedPlayer() {
    return this._playerList[this._lockedPlayerId];
  }

  get lockedPlayerId() {
    return this._lockedPlayerId;
  }
  set lockedPlayerId(playerId: number) {
    if (playerId === this._lockedPlayerId) return;
    if (playerId == null) {
      this._lockedPlayerId = -1;
    } else {
      this._lockedPlayerId = playerId;
    }
  }

  get messageInTransmit() {
    return this._messageInTransmit;
  }

  get messagePlayer() {
    return this._playerList[this._messagePlayerId];
  }

  get messagePlayerId() {
    return this._messagePlayerId;
  }
  set messagePlayerId(playerId: number) {
    if (playerId === this._messagePlayerId) return;
    const oldId = this._messagePlayerId;
    if (playerId == null) {
      this._messagePlayerId = -1;
    } else {
      this._messagePlayerId = playerId;
    }

    if (oldId !== -1 && this.messageInTransmit && playerId !== -1) {
      GameEventCenter.emit(GameEvent.MESSAGE_TRANSMISSION, {
        sender: this.playerList[this._senderId],
        message: this.messageInTransmit,
        messagePlayer: this.playerList[playerId],
      });
    }
  }

  set messageDirection(direction: CardDirection) {
    this._messageDirection = direction;
  }
  get messageDirection() {
    return this._messageDirection;
  }

  //濒死相关信息
  private _dyingPlayerId: number = -1; //等待澄清的玩家

  get dyingPlayer() {
    return this._playerList[this._dyingPlayerId];
  }

  set dyingPlayerId(playerId: number) {
    if (playerId === this._messagePlayerId) return;
    if (playerId == null) {
      this._dyingPlayerId = -1;
    } else {
      this._dyingPlayerId = playerId;
    }
  }
  get dyingPlayerId() {
    return this._dyingPlayerId;
  }

  constructor(option: Option) {
    this._playerCount = option.playerCount;
    this._secretTaskList = option.secretTaskList;
  }
}
