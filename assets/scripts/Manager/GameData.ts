import { DataEvent, GameEvent } from "../Event/type";
import { DataEventCenter, GameEventCenter } from "../Event/EventTarget";
import { Player } from "../Components/Player/Player";
import { GamePhase } from "./type";
import { Card } from "../Components/Card/Card";
import { HandCardList } from "../Components/Container/HandCardList";
import { CardColor, CardDirection, CardStatus, CardType } from "../Components/Card/type";
import { IdentityType, SecretTaskType } from "../Components/Identity/type";
import { Skill } from "../Components/Skill/Skill";
import { card } from "../../protobuf/proto.js";
import { InitGame } from "../Event/ProcessEventType";
import { createCharacterById } from "../Components/Character";
import { createIdentity } from "../Components/Identity";
import * as DataEventType from "../Event/DataEventType";
import { createCard, createUnknownCard } from "../Components/Card";
import { CharacterStatus } from "../Components/Character/type";
import { PlayerStatus } from "../Components/Player/type";
import { DataBasic } from "../DataBasic";
import { GameManager } from "./GameManager";
import { GameLogList } from "../Components/GameLog/GameLogList";

export class GameData extends DataBasic<GameManager> {
  //引用其他类
  gameLog: GameLogList;

  //对局信息
  private _playerCount: number = 0;
  private _deckCardCount: number = 0;
  private _discardPile: Card[] = [];
  private _banishedCards: Card[] = [];
  private _secretTaskList: SecretTaskType[];

  get playerCount() {
    return this._playerCount;
  }

  set deckCardCount(count: number) {
    this._deckCardCount = count;
  }

  get deckCardCount() {
    return this._deckCardCount;
  }

  get secretTaskList() {
    return this._secretTaskList;
  }

  //玩家信息
  private _playerList: Player[] = [];
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

  /**正在使用的卡牌 */
  private _cardOnPlay: Card;

  get cardOnPlay() {
    return this._cardOnPlay;
  }

  set cardOnPlay(card: Card) {
    this._cardOnPlay = card;
  }

  /**正在使用的技能 */
  private _skillOnUse: Skill;
  /**已经使用完，正在生效的技能 */
  private _skillsOnEffect: Skill[];

  //正在传递的情报信息
  private _senderId: number = -1;
  private _messagePlayerId: number = -1;
  private _lockedPlayerId: number = -1;
  private _messageInTransmit: Card | null = null;
  private _messageDirection: CardDirection;

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
      this.lockedPlayer && (this.lockedPlayer.entity.locked = false);
      this._lockedPlayerId = -1;
    } else {
      this._lockedPlayerId = playerId;
      this.lockedPlayer && (this.lockedPlayer.entity.locked = true);
    }
  }

  get messageInTransmit() {
    return this._messageInTransmit;
  }
  set messageInTransmit(message: Card) {
    this._messageInTransmit = message;
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
    return this._dyingPlayerId === -1 ? null : this._playerList[this._dyingPlayerId];
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

  /**
   * 生成GameData类
   * @param option
   * @param option.playerCount 本局游戏的总人数
   * @param option.identity 自己的身份
   * @param option.secretTask 自己的神秘人任务
   * @param option.players 玩家列表
   */
  constructor(option: InitGame) {
    super();
    this.init(option);

    //注册事件
    DataEventCenter.on(DataEvent.SYNC_PHASE_DATA, this.onSyncPhaseData, this);
    DataEventCenter.once(
      DataEvent.DRAW_CARDS,
      (data: DataEventType.DrawCards) => {
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
      this,
    );
    DataEventCenter.on(DataEvent.SYNC_DECK_NUM, this.syncDeckNumber, this);
    DataEventCenter.on(DataEvent.DRAW_CARDS, this.drawCards, this);
    DataEventCenter.on(DataEvent.DISCARD_CARDS, this.discardCards, this);
    DataEventCenter.on(DataEvent.UPDATE_CHARACTER_STATUS, this.updateCharacter, this);
    DataEventCenter.on(DataEvent.SEND_MESSAGE, this.playerSendMessage, this);
    DataEventCenter.on(DataEvent.CHOOSE_RECEIVE_MESSAGE, this.playerChooseReceiveMessage, this);
    DataEventCenter.on(DataEvent.PLAYER_DYING, this.playerDying, this);
    DataEventCenter.on(DataEvent.PLAYER_BEFORE_DEATH, this.playerBeforeDeath, this);
    DataEventCenter.on(DataEvent.PLAYER_DIE_GIVE_CARD, this.playerDieGiveCard, this);
    DataEventCenter.on(DataEvent.PLAYER_DIE, this.playerDie, this);
    DataEventCenter.on(DataEvent.PLAYER_WIN, this.gameOver, this);
    DataEventCenter.on(DataEvent.CARD_PLAYED, this.cardPlayed, this);
    DataEventCenter.on(DataEvent.CARD_IN_PROCESS, this.cardInProcess, this);
    DataEventCenter.on(DataEvent.GM_ADD_MESSAGE, this.GmAddMeassgeCards, this);
  }

  /**
   * 初始化游戏数据
   * @param option
   * @param option.playerCount 本局游戏的总人数
   * @param option.identity 自己的身份
   * @param option.secretTask 自己的神秘人任务
   * @param option.players 玩家列表
   */
  private init(option: InitGame) {
    this._playerCount = option.playerCount;
    this._secretTaskList = option.secretTaskList;

    //创建所有角色
    for (const item of option.players) {
      const player = new Player({
        id: item.id,
        name: item.name,
        character: createCharacterById(item.characterId),
      });
      this.playerList.push(player);

      //加载角色技能
      for (const skill of player.character.skills) {
        skill.init(this, player);
      }
    }

    //设置身份
    this.selfPlayer.confirmIdentity(
      createIdentity((<number>option.identity) as IdentityType, (<number>option.secretTask) as SecretTaskType),
    );
  }

  /**
   * 同步回合、阶段信息
   * @param data
   */
  private onSyncPhaseData(data: DataEventType.SyncPhaseData) {
    //修改回合信息
    this.turnPlayerId = data.currentPlayerId;
    this.gamePhase = data.currentPhase;

    //卡牌结算完成
    if (this._cardOnPlay) {
      const card = this._cardOnPlay;
      this._cardOnPlay = null;
      if (card) {
        GameEventCenter.emit(GameEvent.AFTER_PLAYER_PLAY_CARD, { card });
      }
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
        if (!this._messageInTransmit || data.messageInTransmit.cardId !== this._messageInTransmit.id) {
          this._messageInTransmit = this.createMessage(data.messageInTransmit);
        }
      }

      if (this.gamePhase === GamePhase.RECEIVE_PHASE && !data.needWaiting && this.messageInTransmit) {
        //接收阶段
        const player = this.playerList[data.messagePlayerId];
        if (player.isAlive) {
          GameEventCenter.emit(GameEvent.PLAYER_RECEIVE_MESSAGE, {
            player,
            message: this.messageInTransmit,
          });
          player.addMessage(this.messageInTransmit);
        } else {
          GameEventCenter.emit(GameEvent.MESSAGE_REMOVED, this.messageInTransmit);
        }
        this._messageInTransmit = null;
      }
    }
  }

  /**
   * 同步牌堆剩余卡牌数量
   * @param data
   */
  private syncDeckNumber(data: DataEventType.SyncDeckNum) {
    this.deckCardCount = data.number;
    GameEventCenter.emit(GameEvent.DECK_CARD_NUMBER_CHANGE, { number: data.number });
    if (data.shuffled) {
      this._discardPile = [];
      GameEventCenter.emit(GameEvent.DECK_SHUFFLED);
    }
  }

  /**
   * 玩家抽牌
   * @param data
   */
  private drawCards(data: DataEventType.DrawCards) {
    const player = this.playerList[data.playerId];
    const cardList: Card[] = [];

    if (data.unknownCardCount !== 0) {
      for (let i = 0; i < data.unknownCardCount; i++) {
        const card = this.createCard();
        cardList.push(card);
      }
    }
    if (data.cards && data.cards.length) {
      for (const item of data.cards) {
        const card = this.createCard(item);
        cardList.push(card);
      }
    }
    this.playerAddHandCard(player, cardList);
    GameEventCenter.emit(GameEvent.PLAYER_DRAW_CARD, { player, cardList });
  }

  /**
   * GM命令添加情报
   * @param data
   */
  private GmAddMeassgeCards(data: DataEventType.GmAddMessage) {
    const target = this.playerList[data.targetPlayerId];
    const messageCards = data.messageCard.map((card) => this.createMessage(card));
    target.addMessage(messageCards);
    GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
      player: target,
      message: messageCards,
    });
  }

  /**
   * 玩家弃牌
   * @param data
   */
  private discardCards(data: DataEventType.DiscardCards) {
    const player = this.playerList[data.playerId];
    const cardList = this.playerRemoveHandCard(
      player,
      data.cards.map((card) => card),
    );

    GameEventCenter.emit(GameEvent.PLAYER_DISCARD_CARD, { player, cardList });
  }

  /**
   * 角色翻面
   * @param data
   */
  private updateCharacter(data: DataEventType.UpdateCharacterStatus) {
    if (data.characterId) {
      if (this.playerList[data.playerId].character.id === 0) {
        const character = createCharacterById(data.characterId);
        this.playerList[data.playerId].character = character;

        for (const skill of character.skills) {
          skill.init(this, this.playerList[data.playerId]);
        }
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

  /**
   * 玩家传出情报
   * @param data
   */
  private playerSendMessage(data: DataEventType.SendMessage) {
    const player = this.playerList[data.senderId];
    const targetPlayer = this.playerList[data.targetPlayerId];

    let card;
    if (data.card) {
      if (data.card instanceof Card) {
        card = data.card;
      } else {
        if (data.fromHand) {
          card = this.playerRemoveHandCard(player, data.card);
        } else {
          card = this.createCard(data.card);
        }
      }
    } else {
      card = this.playerRemoveHandCard(player, data.cardId);
    }

    if (!card) return;

    this._messageInTransmit = card;
    this._senderId = data.senderId;
    if (data.lockPlayerIds.length) {
      this.lockedPlayerId = data.lockPlayerIds[0];
    } else {
      this.lockedPlayerId = null;
    }
    if (!data.card && data.senderId === 0) {
      card.status = CardStatus.FACE_DOWN;
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
  private playerChooseReceiveMessage(data: DataEventType.ChooseReceive) {
    GameEventCenter.emit(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, {
      player: this.playerList[data.playerId],
      message: this.messageInTransmit,
    });
  }

  //玩家濒死
  private playerDying(data: DataEventType.PlayerDying) {
    if (this.dyingPlayerId === -1) {
      this._dyingPlayerId = data.playerId;
      GameEventCenter.emit(GameEvent.PLAYER_DYING, { player: this.dyingPlayer });
    }
  }

  //玩家死亡前
  private playerBeforeDeath(data: DataEventType.PlayerBeforeDeath) {
    const player = this.playerList[data.playerId];
    this._dyingPlayerId = -1;
    player.status = PlayerStatus.DEAD;
    GameEventCenter.emit(GameEvent.PLAYER_BEFORE_DEATH, { player, loseGame: data.loseGame });
  }

  //玩家死亡
  private playerDie(data: DataEventType.PlayerDie) {
    const player = this.playerList[data.playerId];
    const messages = player.removeAllMessage();
    GameEventCenter.emit(GameEvent.PLAYER_DIE, { player, messages });
  }

  //死亡给牌
  private playerDieGiveCard(data: DataEventType.PlayerDieGiveCard) {
    const { cards, unknownCardCount, playerId, targetPlayerId } = data;
    if (cards.length || unknownCardCount !== 0) {
      const player = this.playerList[playerId];
      const targetPlayer = this.playerList[targetPlayerId];
      const cardList = this.playerRemoveHandCard(
        player,
        unknownCardCount > 0 ? new Array(unknownCardCount).fill(0) : cards.map((card) => card),
      );
      this.playerAddHandCard(targetPlayer, cardList);
      GameEventCenter.emit(GameEvent.PLAYER_GIVE_CARD, { player, targetPlayer, cardList });
    }
  }

  //游戏结束
  private gameOver(data: DataEventType.PlayerWin) {
    GameEventCenter.emit(GameEvent.GAME_OVER, {
      players: data.players.map((item) => {
        return {
          player: this.playerList[item.playerId],
          identity: createIdentity(item.identity, item.secretTask),
          isWinner: item.isWinner,
          isDeclarer: item.isDeclarer,
          addScore: item.addScore,
          score: item.score,
          rank: item.rank,
        };
      }),
    });
    for (const player of this.playerList) {
      for (const skill of player.character.skills) {
        skill.dispose();
      }
    }
  }

  //使用卡牌
  private cardPlayed(data: DataEventType.CardPlayed) {
    let card: Card;
    const user = this.playerList[data.userId];
    if (data.isActual) {
      if (data.hasOwnProperty("card")) {
        card = this.playerRemoveHandCard(user, data.card);
        if (data.card === null || card.type !== data.cardType) {
          card = this.createCardByType(data.cardType);
        }
      } else if (data.hasOwnProperty("cardId")) {
        card = this.playerRemoveHandCard(user, data.cardId);
        if (data.cardId === 0 || card.type !== data.cardType) {
          card = this.createCardByType(data.cardType);
        }
      }
    } else {
      card = this.createCardByType(data.cardType);
    }

    if (this._cardOnPlay) {
      GameEventCenter.once(GameEvent.AFTER_PLAYER_PLAY_CARD, () => {
        this._cardOnPlay = card;
        const eventData: any = { player: this.playerList[data.userId], card, cardType: data.cardType };
        if (data.targetPlayerId != null) {
          eventData.targetPlayer = this.playerList[data.targetPlayerId];
        }
        GameEventCenter.emit(GameEvent.PLAYER_PLAY_CARD, eventData);
      });
    } else {
      this._cardOnPlay = card;
      const eventData: any = { player: this.playerList[data.userId], card, cardType: data.cardType };
      if (data.targetPlayerId != null) {
        eventData.targetPlayer = this.playerList[data.targetPlayerId];
      }
      GameEventCenter.emit(GameEvent.PLAYER_PLAY_CARD, eventData);
    }
  }

  //卡牌效果处理
  private cardInProcess(data: DataEventType.CardInProcess) {
    if (!this._cardOnPlay) {
      return;
    }
    const handlerName = data.handler || "onEffect";
    this._cardOnPlay[handlerName](this, data.data);
  }

  getPlayerNeighbors(player: Player): Player[];
  getPlayerNeighbors(playerId: number): Player[];
  getPlayerNeighbors(player: Player | number) {
    if (!(player instanceof Player)) {
      player = this.playerList[player];
    }
    const arr = [];
    let i = (player.id + 1) % this.playerList.length;
    while (i !== player.id) {
      if (this.playerList[i].isAlive) {
        arr.push(this.playerList[i]);
        break;
      }
      i = (i + 1) % this.playerList.length;
    }
    i = (player.id - 1 + this.playerList.length) % this.playerList.length;
    while (i !== player.id) {
      if (this.playerList[i].isAlive) {
        if (arr.indexOf(this.playerList[i]) === -1) {
          arr.push(this.playerList[i]);
        }
        break;
      }
      i = (i - 1 + this.playerList.length) % this.playerList.length;
    }
    return arr;
  }

  /**
   * 根据服务端卡牌数据创建一个卡牌对象
   * @param card 服务端card数据
   * @param status 卡牌朝向
   * @returns 创建的Card对象
   */
  createCard(card?: card, status?: CardStatus): Card {
    if (card) {
      return createCard({
        id: card.cardId,
        color: (<number[]>card.cardColor) as CardColor[],
        type: (<number>card.cardType) as CardType,
        status,
        direction: (<number>card.cardDir) as CardDirection,
        drawCardColor: (<number[]>card.whoDrawCard) as IdentityType[],
        secretColor: (<number[]>card.secretColor) as CardColor[],
        lockable: card.canLock,
      });
    } else {
      return createUnknownCard();
    }
  }

  /**
   * 根据卡牌类型创建一个卡牌对象
   * @param type 卡牌类型
   * @returns 创建的Card对象
   */
  createCardByType(type: CardType) {
    return createCard({ type });
  }

  /**
   * 根据一张已有卡牌生成指定类型的卡牌，保留原卡牌类型以外的所有信息，通常用于把一张卡当做另一张卡使用
   * @param card 一个Card对象
   * @param type 卡牌类型
   * @returns 新的Card对象
   */
  createCardWithNewType(card: Card, type: CardType) {
    return createCard({
      id: card.id,
      color: card.color,
      type: type,
      status: card.status,
      direction: card.direction,
      lockable: card.lockable,
    });
  }

  /**
   * 创建一张情报，默认为面朝下
   * @param card 服务端card数据
   * @param status 卡牌朝向
   * @returns
   */
  createMessage(card?: card, status: CardStatus = CardStatus.FACE_DOWN): Card {
    return this.createCard(card, status);
  }

  /**
   * 把一张卡加入一名玩家的手牌
   * @param playerId 玩家id
   * @param handCard 加入的那张牌
   */
  playerAddHandCard(playerId: number, handCard: Card);
  /**
   * 把一张卡加入一名玩家的手牌
   * @param player 玩家的Player对象
   * @param handCard 加入的那张牌
   */
  playerAddHandCard(player: Player, handCard: Card);
  /**
   * 把一张卡加入一名玩家的手牌
   * @param playerId 玩家id
   * @param handCards 加入的牌组成的数组
   */
  playerAddHandCard(playerId: number, handCards: Card[]);
  /**
   * 把一张卡加入一名玩家的手牌
   * @param player 玩家的Player对象
   * @param handCards 加入的牌组成的数组
   */
  playerAddHandCard(player: Player, handCards: Card[]);
  playerAddHandCard(player: number | Player, handCard: Card | Card[]) {
    let p = <Player>player;
    if (typeof player === "number") {
      p = this.playerList[player];
    }
    if (handCard instanceof Array) {
      p.addHandCard(handCard.length);
    } else {
      p.addHandCard(1);
    }
  }

  /**
   * 从一名玩家的手牌中移除一张牌
   * @param playerId 玩家id
   * @param card 服务端移除的那张卡牌数据
   * @returns 移除的那张卡的Card对象
   */
  playerRemoveHandCard(playerId: number, card: card): Card;
  /**
   * 从一名玩家的手牌中移除一张牌
   * @param player 玩家的Player对象
   * @param card 服务端移除的那张卡牌数据
   * @returns 移除的那张卡的Card对象
   */
  playerRemoveHandCard(player: Player, card: card): Card;
  /**
   * 从一名玩家的手牌中移除多张手牌
   * @param playerId 玩家id
   * @param card 服务端移除的那些卡牌数据数组
   * @returns 移除的卡牌对象的数组
   */
  playerRemoveHandCard(playerId: number, cards: card[]): Card[];
  /**
   * 从一名玩家的手牌中移除多张手牌
   * @param player 玩家的Player对象
   * @param card 服务端移除的那些卡牌数据数组
   * @returns 移除的卡牌对象的数组
   */
  playerRemoveHandCard(player: Player, cards: card[]): Card[];
  /**
   * 从一名玩家的手牌中移除一张牌
   * @param playerId 玩家id
   * @param cardId 要移除的卡牌id
   * @returns 移除的那张卡的Card对象
   */
  playerRemoveHandCard(playerId: number, cardId: number): Card;
  /**
   * 从一名玩家的手牌中移除一张牌
   * @param player 玩家的Player对象
   * @param cardId 要移除的卡牌id
   * @returns 移除的那张卡的Card对象
   */
  playerRemoveHandCard(player: Player, cardId: number): Card;
  /**
   * 从一名玩家的手牌中移除多张手牌
   * @param playerId 玩家id
   * @param cardIds 要移除的卡牌id数组
   * @returns 移除的卡牌对象的数组
   */
  playerRemoveHandCard(playerId: number, cardIds: number[]): Card[];
  /**
   * 从一名玩家的手牌中移除多张手牌
   * @param player 玩家的Player对象
   * @param cardIds 要移除的卡牌id数组
   * @returns 移除的卡牌对象的数组
   */
  playerRemoveHandCard(player: Player, cardIds: number[]): Card[];
  playerRemoveHandCard(player: number | Player, card: number | number[] | card | card[]): Card | Card[] {
    let p = <Player>player;
    if (typeof player === "number") {
      p = this.playerList[player];
    }
    let cards, isArray;
    if (card instanceof Array) {
      cards = card;
      isArray = true;
    } else {
      cards = [card];
      isArray = false;
    }
    p.removeHandCard(cards.length);

    if (p.id === 0) {
      if (typeof cards[0] === "number") {
        const arr = (<number[]>cards).map((card) => this.handCardList.removeData(card));
        return isArray ? arr : arr[0];
      } else {
        const arr = (<card[]>cards).map((card) => this.handCardList.removeData(card.cardId));
        return isArray ? arr : arr[0];
      }
    } else {
      if (typeof cards[0] === "number") {
        const arr = cards.map(() => this.createCard());
        return isArray ? arr : arr[0];
      } else {
        const arr = cards.map((card) => this.createCard(card));
        return isArray ? arr : arr[0];
      }
    }
  }
}
