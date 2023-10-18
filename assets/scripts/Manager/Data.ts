import { GameEvent } from "../Event/type";
import { GameEventCenter } from "../Event/EventTarget";
import { Player } from "../Components/Player/Player";
import { GamePhase } from "./type";
import { Card } from "../Components/Card/Card";
import { CardDirection } from "../Components/Card/type";
import { SecretTaskType } from "../Components/Identity/type";
import { Skill } from "../Components/Skill/Skill";

export interface Option {
  playerCount: number;
  secretTaskList: SecretTaskType[];
}

export interface Deck {
  count: number;
  topCard: Card;
}

export interface CardInUsing {
  card: Card;
  userId: number;
  targetPlayerId?: number;
}

export interface SkillInUsing {
  skill: Skill;
  userId: number;
}

export interface MessageInTransmiting {
  card: Card;
  senderId: number;
  lockedPlayerId: number;
  messagePlayerId: number;
  direction: CardDirection;
}

export class GameData {
  //对局信息
  private _playerCount: number = 0;
  private _secretTaskList: SecretTaskType[] = [];

  get playerCount() {
    return this._playerCount;
  }

  get secretTaskList() {
    return [...this._secretTaskList];
  }

  //牌堆
  private _deck: Deck = {
    count: 0,
    topCard: null,
  };
  //弃牌堆
  private _discardPile: Card[] = [];
  //被移出游戏的卡牌
  private _banishedCards: Card[] = [];
  //正在传递的情报
  private _message_in_transmiting: MessageInTransmiting;
  //正在使用的卡牌
  private _card_in_using: Card;
  //正在使用的技能
  private _skill_in_using: Skill;

  //玩家信息
  private _playerList: Player[];
  private _handCardList: Card[];

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

  //濒死相关信息
  private _dyingPlayerId: number = -1; //等待澄清的玩家

  get dyingPlayer() {
    return this._playerList[this._dyingPlayerId];
  }

  set dyingPlayerId(playerId: number) {
    if (playerId === this._dyingPlayerId) return;
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
