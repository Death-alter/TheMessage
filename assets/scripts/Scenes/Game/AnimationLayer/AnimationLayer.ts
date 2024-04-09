import { _decorator, Node, Component, Vec3 } from "cc";
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
import { CardObject } from "../../../Components/Card/CardObject";
import GamePools from "../../../Components/Pool/GamePools";
import { OuterGlow } from "../../../Components/Utils/OuterGlow";
import { CardEntity, CardStatus } from "../../../Components/Card/type";
import { CardGroup } from "../../../Components/Container/CardGroup";
import { CardGroupObject } from "../../../Components/Container/CardGroupObject";

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
  public messageObject: CardObject = null;

  init(manager: GameManager) {
    this.manager = manager;

    this.animationPlayer = this.animationPlayerNode.getComponent(KeyframeAnimationPlayer);
    this.animationPlayer.handCardList = this.manager.data.handCardList;
    this.animationPlayer.clear();

    this.audioManager = AudioMgr.inst;

    //如果有传递中的情报
    if (this.manager.data.messageInTransmit) {
      this.animationPlayer.setCard(this.getCardEntity(this.manager.data.messageInTransmit), {
        location: CardActionLocation.PLAYER,
        player: this.manager.data.playerList[this.manager.data.messagePlayerId],
      });
      this.messageObject = this.manager.data.messageInTransmit.gameObject;
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

    //情报替换
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

  /**
   * 创建并返回卡牌列表对应的实体
   * @param cardList 卡牌列表
   */
  getCardEntity(cardList: Card[]): CardGroupObject;
  /**
   * 获取卡牌对应的实体
   * @param card 卡牌对象
   */
  getCardEntity(card: Card): CardObject;
  getCardEntity(card: Card | Card[]): CardEntity {
    if (!card) return null;
    if (card instanceof Array) {
      const cardGroup = new CardGroup(GamePools.cardGroupPool.get());
      for (const c of card) {
        if (!c?.gameObject?.node) {
          c.gameObject = GamePools.cardPool.get();
        } else {
          c.gameObject.getComponentInChildren(OuterGlow).closeOuterGlow();
        }
        c.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        cardGroup.addData(c);
      }
      return <CardGroupObject>cardGroup.gameObject;
    } else {
      if (!card?.gameObject?.node) {
        card.gameObject = GamePools.cardPool.get();
      } else {
        card.gameObject.getComponentInChildren(OuterGlow).closeOuterGlow();
      }
      card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
      return card.gameObject;
    }
  }

  drawCards({ player, cardList }: GameEventType.PlayerDrawCard) {
    this.animationPlayer.drawCards(player, this.getCardEntity(cardList));
  }

  discardCards({ player, cardList }: GameEventType.PlayerDiscardCard) {
    this.animationPlayer.discardCards(player, this.getCardEntity(cardList));
  }

  cardAddToHandCard({ player, card, from }: GameEventType.CardAddToHandCard) {
    this.animationPlayer.addCardToHandCard({
      player: player,
      entity: this.getCardEntity(<Card>card),
      from: from || { location: CardActionLocation.DECK },
    });
  }

  playerSendMessage({ player, targetPlayer, message }: GameEventType.PlayerSendMessage) {
    const entity = this.getCardEntity(message);
    this.messageObject = entity;
    this.animationPlayer.playerSendMessage(player, targetPlayer, this.getCardEntity(message));
    if (player.id !== this.manager.data.turnPlayerId) {
      player.gameObject.showInnerGlow("FF00FF80");
    }
  }

  moveCard({ card, from, to }: GameEventType.CardMoved) {
    this.animationPlayer.moveCard({
      entity: this.getCardEntity(card),
      from,
      to,
    });
  }

  removeMessage(message: Card) {
    this.animationPlayer.discardMessage(message, this.messageObject);
  }

  transmitMessage({ messagePlayer, message }: GameEventType.MessageTransmission) {
    console.log(this.messageObject.data);
    this.animationPlayer.transmitMessage(messagePlayer, this.messageObject);
  }

  replaceMessage({ messagePlayer, message, oldMessage, turnOver }: GameEventType.MessageReplaced) {
    const oldEntity = this.messageObject;
    this.messageObject = this.getCardEntity(message);
    this.animationPlayer.replaceMessage(messagePlayer, message, this.messageObject, oldMessage, oldEntity, turnOver);
  }

  playerChooseReceiveMessage(data: GameEventType.PlayerChooseReceiveMessage) {
    this.animationPlayer.chooseReceiveMessage(this.messageObject);
  }

  playerReceiveMessage({ player, message }: GameEventType.PlayerReceiveMessage) {
    this.animationPlayer.receiveMessage(player, message, this.messageObject);
    if (this.manager.data.senderId !== this.manager.data.turnPlayerId) {
      const player = this.manager.data.playerList[this.manager.data.senderId];
      player?.gameObject.hideInnerGlow();
    }
  }

  playerViewMessage({ player, message }: GameEventType.PlayerViewMessage) {
    this.animationPlayer.viewMessage(player, message, this.messageObject);
  }

  playerTurnOverMessage({ message }: GameEventType.MessageTurnedOver) {
    this.animationPlayer.turnOverMessage(message, this.messageObject);
  }

  playerRemoveMessage({ player, messageList }: GameEventType.PlayerRemoveMessage) {
    this.animationPlayer.removeMessage(player, this.getCardEntity(messageList));
    if (player === this.manager.data.dyingPlayer) {
      if (player.id === this.manager.data.turnPlayerId) {
        player.gameObject.showInnerGlow("#00FF0080");
      } else {
        player.gameObject.hideInnerGlow();
      }
    }
  }

  messagePlacedIntoMessageZone({ player, message, from }: GameEventType.MessagePlacedIntoMessageZone) {
    this.animationPlayer.addCardToMessageZone({
      player,
      entity: this.getCardEntity(<Card>message),
      from: from || { location: CardActionLocation.DECK },
    });
  }

  playerDie({ player, messages }: GameEventType.PlayerDie) {
    this.animationPlayer.removeMessage(player, this.getCardEntity(messages));
    player.gameObject.hideInnerGlow();
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

  playerGiveCard({ player, targetPlayer, cardList }: GameEventType.PlayerGiveCard) {
    this.animationPlayer.giveCards(player, targetPlayer, this.getCardEntity(cardList));
  }

  playerPlayCard({ card, cardType, player, targetPlayer }: GameEventType.PlayerPlayCard) {
    this.audioManager.playOneShot(getCardAudioSrc(cardType || card, player.character.sex));

    if (targetPlayer) {
      this.animationPlayer.showIndicantLine({
        from: { location: CardActionLocation.PLAYER, player },
        to: { location: CardActionLocation.PLAYER, player: targetPlayer },
      });
    }

    this.animationPlayer.playerPlayCard(player, this.getCardEntity(card));
  }

  cardOnEffect(data: GameEventType.CardOnEffect) {
    const { card, handler, params } = data;
    if (handler) {
      card[handler](this.manager, params);
    }
  }

  afterPlayerPlayCard({ card, flag }: GameEventType.AfterPlayerPlayCard) {
    const f = card.onFinish(this.manager) && flag !== false;
    this.animationPlayer.afterPlayerPlayCard(this.getCardEntity(card), f);
  }
}
