import { _decorator, Component, Node, Prefab, instantiate, Layout, Label } from "cc";
import { GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, ProcessEvent } from "../../../Event/type";
import { CardObject } from "../../../Game/Card/CardObject";
import { CardGroupObject } from "../../../Game/Container/CardGroupObject";
import { HandCardContianer } from "../../../Game/Container/HandCardContianer";
import { CardAction } from "../../../GameManager/CardAction";
import GamePools from "../../../GameManager/GamePools";
import { Tooltip } from "../../../GameManager/Tooltip";
import * as GameEventType from "../../../Event/GameEventType";
import * as ProcessEventType from "../../../Event/ProcessEventType";
import { HandCardList } from "../../../Game/Container/HandCardList";
import { PlayerObject } from "../../../Game/Player/PlayerObject";
import { GameObject } from "../../../GameObject";
import { GameData } from "./GameData";

const { ccclass, property } = _decorator;

@ccclass("GameUI")
export class GameUI extends GameObject<GameData> {
  @property(Prefab)
  playerPrefab: Prefab | null = null;
  @property(Prefab)
  cardPrefab: Prefab | null = null;
  @property(Node)
  leftPlayerNodeList: Node | null = null;
  @property(Node)
  topPlayerNodeList: Node | null = null;
  @property(Node)
  rightPlayerNodeList: Node | null = null;
  @property(Node)
  deckText: Node | null = null;
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;
  @property(Node)
  handCardUI: Node | null = null;
  @property(Node)
  cardGroupNode: Node | null = null;
  @property(Node)
  cardActionNode: Node | null = null;
  @property(Node)
  toolTipNode: Node | null = null;

  public cardAction: CardAction;
  public toolTip: Tooltip;
  public handCardList: HandCardList;
  public playerObjectList: PlayerObject[] = [];
  public seq: number;

  onLoad() {
    //初始化GamePools
    GamePools.init({
      card: instantiate(this.cardPrefab).getComponent(CardObject),
      cardGroup: this.cardGroupNode.getComponent(CardGroupObject),
    });
    this.cardAction = this.cardActionNode.getComponent(CardAction);
    this.toolTip = this.toolTipNode.getComponent(Tooltip);
  }

  onEnable() {
    //读条
    ProcessEventCenter.on(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);

    //收到初始化
    GameEventCenter.on(GameEvent.GAME_INIT, this.init, this);

    //收到游戏开始
    // GameEventCenter.once(GameEvent.GAME_START, (data: GameEventType.GameStart) => {});

    //卡组数量变化
    GameEventCenter.on(GameEvent.DECK_CARD_NUMBER_CHANGE, this.onDeckCardNumberChange, this);

    //播放洗牌动画（如果做了的话）
    // GameEventCenter.on(GameEvent.DECK_SHUFFLED, () => {});

    //抽卡
    GameEventCenter.on(GameEvent.PLAYER_DRAW_CARD, this.drawCards, this);

    //弃牌
    GameEventCenter.on(GameEvent.PLAYER_DISCARD_CARD, this.discardCards, this);

    //收到角色更新
    // GameEventCenter.on(GameEvent.CHARACTER_STATUS_CHANGE, (data: GameEventType.CharacterStatusChange) => {});

    //有人传出情报
    GameEventCenter.on(GameEvent.MESSAGE_TRANSMISSION, this.onMessageTransmission, this);

    //有人选择接收情报
    GameEventCenter.on(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.playerChooseReceiveMessage, this);

    //濒死求澄清
    // GameEventCenter.on(GameEvent.PLAYER_DYING, (data: GameEventType.PlayerDying) => {});

    //玩家死前
    // GameEventCenter.on(GameEvent.PLAYER_BEFORE_DEATH, (data: GameEventType.PlayerBeforeDeath) => {});

    //玩家死亡
    GameEventCenter.on(GameEvent.PLAYER_DIE, this.playerDie, this);

    //死亡给牌
    GameEventCenter.on(GameEvent.PLAYER_DIE_GIVE_CARD, this.playerDieGiveCard);

    //游戏结束
    // GameEventCenter.on(GameEvent.GAME_OVER, (data: notify_winner_toc) => {});
  }

  onDisable() {
    ProcessEventCenter.off(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown);
    GameEventCenter.off(GameEvent.GAME_INIT, this.init);
    GameEventCenter.off(GameEvent.DECK_CARD_NUMBER_CHANGE, this.onDeckCardNumberChange);
    GameEventCenter.off(GameEvent.PLAYER_DRAW_CARD, this.drawCards);
    GameEventCenter.off(GameEvent.PLAYER_DISCARD_CARD, this.discardCards);
    GameEventCenter.off(GameEvent.MESSAGE_TRANSMISSION, this.onMessageTransmission);
    GameEventCenter.off(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.playerChooseReceiveMessage);
    GameEventCenter.off(GameEvent.PLAYER_DIE, this.playerDie);
    GameEventCenter.off(GameEvent.PLAYER_DIE_GIVE_CARD, this.playerDieGiveCard);
  }

  init(data: GameEventType.GameInit) {
    //创建自己的UI
    const selfNode = this.node.getChildByPath("Self/Player");
    data.playerList[0].gameObject = selfNode.getComponent(PlayerObject);
    this.playerObjectList.push(data.playerList[0].gameObject);

    //初始化手牌UI
    this.handCardList = new HandCardList(this.handCardUI.getComponent(HandCardContianer));
    this.handCardList.gameObject.init();

    //创建其他人UI
    const othersCount = data.playerList.length - 1;
    const sideLength = Math.floor(othersCount / 3);

    for (let i = 0; i < sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.rightPlayerNodeList.addChild(player);
      data.playerList[i + 1].gameObject = player.getComponent(PlayerObject);
      this.playerObjectList.push(data.playerList[i + 1].gameObject);
    }

    for (let i = sideLength; i < othersCount - sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.topPlayerNodeList.addChild(player);
      data.playerList[i + 1].gameObject = player.getComponent(PlayerObject);
      this.playerObjectList.push(data.playerList[i + 1].gameObject);
    }

    for (let i = othersCount - sideLength; i < othersCount; i++) {
      const player = instantiate(this.playerPrefab);
      this.leftPlayerNodeList.addChild(player);
      data.playerList[i + 1].gameObject = player.getComponent(PlayerObject);
      this.playerObjectList.push(data.playerList[i + 1].gameObject);
    }

    this.rightPlayerNodeList.getComponent(Layout).updateLayout();
    this.topPlayerNodeList.getComponent(Layout).updateLayout();
    this.leftPlayerNodeList.getComponent(Layout).updateLayout();
  }

  onStartCountDown(data: ProcessEventType.StartCountDown) {
    ProcessEventCenter.emit(ProcessEvent.STOP_COUNT_DOWN);
    if (data.playerId === 0) {
      this.toolTipNode.getComponent(Tooltip).startCoundDown(data.second);
    } else {
      this.playerObjectList[data.playerId].startCoundDown(data.second);
    }
    this.seq = data.seq;
  }

  onDeckCardNumberChange(data: GameEventType.DeckCardNumberChange) {
    this.deckText.getChildByName("Label").getComponent(Label).string = data.number.toString();
  }

  onMessageTransmission(data: GameEventType.MessageTransmission) {
    const { message, messagePlayer } = data;
    this.cardAction.seedMessage(messagePlayer, message);
  }

  drawCards(data: GameEventType.PlayerDrawCard) {
    //抽牌动画
    const { player, cardList } = data;
    this.cardAction.drawCards(player, cardList);
  }

  discardCards(data: GameEventType.PlayerDiscardCard) {
    //弃牌动画
    const { player, cardList } = data;
    this.cardAction.discardCards(player, cardList);
  }

  playerChooseReceiveMessage(data: GameEventType.PlayerChooseReceiveMessage) {
    this.cardAction.chooseReceiveMessage();
  }

  playerDie(data: GameEventType.PlayerDie) {
    const { player, handCards, messages } = data;
    this.cardAction.discardCards(player, handCards);
    this.cardAction.discardCards(player, messages);
  }

  playerDieGiveCard(data: GameEventType.PlayerDieGiveCard) {
    this.cardAction.giveCards(data.player, data.targetPlayer, data.cardList);
  }
}
