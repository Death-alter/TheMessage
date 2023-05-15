import { GameEvent, ProcessEvent } from "../../../Event/type";
import { GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { Player } from "../../../Game/Player/Player";
import { Identity } from "../../../Game/Identity/Identity";
import { createCharacterById } from "../../../Game/Character";
import { CharacterStatus } from "../../../Game/Character/type";
import { createIdentity } from "../../../Game/Identity";
import { IdentityType, SecretTaskType } from "../../../Game/Identity/type";
import { GamePhase } from "../../../GameManager/type";
import { CardColor, CardDirection, CardOnEffectParams, CardStatus, CardType } from "../../../Game/Card/type";
import { createCard, createUnknownCard } from "../../../Game/Card";
import { PlayerStatus } from "../../../Game/Player/type";
import * as ProcessEventType from "../../../Event/ProcessEventType";
import { Card } from "../../../Game/Card/Card";
import { card } from "../../../../protobuf/proto";
import { DataBasic } from "../../../DataBasic";
import { GameUI } from "./GameUI";

export class GameData extends DataBasic<GameUI> {
  public selfPlayer: Player;
  public identity: Identity;
  public playerCount: number;
  public playerList: Player[];
  public messageInTransmit: Card | null = null;
  public messageDirection: CardDirection;
  public deckCardCount: number;
  public cardOnPlay: Card;
  public discardPile: Card[] = [];
  public banishedCards: Card[] = [];

  private _gamePhase: GamePhase;
  private _turnPlayerId: number;
  private _messagePlayerId: number = -1;
  private _lockedPlayer: Player;
  private _senderId: number = -1;
  private cardHandleFlag: boolean = false;

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
    if (oldId !== -1 && this.messageInTransmit && playerId !== -1) {
      GameEventCenter.emit(GameEvent.MESSAGE_TRANSMISSION, {
        sender: this.playerList[this._senderId],
        message: this.messageInTransmit,
        messagePlayer: this.playerList[playerId],
      });
    }
  }

  get lockedPlayer() {
    return this._lockedPlayer;
  }

  set lockedPlayer(player: Player) {
    if (player) {
      this._lockedPlayer = player;
      player.gameObject.locked = true;
    } else {
      this._lockedPlayer.gameObject.locked = false;
      this._lockedPlayer = null;
    }
  }

  get senderId() {
    return this._senderId;
  }

  constructor(gameObject?: GameUI) {
    super();
    if (gameObject) {
      this.gameObject = gameObject;
    }
  }

  registerEvents() {
    ProcessEventCenter.on(ProcessEvent.INIT_GAME, this.init, this);
    ProcessEventCenter.on(ProcessEvent.GET_PHASE_DATA, this.onGetPhaseData, this);
    ProcessEventCenter.once(
      ProcessEvent.DRAW_CARDS,
      (data: ProcessEventType.DrawCards) => {
        //设置座位号
        let i = data.playerId;
        let j = 0;
        do {
          this.playerList[i].seatNumber = j;
          i = (i + 1) % this.playerCount;
          ++j;
        } while (i !== data.playerId);
        GameEventCenter.emit(GameEvent.GAME_START, {
          firstPlayerId: data.playerId,
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
    ProcessEventCenter.on(ProcessEvent.CARD_PLAYED, this.cardPlayed, this);
    ProcessEventCenter.on(ProcessEvent.CARD_IN_PROCESS, this.cardInProcess, this);
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
    ProcessEventCenter.off(ProcessEvent.CARD_PLAYED, this.cardPlayed);
    ProcessEventCenter.off(ProcessEvent.CARD_IN_PROCESS, this.cardInProcess);
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

    //卡牌结算完成
    if (
      (data.currentPhase === GamePhase.MAIN_PHASE || data.currentPhase === GamePhase.FIGHT_PHASE) &&
      this.cardOnPlay
    ) {
      const card = this.cardOnPlay;
      this.cardOnPlay = null;
      GameEventCenter.emit(GameEvent.AFTER_PLAYER_PLAY_CARD, { card, flag: this.cardHandleFlag });
      this.cardHandleFlag = false;
    }

    //如果有传递的情报
    if (
      data.currentPhase === GamePhase.SEND_PHASE ||
      data.currentPhase === GamePhase.RECEIVE_PHASE ||
      data.currentPhase === GamePhase.FIGHT_PHASE
    ) {
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
        GameEventCenter.emit(GameEvent.PLAYER_RECEIVE_MESSAGE, {
          player,
          message: this.messageInTransmit,
        });
        this.messagePlayerId = -1;
        this._senderId = -1;
        this.messageInTransmit = null;
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
    const cardList: Card[] = [];

    if (data.unknownCardCount !== 0) {
      for (let i = 0; i < data.unknownCardCount; i++) {
        const card = this.createCard();
        cardList.push(card);
      }
    }
    if (data.cards && data.cards.length) {
      for (let item of data.cards) {
        const card = this.createCard(item);
        cardList.push(card);
      }
    }
    player.addHandCard(cardList);
    GameEventCenter.emit(GameEvent.PLAYER_DRAW_CARD, { player, cardList });
  }

  //弃牌
  private discardCards(data: ProcessEventType.DiscardCards) {
    const player = this.playerList[data.playerId];
    const cardList = [];
    for (const card of data.cards) {
      const removedCard = player.removeHandCard(card.cardId);
      if (removedCard) {
        cardList.push(removedCard);
      } else {
        player.removeHandCard(0);
        cardList.push(this.createCard(card));
      }
    }
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
    const card = player.removeHandCard(data.cardId);
    this.messageInTransmit = card;
    this._senderId = data.senderId;
    if (data.lockPlayerIds.length) {
      this.lockedPlayer = this.playerList[data.lockPlayerIds[0]];
    }

    if (card instanceof Card) {
      card.onSend();
    }
    GameEventCenter.emit(GameEvent.PLAYER_SEND_MESSAGE, {
      player,
      message: card,
      targetPlayer,
      direction: data.direction,
      lockedPlayer: this.lockedPlayer,
    });
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
      GameEventCenter.emit(GameEvent.PLAYER_GIVE_CARD, { player, targetPlayer, cardList });
    }
  }

  //游戏结束
  private gameOver(data: ProcessEventType.PlayerWin) {
    GameEventCenter.emit(GameEvent.GAME_OVER, {
      players: data.players.map((item) => {
        return {
          player: this.playerList[item.playerId],
          identity: createIdentity(item.identity, item.secretTask),
          isWinner: item.isWinner,
          isDeclarer: item.isDeclarer,
        };
      }),
    });
  }

  //打出卡牌
  private cardPlayed(data: ProcessEventType.CardPlayed) {
    let card: Card;
    const user = this.playerList[data.userId];
    if (data.card) {
      card = user.removeHandCard(data.card.cardId);
    } else {
      card = user.removeHandCard(data.cardId);
    }

    if (!card) {
      user.removeHandCard(0);
    }

    if (!card || card.type === CardType.UNKNOWN) {
      if (data.card) {
        card = this.createCard(data.card);
      } else {
        card = this.createCardByType(data.cardType);
      }
    }

    card.onPlay(this, data);
    this.cardOnPlay = card;
    const eventData: any = { player: this.playerList[data.userId], card };
    if (data.targetPlayerId != null) {
      eventData.targetPlayer = this.playerList[data.targetPlayerId];
    }
    GameEventCenter.emit(GameEvent.PLAYER_PLAY_CARD, eventData);
  }

  //卡牌效果处理
  private cardInProcess(data: ProcessEventType.CardInProcess) {
    if (!this.cardOnPlay) {
      return;
    }
    const handlerName = data.handler || "onEffect";

    this.cardHandleFlag = !!this.cardOnPlay[handlerName](this, data.data);
  }

  createCard(card?: card, status?: CardStatus): Card {
    if (card) {
      return createCard({
        id: card.cardId,
        color: (<number[]>card.cardColor) as CardColor[],
        type: (<number>card.cardType) as CardType,
        status,
        direction: (<number>card.cardDir) as CardDirection,
        drawCardColor: (<number[]>card.whoDrawCard) as CardColor[],
        secretColor: (<number[]>card.secretColor) as CardColor[],
        lockable: card.canLock,
      });
    } else {
      return createUnknownCard();
    }
  }

  createCardByType(type) {
    return createCard({ type });
  }

  createMessage(card?: card, status: CardStatus = CardStatus.FACE_DOWN): Card {
    return this.createCard(card, CardStatus.FACE_DOWN);
  }
}
