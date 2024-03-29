import { _decorator, Node, Component } from "cc";
import { GameEventCenter } from "../../../Event/EventTarget";
import { GameEvent } from "../../../Event/type";
import * as GameEventType from "../../../Event/GameEventType";
import { Card } from "../../../Components/Card/Card";
import { CardActionLocation, GamePhase } from "../../../Manager/type";
import { AudioMgr } from "../../../Scenes/Resident/AudioMgr";
import { GameManager } from "../../../Manager/GameManager";
import { getCardAudioSrc } from "../../../Components/Card";
import { Player } from "../../../Components/Player/Player";
import { KeyframeAnimationPlayer } from "./KeyframeAnimationPlayer";

const { ccclass, property } = _decorator;

@ccclass("AnimationLayer")
export class AnimationLayer extends Component {
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;
  @property(Node)
  animationPlayerNode: Node | null = null;

  public manager: GameManager;
  public animationPlayer: KeyframeAnimationPlayer;
  public audioManager: AudioMgr;

  init(manager: GameManager) {
    this.manager = manager;

    this.animationPlayer = this.animationPlayerNode.getComponent(KeyframeAnimationPlayer);
    this.animationPlayer.handCardList = this.manager.data.handCardList;
    this.animationPlayer.clear();

    this.audioManager = AudioMgr.inst;

    //如果有传递中的情报
    if (this.manager.data.messageInTransmit) {
      this.animationPlayer.setCard(this.manager.data.messageInTransmit, {
        location: CardActionLocation.PLAYER,
        player: this.manager.data.playerList[this.manager.data.messagePlayerId],
      });
      this.animationPlayer.transmissionMessageObject = this.manager.data.messageInTransmit.gameObject;
    }
  }

  startRender() {
    this.animationPlayer.node.active = true;
    //抽牌
    GameEventCenter.on(GameEvent.PLAYER_DRAW_CARD, this.drawCards, this);

    //弃牌
    GameEventCenter.on(GameEvent.PLAYER_DISCARD_CARD, this.discardCards, this);

    //卡牌加入手牌
    GameEventCenter.on(GameEvent.CARD_ADD_TO_HAND_CARD, this.cardAddToHandCard, this);

    //使用卡牌
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

    //查看待收情报
    GameEventCenter.on(GameEvent.PLAYER_VIEW_MESSAGE, this.playerViewMessage, this);

    //翻开待收情报
    GameEventCenter.on(GameEvent.MESSAGE_TURNED_OVER, this.playerTurnOverMessage, this);

    //移除情报
    GameEventCenter.on(GameEvent.PLAYER_REMOVE_MESSAGE, this.playerRemoveMessage, this);

    //玩家死亡
    GameEventCenter.on(GameEvent.PLAYER_DIE, this.playerDie, this);

    //玩家从濒死恢复
    GameEventCenter.on(GameEvent.PLAYER_RECOVERY, this.playerRecovery, this);

    //玩家给牌
    GameEventCenter.on(GameEvent.PLAYER_GIVE_CARD, this.playerGiveCard, this);
    GameEventCenter.on(GameEvent.CARD_MOVED, this.moveCard, this);
  }



  drawCards(data: GameEventType.PlayerDrawCard) {
    this.animationPlayer.drawCards(data);
  }

  discardCards(data: GameEventType.PlayerDiscardCard) {
    this.animationPlayer.discardCards(data);
  }

  cardAddToHandCard(data: GameEventType.CardAddToHandCard) {
    const { player, card, from } = data;
    this.animationPlayer.addCardToHandCard({
      player: player,
      card: <Card>card,
      from: from || { location: CardActionLocation.DECK },
    });
  }

  playerSendMessage(data: GameEventType.PlayerSendMessage) {
    this.animationPlayer.playerSendMessage(data);
    if (data.player.id !== this.manager.data.turnPlayerId) {
      data.player.gameObject.showInnerGlow("FF00FF80");
    }
  }

  moveCard(data: GameEventType.CardMoved) {
    this.animationPlayer.moveCard(data);
  }

  removeMessage(message) {
    this.animationPlayer.discardMessage(message);
  }

  transmitMessage(data: GameEventType.MessageTransmission) {
    this.animationPlayer.transmitMessage(data);
  }

  replaceMessage(data: GameEventType.MessageReplaced) {
    this.animationPlayer.replaceMessage(data);
  }

  playerChooseReceiveMessage(data: GameEventType.PlayerChooseReceiveMessage) {
    this.animationPlayer.chooseReceiveMessage(data);
  }

  playerReceiveMessage(data: GameEventType.PlayerReceiveMessage) {
    this.animationPlayer.receiveMessage(data);
    if (this.manager.data.senderId !== this.manager.data.turnPlayerId) {
      const player = this.manager.data.playerList[this.manager.data.senderId];
      player?.gameObject.hideInnerGlow();
    }
  }

  playerViewMessage(data: GameEventType.PlayerViewMessage) {
    this.animationPlayer.viewMessage(data);
  }

  playerTurnOverMessage({ message }: GameEventType.MessageTurnedOver) {
    this.animationPlayer.turnOverMessage(message);
  }

  playerRemoveMessage(data: GameEventType.PlayerRemoveMessage) {
    this.animationPlayer.removeMessage(data);
    const player = data.player;
    if (player === this.manager.data.dyingPlayer) {
      if (player.id === this.manager.data.turnPlayerId) {
        player.gameObject.showInnerGlow("#00FF0080");
      } else {
        player.gameObject.hideInnerGlow();
      }
    }
  }

  messagePlacedIntoMessageZone(data: GameEventType.MessagePlacedIntoMessageZone) {
    const { player, message, from } = data;
    this.animationPlayer.addCardToMessageZone({
      player,
      card: <Card>message,
      from: from || { location: CardActionLocation.DECK },
    });
  }

  playerDie(data: GameEventType.PlayerDie) {
    const { player, messages } = data;
    this.animationPlayer.removeMessage({ player, messageList: messages });
    data.player.gameObject.hideInnerGlow();
  }

  playerRecovery(player: Player) {
    if (this.manager.data.gamePhase === GamePhase.SEND_PHASE || this.manager.data.gamePhase === GamePhase.FIGHT_PHASE) {
      if (player.id === this.manager.data.turnPlayerId) {
        player.gameObject.showInnerGlow("#00FF0080");
      } else if (player.id === this.manager.data.senderId) {
        player.gameObject.showInnerGlow("FF00FF80");
      }
    } else {
      player.gameObject.hideInnerGlow();
    }
  }

  playerGiveCard(data: GameEventType.PlayerGiveCard) {
    this.animationPlayer.giveCards(data);
  }

  playerPlayCard(data: GameEventType.PlayerPlayCard) {
    this.audioManager.playOneShot(getCardAudioSrc(data.cardType || data.card, data.player.character.sex));

    if (data.targetPlayer) {
      this.animationPlayer.showIndicantLine({
        from: { location: CardActionLocation.PLAYER, player: data.player },
        to: { location: CardActionLocation.PLAYER, player: data.targetPlayer },
      });
    }

    this.animationPlayer.playerPlayCard(data);
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
      this.animationPlayer.afterPlayerPlayCard(data);
    }
  }
}
