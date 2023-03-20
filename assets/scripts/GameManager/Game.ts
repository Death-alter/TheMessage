import { _decorator, Component } from "cc";
import { GameEvent, ProcessEvent } from "../Event/type";
import { GameEventCenter, ProcessEventCenter } from "../Event/EventTarget";
import { Player } from "../Game/Player/Player";
import { Identity } from "../Game/Identity/Identity";
import {
  init_toc,
  notify_phase_toc,
  card,
  sync_deck_num_toc,
  add_card_toc,
  discard_card_toc,
  notify_role_update_toc,
  send_message_card_toc,
  wait_for_cheng_qing_toc,
  notify_die_give_card_toc,
  notify_winner_toc,
  use_po_yi_toc,
} from "../../protobuf/proto";
import { createCharacterById } from "../Game/Character";
import { CharacterStatus, CharacterType } from "../Game/Character/type";
import { createIdentity } from "../Game/Identity";
import { IdentityType, SecretTaskType } from "../Game/Identity/type";
import { GamePhase } from "./type";
import { CardColor, CardDirection, CardStatus, CardType, CardUsage, GameCard } from "../Game/Card/type";
import { createCard, createUnknownCard } from "../Game/Card";
import { PlayerStatus } from "../Game/Player/type";
import { Card } from "../Game/Card/Card";

const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  public selfPlayer: Player;
  public identity: Identity;
  public playerCount: number;
  public playerList: Player[];
  public messageInTransmit: GameCard | null = null;
  public messageDirection: CardDirection;
  public deckCardCount: number;

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

  onEnable() {
    ProcessEventCenter.on(ProcessEvent.INIT_GAME, this.init, this);
    ProcessEventCenter.on(ProcessEvent.GET_PHASE_DATA, this.onGetPhaseData, this);
    ProcessEventCenter.on(ProcessEvent.SYNC_DECK_NUM, this.syncDeckNumber, this);
    ProcessEventCenter.on(ProcessEvent.ADD_CARDS, this.drawCards, this);
    ProcessEventCenter.on(ProcessEvent.DISCARD_CARDS, this.discardCards, this);
    ProcessEventCenter.on(ProcessEvent.UPDATE_CHARACTER, this.updateCharacter, this);
    ProcessEventCenter.on(ProcessEvent.SEND_MESSAGE, this.playerSendMessage, this);
    ProcessEventCenter.on(ProcessEvent.WAIT_FOR_CHENG_QING, this.playerDying, this);
    ProcessEventCenter.on(ProcessEvent.PLAYER_DIE_GIVE_CARD, this.playerDieGiveCard, this);
    ProcessEventCenter.on(ProcessEvent.PLAYER_WIN, this.gameOver, this);

    ProcessEventCenter.on(
      ProcessEvent.USE_PO_YI,
      (data: use_po_yi_toc) => {
        this.onCardUse({
          userId: data.playerId,
          cardId: data.card.CardId,
        });
      },
      this
    );

    // GameEventCenter.on(GameEvent.GAME_TURN_CHANGE, (data) => {});
    // GameEventCenter.on(GameEvent.GAME_TURN_START, (data) => {});
    // GameEventCenter.on(GameEvent.GAME_TURN_END, (data) => {});
    // GameEventCenter.on(GameEvent.GAME_PHASE_CHANGE, (data) => {});
    // GameEventCenter.on(GameEvent.DRAW_PHASE_START, (data) => {});
    // GameEventCenter.on(GameEvent.DRAW_PHASE_END, (data) => {});
    // GameEventCenter.on(GameEvent.MAIN_PHASE_START, (data) => {});
    // GameEventCenter.on(GameEvent.MAIN_PHASE_END, (data) => {});
    // GameEventCenter.on(GameEvent.SEND_PHASE_START, (data) => {});
    // GameEventCenter.on(GameEvent.SEND_PHASE_END, (data) => {});
    // GameEventCenter.on(GameEvent.FIGHT_PHASE_START, (data) => {});
    // GameEventCenter.on(GameEvent.FIGHT_PHASE_END, (data) => {});
    // GameEventCenter.on(GameEvent.RECEIVE_PHASE_START, (data) => {});
    // GameEventCenter.on(GameEvent.RECEIVE_PHASE_END, (data) => {});
  }

  onDisable() {
    ProcessEventCenter.off(ProcessEvent.INIT_GAME, this.init);
    ProcessEventCenter.off(ProcessEvent.GET_PHASE_DATA, this.onGetPhaseData);
  }

  //初始化游戏
  init(data: init_toc) {
    this.playerCount = data.playerCount;
    this.playerList = new Array(data.playerCount);

    //创建所有角色
    for (let i = 0; i < data.playerCount; i++) {
      this.playerList.push(
        new Player({
          id: i,
          name: data.names[i],
          character: createCharacterById((<unknown>data.roles[i]) as CharacterType),
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
  onGetPhaseData(data: notify_phase_toc) {
    //修改回合信息
    this.turnPlayerId = data.currentPlayerId;
    this.gamePhase = (<unknown>data.currentPhase) as GamePhase;

    //如果有传递的情报
    if (data.messagePlayerId) {
      this._messagePlayerId = data.messagePlayerId;
      this.messageDirection = (<unknown>data.messageCardDir) as CardDirection;
      if (data.messageCard && data.messageCard.Id !== this.messageInTransmit.id) {
        this.messageInTransmit = this.createMessage(data.messageCard);
      }
    }
  }

  //卡组数量变化
  syncDeckNumber(data: sync_deck_num_toc) {
    this.deckCardCount = data.num;
    if (data.shuffled) {
      //播放洗牌动画（如果做了的话）
    }
  }

  //抽牌
  drawCards(data: add_card_toc) {
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
  discardCards(data: discard_card_toc) {
    const player = this.playerList[data.playerId];
    const cardIdList = data.cards.map((item) => item.id);
    const cardList = player.removeHandCard(cardIdList);
    GameEventCenter.emit(GameEvent.PLAYER_DISCARD_CARD, { cards: cardList });
  }

  //角色翻面
  updateCharacter(data: notify_role_update_toc) {
    if (data.role) {
      if (this.playerList[data.playerId].character.id === 0) {
        const character = createCharacterById((<unknown>data.role) as CharacterType);
        this.playerList[data.playerId].character = character;
      }
      this.playerList[data.playerId].character.status = CharacterStatus.FACE_UP;
    } else {
      this.playerList[data.playerId].character.status = CharacterStatus.FACE_DOWN;
    }
    GameEventCenter.emit(GameEvent.CHARACTER_STATUS_CHANGE, {
      playerId: data.playerId,
      status: this.playerList[data.playerId].character.status,
    });
  }

  //有人传出情报
  playerSendMessage(data: send_message_card_toc) {
    const player = this.playerList[data.senderId];
    const card = player.removeHandCard(data.cardId)[0];
    this.messageInTransmit = card;
    GameEventCenter.emit(GameEvent.PLAYER_SEND_MESSAGE, { player });
  }

  //濒死求澄清
  playerDying(data: wait_for_cheng_qing_toc) {
    this.playerList[data.diePlayerId].status = PlayerStatus.DYING;
  }

  //死亡给牌
  playerDieGiveCard(data: notify_die_give_card_toc) {
    const player = this.playerList[data.playerId];
    const targetPlayer = this.playerList[data.targetPlayerId];
    let cards = [];
    if (data.unknownCardCount) {
      for (let i = 0; i < data.unknownCardCount; i++) {
        cards.push(0);
      }
    } else {
      cards = data.card.map((item) => item.id);
    }

    const cardList = player.removeHandCard(cards);
    targetPlayer.addHandCard(cardList);
    GameEventCenter.emit(GameEvent.PLAYER_DIE_GIVE_CARD, { player, targetPlayer, cardList });
    GameEventCenter.emit(GameEvent.PLAYER_GET_CARDS_FROM_OTHERS, { player: targetPlayer, from: player, cardList });
  }

  onCardUse(data) {
    GameEventCenter.emit(GameEvent.PLAYER_PALY_CARD, data);
  }

  //游戏结束
  gameOver(data: notify_winner_toc) {
    GameEventCenter.emit(GameEvent.GAME_OVER, {
      declarePlayer: data.declarePlayerIds.map((id) => this.playerList[id]),
      winners: data.winnerIds.map((id) => this.playerList[id]),
    });
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
