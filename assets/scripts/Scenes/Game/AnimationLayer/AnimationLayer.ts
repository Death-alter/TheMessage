import { _decorator, Node, Component, Vec3 } from "cc";
import { GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, ProcessEvent } from "../../../Event/type";
import * as GameEventType from "../../../Event/GameEventType";
import { Card } from "../../../Components/Card/Card";
import { CardActionLocation, GamePhase } from "../../../Manager/type";
import { AudioMgr } from "../../../Scenes/Resident/AudioMgr";
import { GameManager } from "../../../Manager/GameManager";
import { getCardAudioSrc } from "../../../Components/Card";
import { Player } from "../../../Components/Player/Player";
import { KeyframeAnimationPlayer } from "./KeyframeAnimationPlayer";
import { CardEntity } from "../../../Components/Card/CardEntity";
import GamePools from "../../../Components/Pool/GamePools";
import { OuterGlow } from "../../../Components/Utils/OuterGlow";
import { CardsEntity, CardStatus } from "../../../Components/Card/type";
import { CardGroup } from "../../../Components/Container/CardGroup";
import { CardGroupEntity } from "../../../Components/Container/CardGroupEntity";
import { KeyframeAnimationManager } from "./KeyframeAnimation";

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
  public messageEntity: CardEntity = null;

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
      this.messageEntity = this.manager.data.messageInTransmit.entity;
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

    //拿取场上的情报
    GameEventCenter.on(GameEvent.PLAYER_TAKE_MESSAGE, this.playerTakeMessage, this);

    //接收情报
    GameEventCenter.on(GameEvent.PLAYER_RECEIVE_MESSAGE, this.playerReceiveMessage, this);

    //查看待收情报
    GameEventCenter.on(GameEvent.PLAYER_VIEW_MESSAGE, this.playerViewMessage, this);

    //翻开待收情报
    GameEventCenter.on(GameEvent.MESSAGE_TURNED_OVER, this.playerTurnOverMessage, this);

    //移除情报
    GameEventCenter.on(GameEvent.PLAYER_REMOVE_MESSAGE, this.playerRemoveMessage, this);

    //把卡牌作为情报
    GameEventCenter.on(GameEvent.PLAYER_SET_MESSAGE, this.playerSetMessage, this);

    //玩家死亡
    GameEventCenter.on(GameEvent.PLAYER_DIE, this.playerDie, this);

    //玩家从濒死恢复
    GameEventCenter.on(GameEvent.PLAYER_RECOVERY, this.playerRecovery, this);

    //玩家给牌
    GameEventCenter.on(GameEvent.PLAYER_GIVE_CARD, this.playerGiveCard, this);
    GameEventCenter.on(GameEvent.CARD_MOVED, this.moveCard, this);

    ProcessEventCenter.on(
      ProcessEvent.RECORD_STATUS_CHANGE,
      (data) => {
        if (data.paused) {
          KeyframeAnimationManager.pauseAll();
        } else {
          KeyframeAnimationManager.resumeAll();
        }
      },
      this,
    );
  }

  /**
   * 创建并返回卡牌列表对应的实体
   * @param cardList 卡牌列表
   */
  getCardEntity(cardList: Card[]): CardGroupEntity;
  /**
   * 获取卡牌对应的实体
   * @param card 卡牌对象
   */
  getCardEntity(card: Card): CardEntity;
  getCardEntity(card: Card | Card[]): CardsEntity {
    if (!card) return null;
    if (card instanceof Array) {
      const cardGroup = new CardGroup(GamePools.cardGroupPool.get());
      for (const c of card) {
        if (!c?.entity?.node) {
          c.entity = GamePools.cardPool.get();
        } else {
          c.entity.getComponentInChildren(OuterGlow).closeOuterGlow();
        }
        c.entity.node.scale = new Vec3(0.6, 0.6, 1);
        cardGroup.addData(c);
      }
      return <CardGroupEntity>cardGroup.entity;
    } else {
      if (!card?.entity?.node) {
        card.entity = GamePools.cardPool.get();
      } else {
        card.entity.getComponentInChildren(OuterGlow).closeOuterGlow();
      }
      card.entity.node.scale = new Vec3(0.6, 0.6, 1);
      return card.entity;
    }
  }

  drawCards({ player, cardList }: GameEventType.PlayerDrawCard) {
    this.animationPlayer.drawCards(player, this.getCardEntity(cardList));
  }

  discardCards({ player, cardList }: GameEventType.PlayerDiscardCard) {
    this.animationPlayer.discardCards(player, this.getCardEntity(cardList));
  }

  cardAddToHandCard({ player, card, from, callback }: GameEventType.CardAddToHandCard) {
    this.animationPlayer.addCardToHandCard({
      player: player,
      entity: this.getCardEntity(<Card>card),
      from: from || { location: CardActionLocation.DECK },
      callback,
    });
  }

  playerSendMessage({ player, targetPlayer, message }: GameEventType.PlayerSendMessage) {
    const entity = this.getCardEntity(message);
    this.messageEntity = entity;
    this.animationPlayer.playerSendMessage(player, targetPlayer, entity);
    if (player.id !== this.manager.data.turnPlayerId) {
      player.entity.showInnerGlow("FF00FF80");
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
    this.animationPlayer.discardMessage(message, this.messageEntity);
  }

  transmitMessage({ messagePlayer, message }: GameEventType.MessageTransmission) {
    this.animationPlayer.transmitMessage(messagePlayer, this.messageEntity);
  }

  replaceMessage({ messagePlayer, message, oldMessage, status }: GameEventType.MessageReplaced) {
    const oldEntity = this.messageEntity;
    this.messageEntity = this.getCardEntity(message);
    this.animationPlayer.replaceMessage(messagePlayer, message, this.messageEntity, oldMessage, oldEntity, status);
  }

  playerChooseReceiveMessage(data: GameEventType.PlayerChooseReceiveMessage) {
    this.animationPlayer.chooseReceiveMessage(this.messageEntity);
  }

  playerTakeMessage(player: Player) {
    if (player.id === 0) {
      this.messageEntity.data.status = CardStatus.FACE_UP;
    }
    this.animationPlayer.addCardToHandCard({
      player: player,
      entity: this.messageEntity,
    });
    this.messageEntity = null;
  }

  playerSetMessage(message: Card) {
    this.messageEntity = this.getCardEntity(message);
  }

  playerReceiveMessage({ player, message }: GameEventType.PlayerReceiveMessage) {
    if (this.manager.data.senderId !== this.manager.data.turnPlayerId) {
      const player = this.manager.data.playerList[this.manager.data.senderId];
      player?.entity.hideInnerGlow();
    }
    const entity = this.messageEntity;
    this.messageEntity = null;
    this.animationPlayer.receiveMessage(player, message, entity);
  }

  playerViewMessage({ player, message }: GameEventType.PlayerViewMessage) {
    this.animationPlayer.viewMessage(player, message, this.messageEntity);
  }

  playerTurnOverMessage({ message }: GameEventType.MessageTurnedOver) {
    this.animationPlayer.turnOverMessage(message, this.messageEntity);
  }

  playerRemoveMessage({ player, messageList }: GameEventType.PlayerRemoveMessage) {
    this.animationPlayer.removeMessage(player, this.getCardEntity(messageList));
    if (player === this.manager.data.dyingPlayer) {
      if (player.id === this.manager.data.turnPlayerId) {
        player.entity.showInnerGlow("#00FF0080");
      } else {
        player.entity.hideInnerGlow();
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
    player.entity.hideInnerGlow();
  }

  playerRecovery(player: Player) {
    if (player.id === this.manager.data.turnPlayerId) {
      player.entity.showInnerGlow("#00FF0080");
    } else if (
      player.id === this.manager.data.senderId &&
      (this.manager.data.gamePhase === GamePhase.SEND_PHASE || this.manager.data.gamePhase === GamePhase.FIGHT_PHASE)
    ) {
      player.entity.showInnerGlow("FF00FF80");
    } else {
      player.entity.hideInnerGlow();
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
