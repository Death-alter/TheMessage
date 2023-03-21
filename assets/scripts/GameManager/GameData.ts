import { _decorator } from "cc";
import { GameEvent, ProcessEvent } from "../Event/type";
import { GameEventCenter, ProcessEventCenter } from "../Event/EventTarget";
import { Player } from "../Game/Player/Player";
import { Identity } from "../Game/Identity/Identity";
import { createCharacterById } from "../Game/Character";
import { CharacterStatus, CharacterType } from "../Game/Character/type";
import { createIdentity } from "../Game/Identity";
import { IdentityType, SecretTaskType } from "../Game/Identity/type";
import { GamePhase } from "./type";
import { CardColor, CardDirection, CardStatus, CardType, CardUsage, GameCard } from "../Game/Card/type";
import { createCard, createUnknownCard } from "../Game/Card";
import { PlayerStatus } from "../Game/Player/type";
import * as ProcessEventType from "../Event/ProcessEventType";
import { Card, UnknownCard } from "../Game/Card/Card";
import { card } from "../../protobuf/proto";

export class GameData {
  public selfPlayer: Player;
  public identity: Identity;
  public playerCount: number;
  public playerList: Player[];
  public messageInTransmit: GameCard | null = null;
  public messageDirection: CardDirection;
  public deckCardCount: number;
  public cardOnPlay: GameCard;

  private _gamePhase: GamePhase;
  private _turnPlayerId: number;
  private _messagePlayerId: number;

  get gamePhase() {
    return this._gamePhase;
  }
  set gamePhase(phase: GamePhase) {
    if (phase == null || phase === this._gamePhase) return;
    this._gamePhase = phase;
    GameEventCenter.emit(GameEvent.GAME_PHASE_CHANGE, { phase, turnPlayer: this.playerList[this.turnPlayerId] });
  }

  get turnPlayerId() {
    return this._turnPlayerId;
  }
  set turnPlayerId(playerId: number) {
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
        from: this.playerList[oldId],
        to: this.playerList[playerId],
      });
    }
  }

  registerEvents() {
    ProcessEventCenter.on(ProcessEvent.INIT_GAME, this.init, this);
    ProcessEventCenter.on(ProcessEvent.GET_PHASE_DATA, this.onGetPhaseData, this);
    ProcessEventCenter.on(ProcessEvent.SYNC_DECK_NUM, this.syncDeckNumber, this);
    ProcessEventCenter.on(ProcessEvent.DRAW_CARDS, this.drawCards, this);
    ProcessEventCenter.on(ProcessEvent.DISCARD_CARDS, this.discardCards, this);
    ProcessEventCenter.on(ProcessEvent.UPDATE_CHARACTER_STATUS, this.updateCharacter, this);
    ProcessEventCenter.on(ProcessEvent.SEND_MESSAGE, this.playerSendMessage, this);
    ProcessEventCenter.on(ProcessEvent.PLAYER_DYING, this.playerDying, this);
    ProcessEventCenter.on(ProcessEvent.PLAYER_DIE_GIVE_CARD, this.playerDieGiveCard, this);
    ProcessEventCenter.on(ProcessEvent.PLAYER_WIN, this.gameOver, this);
    ProcessEventCenter.on(ProcessEvent.CARD_PLAYED, this.cardPlayed, this);
    ProcessEventCenter.on(ProcessEvent.CARD_IN_PROCESS, this.cardInProcess, this);
    ProcessEventCenter.on(ProcessEvent.CARD_HANDLE_FINISH, this.cardHandleFinish, this);
  }

  unregisterEvents() {
    ProcessEventCenter.off(ProcessEvent.INIT_GAME, this.init);
    ProcessEventCenter.off(ProcessEvent.GET_PHASE_DATA, this.onGetPhaseData);
    ProcessEventCenter.off(ProcessEvent.SYNC_DECK_NUM, this.syncDeckNumber);
    ProcessEventCenter.off(ProcessEvent.DRAW_CARDS, this.drawCards);
    ProcessEventCenter.off(ProcessEvent.DISCARD_CARDS, this.discardCards);
    ProcessEventCenter.off(ProcessEvent.UPDATE_CHARACTER_STATUS, this.updateCharacter);
    ProcessEventCenter.off(ProcessEvent.SEND_MESSAGE, this.playerSendMessage);
    ProcessEventCenter.off(ProcessEvent.PLAYER_DYING, this.playerDying);
    ProcessEventCenter.off(ProcessEvent.PLAYER_DIE_GIVE_CARD, this.playerDieGiveCard);
    ProcessEventCenter.off(ProcessEvent.PLAYER_WIN, this.gameOver);
    ProcessEventCenter.off(ProcessEvent.CARD_PLAYED, this.cardPlayed);
    ProcessEventCenter.off(ProcessEvent.CARD_IN_PROCESS, this.cardInProcess);
    ProcessEventCenter.off(ProcessEvent.CARD_HANDLE_FINISH, this.cardHandleFinish);
  }

  //初始化游戏
  init(data) {
    this.playerCount = data.playerCount;
    this.playerList = new Array(data.playerCount);

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
      (<unknown>data.identity) as IdentityType,
      (<unknown>data.secretTask) as SecretTaskType
    );
    this.selfPlayer.confirmIdentity(this.identity);

    GameEventCenter.emit(GameEvent.GAME_START, { playerList: this.playerList });
  }

  //回合改变
  onGetPhaseData(data: ProcessEventType.GetPhaseData) {
    //修改回合信息
    this.turnPlayerId = data.currentPlayerId;
    this.gamePhase = (<unknown>data.currentPhase) as GamePhase;

    //如果有传递的情报
    if (data.messagePlayerId) {
      this._messagePlayerId = data.messagePlayerId;
      this.messageDirection = (<unknown>data.messageDirection) as CardDirection;
      if (data.messageInTransmit && data.messageInTransmit.cardId !== this.messageInTransmit.id) {
        this.messageInTransmit = this.createMessage(data.messageInTransmit);
      }
      GameEventCenter.emit(GameEvent.MESSAGE_TRANSMISSION, {
        message: this.messageInTransmit,
        messagePlayer: this.playerList[data.messagePlayerId],
      });
    }
  }

  //卡组数量变化
  syncDeckNumber(data: ProcessEventType.SyncDeckNum) {
    this.deckCardCount = data.number;
    if (data.shuffled) {
      //播放洗牌动画（如果做了的话）
    }
  }

  //抽牌
  drawCards(data: ProcessEventType.DrawCards) {
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
    GameEventCenter.emit(GameEvent.PLAYER_DRAW_CARD, { cards: cardList });
  }

  //弃牌
  discardCards(data: ProcessEventType.DiscardCards) {
    const player = this.playerList[data.playerId];
    const cardIdList = data.cards.map((item) => item.cardId);
    const cardList = player.removeHandCard(cardIdList);
    GameEventCenter.emit(GameEvent.PLAYER_DISCARD_CARD, { cards: cardList });
  }

  //角色翻面
  updateCharacter(data: ProcessEventType.UpdateCharacterStatus) {
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
  playerSendMessage(data: ProcessEventType.SendMessage) {
    const player = this.playerList[data.senderId];
    const card = player.removeHandCard(data.cardId)[0];
    this.messageInTransmit = card;
    GameEventCenter.emit(GameEvent.PLAYER_SEND_MESSAGE, { player });
  }

  //濒死求澄清
  playerDying(data: ProcessEventType.PlayingDying) {
    this.playerList[data.playerId].status = PlayerStatus.DYING;
  }

  //死亡给牌
  playerDieGiveCard(data: ProcessEventType.PlayerDieGiveCard) {
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
    GameEventCenter.emit(GameEvent.PLAYER_GET_CARDS_FROM_OTHERS, { player: targetPlayer, from: player, cardList });
  }

  //游戏结束
  gameOver(data: ProcessEventType.PlayerWin) {
    GameEventCenter.emit(GameEvent.GAME_OVER, data);
  }

  cardPlayed(data: ProcessEventType.CardPlayed) {
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
        card = this.createHandCard(data.card);
      }
    }
    if (card instanceof Card) card.onPlay();
    this.cardOnPlay = card;
    GameEventCenter.emit(GameEvent.PLAYER_PALY_CARD, card);
  }

  cardInProcess(data: ProcessEventType.CardInProcess) {
    if (!this.cardOnPlay || this.cardOnPlay instanceof UnknownCard) {
      return;
    }
    const handlerName = data.handler || "onEffect";
    this.cardOnPlay[handlerName]();
  }

  cardHandleFinish() {
    this.cardOnPlay = null;
  }

  createHandCard(card?: card): GameCard {
    if (card) {
      return createCard({
        id: card.cardId,
        color: (<unknown>card.cardColor) as CardColor[],
        type: (<unknown>card.cardType) as CardType,
        direction: (<unknown>card.cardDir) as CardDirection,
        drawCardColor: (<unknown>card.whoDrawCard) as CardColor[],
        usage: CardUsage.HAND_CARD,
        lockable: card.canLock,
      });
    } else {
      return createUnknownCard();
    }
  }

  createMessage(card?: card): GameCard {
    if (card) {
      return createCard({
        id: card.cardId,
        color: (<unknown>card.cardColor) as CardColor[],
        type: (<unknown>card.cardType) as CardType,
        direction: (<unknown>card.cardDir) as CardDirection,
        drawCardColor: (<unknown>card.whoDrawCard) as CardColor[],
        usage: CardUsage.MESSAGE_CARD,
        status: CardStatus.FACE_DOWN,
        lockable: card.canLock,
      });
    } else {
      return createUnknownCard();
    }
  }
}
