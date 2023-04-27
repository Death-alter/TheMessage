import { _decorator, Node, Prefab, instantiate, Layout, Label, Sprite, Material } from "cc";
import { GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, ProcessEvent } from "../../../Event/type";
import { HandCardContianer } from "../../../Game/Container/HandCardContianer";
import { CardAction } from "../../../GameManager/CardAction";
import { Tooltip } from "../../../GameManager/Tooltip";
import * as GameEventType from "../../../Event/GameEventType";
import * as ProcessEventType from "../../../Event/ProcessEventType";
import { HandCardList } from "../../../Game/Container/HandCardList";
import { PlayerObject } from "../../../Game/Player/PlayerObject";
import { GameObject } from "../../../GameObject";
import { GameData } from "./GameData";
import { Card } from "../../../Game/Card/Card";
import { GamePhase } from "../../../GameManager/type";

const { ccclass, property } = _decorator;

@ccclass("GameUI")
export class GameUI extends GameObject<GameData> {
  @property(Prefab)
  playerPrefab: Prefab | null = null;
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
  cardActionNode: Node | null = null;
  @property(Node)
  toolTipNode: Node | null = null;

  public cardAction: CardAction;
  public toolTip: Tooltip;
  public handCardList: HandCardList;
  public playerObjectList: PlayerObject[] = [];
  public seq: number;

  onLoad() {
    this.cardAction = this.cardActionNode.getComponent(CardAction);
    this.toolTip = this.toolTipNode.getComponent(Tooltip);
  }

  onEnable() {
    //读条
    ProcessEventCenter.on(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);

    //玩家选择手牌
    ProcessEventCenter.on(ProcessEvent.SELECT_HAND_CARD, this.playerSelectHandCard, this);
    ProcessEventCenter.on(ProcessEvent.CANCEL_SELECT_HAND_CARD, this.playerCancelSelectHandCard, this);

    //收到初始化
    GameEventCenter.on(GameEvent.GAME_INIT, this.init, this);

    //收到游戏开始
    // GameEventCenter.once(GameEvent.GAME_START, (data: GameEventType.GameStart) => {});

    GameEventCenter.on(GameEvent.GAME_PHASE_CHANGE, this.onGamePhaseChange, this);

    //卡组数量变化
    GameEventCenter.on(GameEvent.DECK_CARD_NUMBER_CHANGE, this.onDeckCardNumberChange, this);

    //播放洗牌动画（如果做了的话）
    // GameEventCenter.on(GameEvent.DECK_SHUFFLED, () => {});

    //抽牌
    GameEventCenter.on(GameEvent.PLAYER_DRAW_CARD, this.drawCards, this);

    //弃牌
    GameEventCenter.on(GameEvent.PLAYER_DISCARD_CARD, this.discardCards, this);

    //卡牌加入手牌
    GameEventCenter.on(GameEvent.CARD_ADD_TO_HAND_CARD, this.cardAddToHandCard, this);

    //打出卡牌
    GameEventCenter.on(GameEvent.PLAYER_PLAY_CARD, this.playerPlayCard, this);

    //卡牌结算完
    GameEventCenter.on(GameEvent.AFTER_PLAYER_PLAY_CARD, this.afterPlayerPlayCard, this);

    //玩家开始传递情报
    GameEventCenter.on(GameEvent.PLAYER_SEND_MESSAGE, this.playerSendMessage, this);

    //情报传递
    GameEventCenter.on(GameEvent.MESSAGE_TRANSMISSION, this.transmitMessage, this);

    //情报传递
    GameEventCenter.on(GameEvent.MESSAGE_REPLACED, this.replaceMessage, this);

    //情报置入情报区
    GameEventCenter.on(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, this.messagePlacedIntoMessageZone, this);

    //有人选择接收情报
    GameEventCenter.on(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.playerChooseReceiveMessage, this);

    //接收情报
    GameEventCenter.on(GameEvent.PLAYER_RECEIVE_MESSAGE, this.playerReceiveMessage, this);

    //移除情报
    GameEventCenter.on(GameEvent.PLAYER_REOMVE_MESSAGE, this.playerRemoveMessage, this);

    //濒死求澄清
    GameEventCenter.on(GameEvent.PLAYER_DYING, this.playerDying, this);

    //玩家死前
    // GameEventCenter.on(GameEvent.PLAYER_BEFORE_DEATH, (data: GameEventType.PlayerBeforeDeath) => {});

    //玩家死亡
    GameEventCenter.on(GameEvent.PLAYER_DIE, this.playerDie, this);

    //玩家给牌
    GameEventCenter.on(GameEvent.PLAYER_GIVE_CARD, this.playerGiveCard, this);
  }

  onDisable() {
    ProcessEventCenter.off(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown);
    ProcessEventCenter.off(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown);
    GameEventCenter.off(GameEvent.GAME_INIT, this.init);
    GameEventCenter.off(GameEvent.GAME_PHASE_CHANGE, this.onGamePhaseChange);
    GameEventCenter.off(GameEvent.DECK_CARD_NUMBER_CHANGE, this.onDeckCardNumberChange);
    GameEventCenter.off(GameEvent.PLAYER_DRAW_CARD, this.drawCards);
    GameEventCenter.off(GameEvent.PLAYER_DISCARD_CARD, this.discardCards);
    GameEventCenter.off(GameEvent.PLAYER_PLAY_CARD, this.playerPlayCard);
    GameEventCenter.off(GameEvent.CARD_ADD_TO_HAND_CARD, this.cardAddToHandCard);
    GameEventCenter.off(GameEvent.MESSAGE_TRANSMISSION, this.transmitMessage);
    GameEventCenter.off(GameEvent.MESSAGE_REPLACED, this.replaceMessage);
    GameEventCenter.off(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, this.messagePlacedIntoMessageZone);
    GameEventCenter.off(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.playerChooseReceiveMessage);
    GameEventCenter.off(GameEvent.PLAYER_RECEIVE_MESSAGE, this.playerReceiveMessage);
    GameEventCenter.off(GameEvent.PLAYER_REOMVE_MESSAGE, this.playerRemoveMessage);
    GameEventCenter.off(GameEvent.PLAYER_DIE, this.playerDie);
    GameEventCenter.off(GameEvent.PLAYER_GIVE_CARD, this.playerGiveCard);
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
      this.toolTip.startCoundDown(data.second);
    } else {
      this.playerObjectList[data.playerId].startCoundDown(data.second);
    }
    this.seq = data.seq;
  }

  onStopCountDown() {
    this.toolTip.hideText();
  }

  onGamePhaseChange(data: GameEventType.GamePhaseChange) {
    this.toolTip.setTextByPhase(data.phase);
  }

  onDeckCardNumberChange(data: GameEventType.DeckCardNumberChange) {
    this.deckText.getChildByName("Label").getComponent(Label).string = "牌堆剩余数量：" + data.number.toString();
  }

  drawCards(data: GameEventType.PlayerDrawCard) {
    this.cardAction.drawCards(data, this.handCardList);
  }

  discardCards(data: GameEventType.PlayerDiscardCard) {
    this.cardAction.discardCards(data, this.handCardList);
  }

  cardAddToHandCard(data: GameEventType.CardAddToHandCard) {
    this.cardAction.addCardToHandCard(
      {
        player: data.player,
        cards: [data.card],
        from: data.from,
      },
      this.handCardList
    );
  }

  playerSendMessage(data: GameEventType.PlayerSendMessage) {
    this.cardAction.playerSendMessage(data, this.handCardList);
  }

  transmitMessage(data: GameEventType.MessageTransmission) {
    this.cardAction.transmitMessage(data);
  }

  replaceMessage(data: GameEventType.MessageReplaced) {
    this.cardAction.replaceMessage(data);
  }

  playerChooseReceiveMessage(data: GameEventType.PlayerChooseReceiveMessage) {
    this.cardAction.chooseReceiveMessage(data);
  }

  playerReceiveMessage(data: GameEventType.PlayerReceiveMessage) {
    this.cardAction.receiveMessage(data).then(() => {
      data.player.addMessage(data.message);
    });
  }

  playerRemoveMessage(data: GameEventType.PlayerRemoveMessage) {
    this.cardAction.removeMessage(data);
  }

  messagePlacedIntoMessageZone(data: GameEventType.MessagePlacedIntoMessageZone) {
    this.cardAction.messagePlacedIntoMessageZone(data);
  }

  playerDie(data: GameEventType.PlayerDie) {
    const { player, handCards, messages } = data;
    this.cardAction.discardCards({ player, cardList: handCards }, this.handCardList);
    this.cardAction.removeMessage({ player, messageList: messages });
  }

  playerDying({ player }: GameEventType.PlayerDying) {
    this.toolTip.setText(`【${player.seatNumber + 1}号】${player.character.name}濒死，是否使用澄清`);
  }

  playerGiveCard(data: GameEventType.PlayerGiveCard) {
    this.cardAction.giveCards(data, this.handCardList);
  }

  playerPlayCard(data: GameEventType.PlayerPalyCard) {
    if (data.player.id === 0) {
      this.handCardList.removeData(data.card);
    }
    this.cardAction.playerPlayCard(data);
  }

  afterPlayerPlayCard(data: GameEventType.AfterPlayerPalyCard) {
    this.cardAction.afterPlayerPlayCard(data);
    this.toolTip.setTextByPhase(this.data.gamePhase);
  }

  playerSelectHandCard(card: Card) {
    switch (this.data.gamePhase) {
      case GamePhase.MAIN_PHASE:
      case GamePhase.SEND_PHASE:
      case GamePhase.FIGHT_PHASE:
    }
  }

  playerCancelSelectHandCard() {
    this.toolTip.hideButtons();
    this.toolTip.setTextByPhase(this.data.gamePhase);
  }
}
