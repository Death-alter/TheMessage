import { _decorator, Node, Component } from "cc";
import { GameEventCenter } from "../../../Event/EventTarget";
import { GameEvent } from "../../../Event/type";
import { CardAction } from "../../../Scenes/Game/AnimationLayer/CardAction";
import * as GameEventType from "../../../Event/GameEventType";
import { Card } from "../../../Components/Card/Card";
import { CardActionLocation } from "../../../Manager/type";
import { AudioMgr } from "../../../Scenes/Resident/AudioMgr";
import { Sex } from "../../../Components/Chatacter/type";
import { GameManager } from "../../../Manager/GameManager";

const { ccclass, property } = _decorator;

@ccclass("AnimationLayer")
export class AnimationLayer extends Component {
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;
  @property(Node)
  cardActionNode: Node | null = null;

  public manager: GameManager;
  public cardAction: CardAction;
  public audioManager: AudioMgr;

  init(manager: GameManager) {
    this.manager = manager;

    this.cardAction = this.cardActionNode.getComponent(CardAction);
    this.cardAction.handCardList = this.manager.data.handCardList;
    this.cardAction.clear();
    this.audioManager = new AudioMgr();

    //如果有传递中的情报
    if (this.manager.data.messageInTransmit) {
      this.cardAction.setCard(this.manager.data.messageInTransmit, {
        location: CardActionLocation.PLAYER,
        player: this.manager.data.playerList[this.manager.data.messagePlayerId],
      });
      this.cardAction.transmissionMessageObject = this.manager.data.messageInTransmit.gameObject;
    }
  }

  startRender() {
    this.cardAction.node.active = true;
    //抽牌
    GameEventCenter.on(GameEvent.PLAYER_DRAW_CARD, this.drawCards, this);

    //弃牌
    GameEventCenter.on(GameEvent.PLAYER_DISCARD_CARD, this.discardCards, this);

    //卡牌加入手牌
    GameEventCenter.on(GameEvent.CARD_ADD_TO_HAND_CARD, this.cardAddToHandCard, this);

    //打出卡牌
    GameEventCenter.on(GameEvent.PLAYER_PLAY_CARD, this.playerPlayCard, this);

    //卡牌结算
    GameEventCenter.on(GameEvent.CARD_ON_EFFECT, this.cardOnEffect, this);

    //卡牌结算完
    GameEventCenter.on(GameEvent.AFTER_PLAYER_PLAY_CARD, this.afterPlayerPlayCard, this);

    //玩家开始传递情报
    GameEventCenter.on(GameEvent.PLAYER_SEND_MESSAGE, this.playerSendMessage, this);

    GameEventCenter.on(GameEvent.MESSAGE_REMOVED, this.removeMessage, this);

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
    GameEventCenter.on(GameEvent.PLAYER_REMOVE_MESSAGE, this.playerRemoveMessage, this);

    //玩家死亡
    GameEventCenter.on(GameEvent.PLAYER_DIE, this.playerDie, this);

    //玩家给牌
    GameEventCenter.on(GameEvent.PLAYER_GIVE_CARD, this.playerGiveCard, this);
    GameEventCenter.on(GameEvent.CARD_MOVED, this.moveCard, this);
  }

  stopRender() {
    this.cardAction.node.active = false;

    GameEventCenter.off(GameEvent.PLAYER_DRAW_CARD, this.drawCards, this);
    GameEventCenter.off(GameEvent.CARD_ON_EFFECT, this.cardOnEffect, this);
    GameEventCenter.off(GameEvent.PLAYER_DISCARD_CARD, this.discardCards, this);
    GameEventCenter.off(GameEvent.PLAYER_PLAY_CARD, this.playerPlayCard, this);
    GameEventCenter.off(GameEvent.AFTER_PLAYER_PLAY_CARD, this.afterPlayerPlayCard, this);
    GameEventCenter.off(GameEvent.CARD_ADD_TO_HAND_CARD, this.cardAddToHandCard, this);
    GameEventCenter.off(GameEvent.MESSAGE_TRANSMISSION, this.transmitMessage, this);
    GameEventCenter.off(GameEvent.PLAYER_SEND_MESSAGE, this.playerSendMessage, this);
    GameEventCenter.off(GameEvent.MESSAGE_REPLACED, this.replaceMessage, this);
    GameEventCenter.off(GameEvent.MESSAGE_REMOVED, this.removeMessage, this);
    GameEventCenter.off(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, this.messagePlacedIntoMessageZone, this);
    GameEventCenter.off(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.playerChooseReceiveMessage, this);
    GameEventCenter.off(GameEvent.PLAYER_RECEIVE_MESSAGE, this.playerReceiveMessage, this);
    GameEventCenter.off(GameEvent.PLAYER_REMOVE_MESSAGE, this.playerRemoveMessage, this);
    GameEventCenter.off(GameEvent.PLAYER_DIE, this.playerDie, this);
    GameEventCenter.off(GameEvent.PLAYER_GIVE_CARD, this.playerGiveCard, this);
    GameEventCenter.off(GameEvent.CARD_MOVED, this.moveCard, this);
  }

  drawCards(data: GameEventType.PlayerDrawCard) {
    this.cardAction.drawCards(data);
  }

  discardCards(data: GameEventType.PlayerDiscardCard) {
    this.cardAction.discardCards(data);
  }

  cardAddToHandCard(data: GameEventType.CardAddToHandCard) {
    const { player, card, from } = data;
    this.cardAction.addCardToHandCard({
      player: player,
      card: <Card>card,
      from: from || { location: CardActionLocation.DECK },
    });
  }

  playerSendMessage(data: GameEventType.PlayerSendMessage) {
    this.cardAction.playerSendMessage(data);
  }

  moveCard(data: GameEventType.CardMoved) {
    this.cardAction.moveCard(data);
  }

  removeMessage(message) {
    this.cardAction.discardMessage(message);
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
    this.cardAction.receiveMessage(data);
  }

  playerRemoveMessage(data: GameEventType.PlayerRemoveMessage) {
    this.cardAction.removeMessage(data);
  }

  messagePlacedIntoMessageZone(data: GameEventType.MessagePlacedIntoMessageZone) {
    const { player, message, from } = data;
    this.cardAction.addCardToMessageZone({
      player,
      card: <Card>message,
      from: from || { location: CardActionLocation.DECK },
    });
  }

  playerDie(data: GameEventType.PlayerDie) {
    const { player, messages } = data;
    this.cardAction.removeMessage({ player, messageList: messages });
  }

  playerGiveCard(data: GameEventType.PlayerGiveCard) {
    this.cardAction.giveCards(data);
  }

  playerPlayCard(data: GameEventType.PlayerPlayCard) {
    if (data.player.character.sex === Sex.FAMALE) {
      this.audioManager.playOneShot(`audio/cards/${data.card.src}_woman`, 2);
    } else {
      this.audioManager.playOneShot(`audio/cards/${data.card.src}_man`, 2);
    }
    if (data.targetPlayer) {
      this.cardAction.showIndicantLine({
        from: { location: CardActionLocation.PLAYER, player: data.player },
        to: { location: CardActionLocation.PLAYER, player: data.targetPlayer },
      });
    }

    this.cardAction.playerPlayCard(data);
  }

  cardOnEffect(data: GameEventType.CardOnEffect) {
    const { card, handler, params } = data;
    if (handler) {
      card[handler](this.manager, params);
    }
  }

  afterPlayerPlayCard(data: GameEventType.AfterPlayerPlayCard) {
    const flag = data.card.onFinish(this.manager) && data.flag !== false;
    if (flag !== false) {
      this.cardAction.afterPlayerPlayCard(data);
    }
  }
}
