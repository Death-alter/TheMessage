import { _decorator } from "cc";
import { GameEvent, ProcessEvent } from "../../../Event/type";
import { GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { Player } from "../../../Game/Player/Player";
import { Identity } from "../../../Game/Identity/Identity";
import { createCharacterById } from "../../../Game/Character";
import { CharacterStatus, CharacterType } from "../../../Game/Character/type";
import { createIdentity } from "../../../Game/Identity";
import { IdentityType, SecretTaskType } from "../../../Game/Identity/type";
import { GamePhase } from "../../../GameManager/type";
import {
  CardColor,
  CardDirection,
  CardOnEffectParams,
  CardStatus,
  CardType,
  CardUsage,
  GameCard,
} from "../../../Game/Card/type";
import { createCard, createUnknownCard } from "../../../Game/Card";
import { PlayerStatus } from "../../../Game/Player/type";
import * as ProcessEventType from "../../../Event/ProcessEventType";
import { Card, UnknownCard } from "../../../Game/Card/Card";
import { card } from "../../../../protobuf/proto";
import { DataBasic } from "../../../DataBasic";
import { GameUI } from "./GameUI";

export class GameData extends DataBasic<GameUI> {
  public selfPlayer: Player;
  public identity: Identity;
  public playerCount: number;
  public playerList: Player[];
  public messageInTransmit: GameCard | null = null;
  public messageDirection: CardDirection;
  public deckCardCount: number;
  public cardOnPlay: GameCard;
  public discardPile: Card[] = [];
  public banishedCards: Card[] = [];

  private _gamePhase: GamePhase;
  private _turnPlayerId: number;
  private _messagePlayerId: number;

  get gamePhase() {
    return this._gamePhase;
  }
  private set gamePhase(phase: GamePhase) {
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

  get turnPlayerId() {
    return this._turnPlayerId;
  }
  private set turnPlayerId(playerId: number) {
    if (playerId == null || playerId === this._turnPlayerId) return;
    this._turnPlayerId = playerId;
    GameEventCenter.emit(GameEvent.GAME_TURN_CHANGE, { turnPlayer: this.playerList[playerId] });
  }

  get messagePlayerId() {
    return this._messagePlayerId;
  }

  set messagePlayerId(playerId: number) {
    if (playerId == null || playerId === this._messagePlayerId) return;
    const oldId = this._messagePlayerId;
    this._messagePlayerId = playerId;
    if (oldId) {
      GameEventCenter.emit(GameEvent.MESSAGE_TRANSMISSION, {
        message: this.messageInTransmit,
        messagePlayer: this.playerList[playerId],
      });
    }
  }

  registerEvents() {
    ProcessEventCenter.on(ProcessEvent.INIT_GAME, this.init, this);
    ProcessEventCenter.on(ProcessEvent.GET_PHASE_DATA, this.onGetPhaseData, this);
    ProcessEventCenter.once(
      ProcessEvent.GET_PHASE_DATA,
      (data: ProcessEventType.GetPhaseData) => {
        //设置座位号
        let i = data.currentPlayerId;
        let j = 0;
        do {
          this.playerList[i].seatNumber = j;
          i = (i + 1) % this.playerCount;
          ++j;
        } while (i !== data.currentPlayerId);
        GameEventCenter.emit(GameEvent.GAME_START, {
          firstPlayerId: data.currentPlayerId,
        });
      },
      this
    );
    ProcessEventCenter.on(ProcessEvent.SYNC_DECK_NUM, this.syncDeckNumber, this);
    ProcessEventCenter.on(ProcessEvent.DRAW_CARDS, this.drawCards, this);
    ProcessEventCenter.on(ProcessEvent.DISCARD_CARDS, this.discardCards, this);
    ProcessEventCenter.on(ProcessEvent.UPDATE_CHARACTER_STATUS, this.updateCharacter, this);
    ProcessEventCenter.on(ProcessEvent.SEND_MESSAGE, this.playerSendMessage, this);
    ProcessEventCenter.on(ProcessEvent.CHOOSE_RECEIVE, this.playerChooseReceiveMessage, this);
    ProcessEventCenter.on(ProcessEvent.PLAYER_DYING, this.playerDying, this);
    ProcessEventCenter.on(ProcessEvent.PLAYER_BEFORE_DEATH, this.playerBeforeDeath, this);
    ProcessEventCenter.on(ProcessEvent.PLAYER_DIE_GIVE_CARD, this.playerDieGiveCard, this);
    ProcessEventCenter.on(ProcessEvent.PLAYER_DIE, this.playerDie, this);
    ProcessEventCenter.on(ProcessEvent.PLAYER_WIN, this.gameOver, this);
    // ProcessEventCenter.on(ProcessEvent.CARD_PLAYED, this.cardPlayed, this);
    // ProcessEventCenter.on(ProcessEvent.CARD_IN_PROCESS, this.cardInProcess, this);
    // ProcessEventCenter.on(ProcessEvent.CARD_HANDLE_FINISH, this.cardHandleFinish, this);
  }

  unregisterEvents() {
    ProcessEventCenter.off(ProcessEvent.INIT_GAME, this.init);
    ProcessEventCenter.off(ProcessEvent.GET_PHASE_DATA, this.onGetPhaseData);
    ProcessEventCenter.off(ProcessEvent.SYNC_DECK_NUM, this.syncDeckNumber);
    ProcessEventCenter.off(ProcessEvent.DRAW_CARDS, this.drawCards);
    ProcessEventCenter.off(ProcessEvent.DISCARD_CARDS, this.discardCards);
    ProcessEventCenter.off(ProcessEvent.UPDATE_CHARACTER_STATUS, this.updateCharacter);
    ProcessEventCenter.off(ProcessEvent.SEND_MESSAGE, this.playerSendMessage);
    ProcessEventCenter.off(ProcessEvent.CHOOSE_RECEIVE, this.playerChooseReceiveMessage);
    ProcessEventCenter.off(ProcessEvent.PLAYER_DYING, this.playerDying);
    ProcessEventCenter.off(ProcessEvent.PLAYER_BEFORE_DEATH, this.playerBeforeDeath);
    ProcessEventCenter.off(ProcessEvent.PLAYER_DIE_GIVE_CARD, this.playerDieGiveCard);
    ProcessEventCenter.off(ProcessEvent.PLAYER_DIE, this.playerDie);
    ProcessEventCenter.off(ProcessEvent.PLAYER_WIN, this.gameOver);
    // ProcessEventCenter.off(ProcessEvent.CARD_PLAYED, this.cardPlayed);
    // ProcessEventCenter.off(ProcessEvent.CARD_IN_PROCESS, this.cardInProcess);
    // ProcessEventCenter.off(ProcessEvent.CARD_HANDLE_FINISH, this.cardHandleFinish);
  }

  //初始化游戏
  private init(data) {
    this.playerCount = data.playerCount;
    this.playerList = [];

    //创建所有角色
    for (let item of data.players) {
      this.playerList.push(
        new Player({
          id: item.id,
          name: item.name,
          character: createCharacterById(item.characterId),
        })
      );
    }

    //自己的角色设置身份
    this.selfPlayer = this.playerList[0];
    this.identity = createIdentity(
      (<number>data.identity) as IdentityType,
      (<number>data.secretTask) as SecretTaskType
    );
    this.selfPlayer.confirmIdentity(this.identity);

    GameEventCenter.emit(GameEvent.GAME_INIT, { playerList: this.playerList });
  }

  //回合改变
  private onGetPhaseData(data: ProcessEventType.GetPhaseData) {
    //修改回合信息
    this.turnPlayerId = data.currentPlayerId;
    this.gamePhase = data.currentPhase;

    //如果有传递的情报
    if (data.messagePlayerId != null) {
      this.messagePlayerId = data.messagePlayerId;
      this.messageDirection = (<number>data.messageDirection) as CardDirection;
      if (data.messageInTransmit) {
        if (!this.messageInTransmit || data.messageInTransmit.cardId !== this.messageInTransmit.id) {
          this.messageInTransmit = this.createMessage(data.messageInTransmit);
        }
      }

      if (this.gamePhase === GamePhase.RECEIVE_PHASE) {
        //接收阶段
        const player = this.playerList[data.messagePlayerId];
        player.addMessage(<Card>this.messageInTransmit);
        GameEventCenter.emit(GameEvent.PLAYER_RECEIVE_MESSAGE, {
          player,
          message: this.messageInTransmit,
        });
        this.messagePlayerId = null;
      }
    }
  }

  //卡组数量变化
  private syncDeckNumber(data: ProcessEventType.SyncDeckNum) {
    this.deckCardCount = data.number;
    GameEventCenter.emit(GameEvent.DECK_CARD_NUMBER_CHANGE, { number: data.number });
    if (data.shuffled) {
      GameEventCenter.emit(GameEvent.DECK_SHUFFLED);
    }
  }

  //抽牌
  private drawCards(data: ProcessEventType.DrawCards) {
    const player = this.playerList[data.playerId];
    const cardList: GameCard[] = [];

    if (data.unknownCardCount) {
      for (let i = 0; i < data.unknownCardCount; i++) {
        const card = this.createHandCard();
        cardList.push(card);
      }
    }
    if (data.cards && data.cards.length) {
      for (let item of data.cards) {
        const card = this.createHandCard(item);
        cardList.push(card);
      }
    }
    player.addHandCard(cardList);
    GameEventCenter.emit(GameEvent.PLAYER_DRAW_CARD, { player, cardList });
  }

  //弃牌
  private discardCards(data: ProcessEventType.DiscardCards) {
    const player = this.playerList[data.playerId];
    const cardIdList = data.cards.map((item) => item.cardId);
    const cardList = player.removeHandCard(cardIdList);
    GameEventCenter.emit(GameEvent.PLAYER_DISCARD_CARD, { player, cardList });
  }

  //角色翻面
  private updateCharacter(data: ProcessEventType.UpdateCharacterStatus) {
    if (data.characterId) {
      if (this.playerList[data.playerId].character.id === 0) {
        const character = createCharacterById(data.characterId);
        this.playerList[data.playerId].character = character;
      }
      this.playerList[data.playerId].character.status = CharacterStatus.FACE_UP;
    } else {
      this.playerList[data.playerId].character.status = CharacterStatus.FACE_DOWN;
    }
    GameEventCenter.emit(GameEvent.CHARACTER_STATUS_CHANGE, {
      player: this.playerList[data.playerId],
      status: this.playerList[data.playerId].character.status,
    });
  }

  //有人传出情报
  private playerSendMessage(data: ProcessEventType.SendMessage) {
    const player = this.playerList[data.senderId];
    const targetPlayer = this.playerList[data.targetPlayerId];
    const card = player.removeHandCard(data.cardId)[0];
    this.messageInTransmit = card;
    if (card instanceof Card) {
      card.onSend();
    }
    GameEventCenter.emit(GameEvent.PLAYER_SEND_MESSAGE, { player, message: card, targetPlayer });
  }

  //有人选择接收情报
  private playerChooseReceiveMessage(data: ProcessEventType.ChooseReceive) {
    GameEventCenter.emit(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, {
      player: this.playerList[data.playerId],
      message: this.messageInTransmit,
    });
  }

  //濒死求澄清
  private playerDying(data: ProcessEventType.PlayerDying) {
    const player = this.playerList[data.playerId];
    player.status = PlayerStatus.DYING;
    GameEventCenter.emit(GameEvent.PLAYER_DYING, { player });
  }

  //玩家死亡前
  private playerBeforeDeath(data: ProcessEventType.PlayerBeforeDeath) {
    const player = this.playerList[data.playerId];
    player.status = PlayerStatus.DEAD;
    GameEventCenter.emit(GameEvent.PLAYER_BEFORE_DEATH, { player, loseGame: data.loseGame });
  }

  private playerDie(data: ProcessEventType.PlayerDie) {
    const player = this.playerList[data.playerId];
    const handCards = player.removeAllHandCards();
    const messages = player.removeAllMessage();
    GameEventCenter.emit(GameEvent.PLAYER_DIE, { player, handCards, messages });
  }

  //死亡给牌
  private playerDieGiveCard(data: ProcessEventType.PlayerDieGiveCard) {
    if (data.cards.length || data.unknownCardCount !== 0) {
      const player = this.playerList[data.playerId];
      const targetPlayer = this.playerList[data.targetPlayerId];
      let cards = [];
      if (data.unknownCardCount) {
        for (let i = 0; i < data.unknownCardCount; i++) {
          cards.push(0);
        }
      } else {
        cards = data.cards.map((item) => item.cardId);
      }

      const cardList = player.removeHandCard(cards);
      targetPlayer.addHandCard(cardList);
      GameEventCenter.emit(GameEvent.PLAYER_DIE_GIVE_CARD, { player, targetPlayer, cardList });
      GameEventCenter.emit(GameEvent.PLAYER_GET_CARDS_FROM_OTHERS, {
        player: targetPlayer,
        fromPlayer: player,
        cardList,
      });
    }
  }

  //游戏结束
  private gameOver(data: ProcessEventType.PlayerWin) {
    GameEventCenter.emit(
      GameEvent.GAME_OVER,
      data.players.map((item) => {
        return {
          player: this.playerList[item.playerId],
          identity: item.identity,
          secretTask: item.secretTask,
          isWinner: item.isWinner,
          isDeclarer: item.isDeclarer,
        };
      })
    );
  }

  //打出卡牌
  private cardPlayed(data: ProcessEventType.CardPlayed) {
    let card: GameCard;
    if (data.userId === 0) {
      if (data.card) {
        card = this.selfPlayer.removeHandCard(data.card.cardId)[0];
      } else {
        card = this.selfPlayer.removeHandCard(data.cardId)[0];
      }
    } else {
      card = this.playerList[data.userId].removeHandCard(0)[0];
      if (data.card) {
        card = this.createFunctionCard(data.card);
      }
    }
    if (card instanceof Card) card.onPlay();
    this.cardOnPlay = card;
    GameEventCenter.emit(GameEvent.PLAYER_PLAY_CARD, { player: this.playerList[data.userId], card });
  }

  //卡牌效果处理
  private cardInProcess(data: ProcessEventType.CardInProcess) {
    if (!this.cardOnPlay) {
      return;
    }
    if (this.cardOnPlay instanceof UnknownCard) {
      if (data.card) {
        this.cardOnPlay = this.createFunctionCard(data.card);
      } else {
        return;
      }
    }

    const handlerName = data.handler || "onEffect";
    const params: CardOnEffectParams = {};

    if (data.userId) params.user = this.playerList[data.userId];
    if (data.targetPlayerId) params.targetPlayer = this.playerList[data.targetPlayerId];
    if (data.card) params.card = this.createFunctionCard(data.card);
    if (data.targetCard) params.card = this.createCard(data.targetCard);
    if (data.cardId) params.cardId = data.cardId;
    if (data.targetCardId) params.targetCardId = data.targetCardId;
    if (data.cards) params.cardList = data.cards.map((card) => this.createCard(card));
    if (data.flag) params.flag = data.flag;

    this.cardOnPlay[handlerName](this, params);
  }

  //卡牌处理完毕
  private cardHandleFinish() {
    this.cardOnPlay = null;
    GameEventCenter.emit(GameEvent.AFTER_PLAYER_PLAY_CARD);
  }

  private createCard(card?: card, usage?: CardUsage): GameCard {
    if (card) {
      return createCard({
        id: card.cardId,
        color: (<number[]>card.cardColor) as CardColor[],
        type: (<number>card.cardType) as CardType,
        direction: (<number>card.cardDir) as CardDirection,
        drawCardColor: (<number[]>card.whoDrawCard) as CardColor[],
        usage: usage || CardUsage.UNKNOWN,
        lockable: card.canLock,
      });
    } else {
      return createUnknownCard();
    }
  }

  private createFunctionCard(card?: card): GameCard {
    return this.createCard(card, CardUsage.FUNCTION_CARD);
  }

  private createHandCard(card?: card): GameCard {
    return this.createCard(card, CardUsage.HAND_CARD);
  }

  private createMessage(card?: card): GameCard {
    return this.createCard(card, CardUsage.MESSAGE_CARD);
  }
}
