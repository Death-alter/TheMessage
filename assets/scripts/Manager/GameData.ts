import { GameEvent, ProcessEvent } from "../Event/type";
import { GameEventCenter, ProcessEventCenter } from "../Event/EventTarget";
import { GameLogList } from "../Components/GameLog/GameLogList";
import { Player } from "../Components/Player/Player";
import { GamePhase } from "./type";
import { PlayerStatus } from "../Components/Player/type";
import * as ProcessEventType from "../Event/ProcessEventType";
import { Card } from "../Components/Card/Card";
import { card } from "../../protobuf/proto.js";
import { DataBasic } from "../DataBasic";
import { HandCardList } from "../Components/Container/HandCardList";
import { createCard, createUnknownCard } from "../Components/Card";
import { CardDirection, CardType, CardStatus, CardColor } from "../Components/Card/type";
import { createCharacterById } from "../Components/Chatacter";
import { CharacterStatus } from "../Components/Chatacter/type";
import { createIdentity } from "../Components/Identity";
import { IdentityType, SecretTaskType } from "../Components/Identity/type";
import { GameManager } from "./GameManager";

export class GameData extends DataBasic<GameManager> {
  public selfPlayer: Player;
  public cardBanned: boolean = false;
  public skillBanned: boolean = false;
  public playerCount: number;
  public playerList: Player[];
  public secretTaskList: SecretTaskType[];
  public messageInTransmit: Card | null = null;
  public messageDirection: CardDirection;
  public deckCardCount: number;
  public cardOnPlay: Card;
  public discardPile: Card[] = [];
  public banishedCards: Card[] = [];
  public dyingPlayer: Player = null; //等待澄清的玩家
  public bannedCardTypes: CardType[] = [];
  public gameLog: GameLogList;
  public handCardList: HandCardList;

  private _gamePhase: GamePhase;
  private _turnPlayerId: number;
  private _messagePlayerId: number = -1;
  private _lockedPlayer: Player;
  private _senderId: number = -1;

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
        this.lockedPlayer = null;
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
      if (this._lockedPlayer) {
        this._lockedPlayer.gameObject.locked = false;
      }
      this._lockedPlayer = null;
    }
  }

  get senderId() {
    return this._senderId;
  }

  get identity() {
    return this.selfPlayer.identityList[0];
  }

  constructor(gameObject?: GameManager) {
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
    ProcessEventCenter.off(ProcessEvent.INIT_GAME, this.init, this);
    ProcessEventCenter.off(ProcessEvent.GET_PHASE_DATA, this.onGetPhaseData, this);
    ProcessEventCenter.off(ProcessEvent.SYNC_DECK_NUM, this.syncDeckNumber, this);
    ProcessEventCenter.off(ProcessEvent.DRAW_CARDS, this.drawCards, this);
    ProcessEventCenter.off(ProcessEvent.DISCARD_CARDS, this.discardCards, this);
    ProcessEventCenter.off(ProcessEvent.UPDATE_CHARACTER_STATUS, this.updateCharacter, this);
    ProcessEventCenter.off(ProcessEvent.SEND_MESSAGE, this.playerSendMessage, this);
    ProcessEventCenter.off(ProcessEvent.CHOOSE_RECEIVE, this.playerChooseReceiveMessage, this);
    ProcessEventCenter.off(ProcessEvent.PLAYER_DYING, this.playerDying, this);
    ProcessEventCenter.off(ProcessEvent.PLAYER_BEFORE_DEATH, this.playerBeforeDeath, this);
    ProcessEventCenter.off(ProcessEvent.PLAYER_DIE_GIVE_CARD, this.playerDieGiveCard, this);
    ProcessEventCenter.off(ProcessEvent.PLAYER_DIE, this.playerDie, this);
    ProcessEventCenter.off(ProcessEvent.PLAYER_WIN, this.gameOver, this);
    ProcessEventCenter.off(ProcessEvent.CARD_PLAYED, this.cardPlayed, this);
    ProcessEventCenter.off(ProcessEvent.CARD_IN_PROCESS, this.cardInProcess, this);
  }

  //初始化游戏
  private init(data) {
    this.playerCount = data.playerCount;
    this.playerList = [];
    this.secretTaskList = data.secretTaskList;
    
    //创建所有角色
    for (let item of data.players) {
      const player = new Player({
        id: item.id,
        name: item.name,
        character: createCharacterById(item.characterId),
      });
      this.playerList.push(player);

      //加载角色技能
      for (let skill of player.character.skills) {
        skill.init(this, player);
      }
    }

    //自己的角色设置身份
    this.selfPlayer = this.playerList[0];
    this.selfPlayer.confirmIdentity(
      createIdentity((<number>data.identity) as IdentityType, (<number>data.secretTask) as SecretTaskType)
    );

    //手牌
    this.handCardList = new HandCardList();
  }

  //回合改变
  private onGetPhaseData(data: ProcessEventType.GetPhaseData) {
    //修改回合信息
    this.turnPlayerId = data.currentPlayerId;
    this.gamePhase = data.currentPhase;

    //卡牌结算完成
    if (this.cardOnPlay) {
      const card = this.cardOnPlay;
      this.cardOnPlay = null;
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
        if (!this.messageInTransmit || data.messageInTransmit.cardId !== this.messageInTransmit.id) {
          this.messageInTransmit = this.createMessage(data.messageInTransmit);
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
    this.playerAddHandCard(player, cardList);
    GameEventCenter.emit(GameEvent.PLAYER_DRAW_CARD, { player, cardList });
  }

  //弃牌
  private discardCards(data: ProcessEventType.DiscardCards) {
    const player = this.playerList[data.playerId];
    const cardList = this.playerRemoveHandCard(
      player,
      data.cards.map((card) => card)
    );

    GameEventCenter.emit(GameEvent.PLAYER_DISCARD_CARD, { player, cardList });
  }

  //角色翻面
  private updateCharacter(data: ProcessEventType.UpdateCharacterStatus) {
    if (data.characterId) {
      if (this.playerList[data.playerId].character.id === 0) {
        const character = createCharacterById(data.characterId);
        this.playerList[data.playerId].character = character;

        for (let skill of character.skills) {
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

  //有人传出情报
  private playerSendMessage(data: ProcessEventType.SendMessage) {
    const player = this.playerList[data.senderId];
    const targetPlayer = this.playerList[data.targetPlayerId];

    let card;
    if (data.card) {
      if (data.card instanceof Card) {
        card = data.card;
      } else {
        card = this.createCard(data.card);
      }
    } else {
      card = this.playerRemoveHandCard(player, data.cardId);
    }

    if (!card) return;

    this.messageInTransmit = card;
    this._senderId = data.senderId;
    if (data.lockPlayerIds.length) {
      this.lockedPlayer = this.playerList[data.lockPlayerIds[0]];
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
  private playerChooseReceiveMessage(data: ProcessEventType.ChooseReceive) {
    GameEventCenter.emit(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, {
      player: this.playerList[data.playerId],
      message: this.messageInTransmit,
    });
  }

  //玩家濒死
  private playerDying(data: ProcessEventType.PlayerDying) {
    const player = this.playerList[data.playerId];
    if (this.dyingPlayer !== player) {
      this.dyingPlayer = player;
      GameEventCenter.emit(GameEvent.PLAYER_DYING, { player: this.dyingPlayer });
    }
  }

  //玩家死亡前
  private playerBeforeDeath(data: ProcessEventType.PlayerBeforeDeath) {
    const player = this.playerList[data.playerId];
    this.dyingPlayer = null;
    player.status = PlayerStatus.DEAD;
    GameEventCenter.emit(GameEvent.PLAYER_BEFORE_DEATH, { player, loseGame: data.loseGame });
  }

  //玩家死亡
  private playerDie(data: ProcessEventType.PlayerDie) {
    const player = this.playerList[data.playerId];
    const messages = player.removeAllMessage();
    GameEventCenter.emit(GameEvent.PLAYER_DIE, { player, messages });
  }

  //死亡给牌
  private playerDieGiveCard(data: ProcessEventType.PlayerDieGiveCard) {
    const { cards, unknownCardCount, playerId, targetPlayerId } = data;
    if (cards.length || unknownCardCount !== 0) {
      const player = this.playerList[playerId];
      const targetPlayer = this.playerList[targetPlayerId];
      const cardList = this.playerRemoveHandCard(
        player,
        unknownCardCount > 0 ? new Array(unknownCardCount).fill(0) : cards.map((card) => card)
      );
      this.playerAddHandCard(targetPlayer, cardList);
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
          addScore: item.addScore,
          score: item.score,
          rank: item.rank,
        };
      }),
    });
    for (let player of this.playerList) {
      for (let skill of player.character.skills) {
        skill.dispose();
      }
    }
  }

  //打出卡牌
  private cardPlayed(data: ProcessEventType.CardPlayed) {
    let card: Card;
    const user = this.playerList[data.userId];
    if (data.isActual) {
      if (data.hasOwnProperty("card")) {
        card = this.playerRemoveHandCard(user, data.card);
        if (data.card === null) {
          card = this.createCardByType(data.cardType);
        }
      } else if (data.hasOwnProperty("cardId")) {
        card = this.playerRemoveHandCard(user, data.cardId);
        if (data.cardId === 0) {
          card = this.createCardByType(data.cardType);
        }
      }
    } else {
      card = this.createCardByType(data.cardType);
    }
    if (this.cardOnPlay) {
      GameEventCenter.once(GameEvent.AFTER_PLAYER_PLAY_CARD, () => {
        this.cardOnPlay = card;
        const eventData: any = { player: this.playerList[data.userId], card, cardType: data.cardType };
        if (data.targetPlayerId != null) {
          eventData.targetPlayer = this.playerList[data.targetPlayerId];
        }
        GameEventCenter.emit(GameEvent.PLAYER_PLAY_CARD, eventData);
      });
    } else {
      this.cardOnPlay = card;
      const eventData: any = { player: this.playerList[data.userId], card, cardType: data.cardType };
      if (data.targetPlayerId != null) {
        eventData.targetPlayer = this.playerList[data.targetPlayerId];
      }
      GameEventCenter.emit(GameEvent.PLAYER_PLAY_CARD, eventData);
    }
  }

  //卡牌效果处理
  private cardInProcess(data: ProcessEventType.CardInProcess) {
    if (!this.cardOnPlay) {
      return;
    }
    const handlerName = data.handler || "onEffect";
    this.cardOnPlay[handlerName](this, data.data);
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

  createCardByType(type: CardType) {
    return createCard({ type });
  }

  createMessage(card?: card, status: CardStatus = CardStatus.FACE_DOWN): Card {
    return this.createCard(card, CardStatus.FACE_DOWN);
  }

  playerAddHandCard(playerId: number, handCard: Card);
  playerAddHandCard(player: Player, handCard: Card);
  playerAddHandCard(playerId: number, handCards: Card[]);
  playerAddHandCard(player: Player, handCards: Card[]);
  playerAddHandCard(player: number | Player, handCard: Card | Card[]) {
    let p = <Player>player;
    if (typeof player === "number") {
      p = this.playerList[player];
    }
    if (handCard instanceof Array) {
      p.addHandCard(handCard.length);
      // if (p.id === 0) {
      //   handCard.forEach((card) => {
      //     this.handCardList.addData(card);
      //   });
      // }
    } else {
      p.addHandCard(1);
      // if (p.id === 0) {
      //   this.handCardList.addData(handCard);
      // }
    }
  }

  playerRemoveHandCard(playerId: number, card: card): Card;
  playerRemoveHandCard(player: Player, card: card): Card;
  playerRemoveHandCard(playerId: number, cards: card[]): Card[];
  playerRemoveHandCard(player: Player, cards: card[]): Card[];
  playerRemoveHandCard(playerId: number, card: number): Card;
  playerRemoveHandCard(player: Player, cardId: number): Card;
  playerRemoveHandCard(playerId: number, cardIds: number[]): Card[];
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
