import { _decorator, Node, Prefab, instantiate, Layout, Label, Sprite, Material, Button } from "cc";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
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
import { GamePhase, WaitingType } from "../../../GameManager/type";
import { CardType } from "../../../Game/Card/type";

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
  public tooltip: Tooltip;
  public handCardList: HandCardList;
  public playerObjectList: PlayerObject[] = [];
  public seq: number;

  onLoad() {
    this.cardAction = this.cardActionNode.getComponent(CardAction);
    this.tooltip = this.toolTipNode.getComponent(Tooltip);
  }

  onEnable() {
    //读条
    ProcessEventCenter.on(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);

    //收到初始化
    GameEventCenter.on(GameEvent.GAME_INIT, this.init, this);

    //收到游戏开始
    // GameEventCenter.once(GameEvent.GAME_START, (data: GameEventType.GameStart) => {});

    // GameEventCenter.on(GameEvent.GAME_PHASE_CHANGE, this.onGamePhaseChange, this);

    //卡组数量变化
    GameEventCenter.on(GameEvent.DECK_CARD_NUMBER_CHANGE, this.onDeckCardNumberChange, this);

    //洗牌
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
    // GameEventCenter.on(GameEvent.PLAYER_DYING, this.playerDying, this);

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
    // GameEventCenter.off(GameEvent.GAME_PHASE_CHANGE, this.onGamePhaseChange);
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

    //绑定点击事件
    for (let i = 0; i < data.playerList.length; i++) {
      this.playerObjectList[i].node.on(
        Node.EventType.TOUCH_END,
        (event) => {
          console.log(1);
          const flag = this.data.selectedPlayers.select(data.playerList[i]);
        },
        this
      );
    }
  }

  onStartCountDown(data: ProcessEventType.StartCountDown) {
    ProcessEventCenter.emit(ProcessEvent.STOP_COUNT_DOWN);
    if (data.playerId === 0) {
      this.tooltip.startCoundDown(data.second);
      switch (data.type) {
        case WaitingType.PLAY_CARD:
          switch (this.data.gamePhase) {
            case GamePhase.MAIN_PHASE:
              this.promotUseHandCard("出牌阶段，请选择要使用的卡牌");
              break;
            case GamePhase.FIGHT_PHASE:
              this.promotUseHandCard("争夺阶段，请选择要使用的卡牌");
              break;
          }
          break;
        case WaitingType.SEND_MESSAGE:
          this.promotSendMessage("传递阶段，请选择要传递的情报或要使用的卡牌");
          break;
        case WaitingType.RECEIVE_MESSAGE:
          this.promotReceiveMessage("传递阶段，请选择要使用的卡牌或接收情报");
          break;
        case WaitingType.PLAYER_DYING:
          this.promotUseHandCard("玩家濒死，是否使用澄清？");
          break;
      }
    } else {
      this.playerObjectList[data.playerId].startCoundDown(data.second);
    }
    this.seq = data.seq;
  }

  onStopCountDown() {
    this.tooltip.hide();
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
  }

  promotUseHandCard(tooltipText) {
    this.handCardList.selectedCards.limit = 1;
    this.tooltip.setText(tooltipText);
    const buttons = this.tooltip.setButtons([
      {
        text: "确定",
        onclick: () => {
          this.handCardList.selectedCards.list.forEach((card) => {
            card.onConfirmPlay(this.data, this.tooltip, () => {
              this.promotUseHandCard(tooltipText);
            });
          });
          ProcessEventCenter.off(ProcessEvent.SELECT_HAND_CARD);
          ProcessEventCenter.off(ProcessEvent.CANCEL_SELECT_HAND_CARD);
        },
        disabled: true,
      },
      {
        text: "取消",
        onclick: () => {
          switch (this.data.gamePhase) {
            case GamePhase.MAIN_PHASE:
              NetworkEventCenter.emit(NetworkEventToS.END_MAIN_PHASE_TOS, {
                seq: this.seq,
              });
              break;
            case GamePhase.FIGHT_PHASE:
              NetworkEventCenter.emit(NetworkEventToS.END_FIGHT_PHASE_TOS, {
                seq: this.seq,
              });
              break;
            case GamePhase.RECEIVE_PHASE:
              NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
                seq: this.seq,
              });
              break;
          }
          ProcessEventCenter.off(ProcessEvent.SELECT_HAND_CARD);
          ProcessEventCenter.off(ProcessEvent.CANCEL_SELECT_HAND_CARD);
        },
      },
    ]);
    ProcessEventCenter.on(ProcessEvent.SELECT_HAND_CARD, (card: Card) => {
      if (card.availablePhases.indexOf(this.data.gamePhase) !== -1) {
        buttons[0].getComponent(Button).interactable = true;
      }
    });
    ProcessEventCenter.on(ProcessEvent.CANCEL_SELECT_HAND_CARD, () => {
      buttons[0].getComponent(Button).interactable = false;
    });
  }

  promotSendMessage(tooltipText) {
    this.handCardList.selectedCards.limit = 1;
    this.tooltip.setText(tooltipText);
    const buttons = this.tooltip.setButtons([
      {
        text: "确定",
        onclick: () => {
          this.handCardList.selectedCards.list.forEach((card) => {
            NetworkEventCenter.emit(NetworkEventToS.SEND_MESSAGE_CARD_TOS, {
              cardId: card.id,
              targetPlayerId: 1,
              lockPlayerId: 0,
              direction: card.direction,
              seq: this.seq,
            });
          });
          ProcessEventCenter.off(ProcessEvent.SELECT_HAND_CARD);
          ProcessEventCenter.off(ProcessEvent.CANCEL_SELECT_HAND_CARD);
        },
        disabled: true,
      },
    ]);
    ProcessEventCenter.on(ProcessEvent.SELECT_HAND_CARD, () => {
      buttons[0].getComponent(Button).interactable = true;
    });
    ProcessEventCenter.on(ProcessEvent.CANCEL_SELECT_HAND_CARD, () => {
      buttons[0].getComponent(Button).interactable = false;
    });
  }

  promotReceiveMessage(tooltipText) {
    this.tooltip.setText(tooltipText);
    this.tooltip.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.CHOOSE_WHETHER_RECEIVE_TOS, {
            receive: true,
            seq: this.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SEND_MESSAGE_CARD_TOS, {
            receive: false,
            seq: this.seq,
          });
        },
      },
    ]);
  }
}
