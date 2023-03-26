import { _decorator, Component, tween, Node, Vec3 } from "cc";
import { Card, UnknownCard } from "../Game/Card/Card";
import { Player } from "../Game/Player/Player";
import { DataContainer } from "../Game/Container/DataContainer";
import { CardStatus, GameCard } from "../Game/Card/type";
import { CardObject } from "../Game/Card/CardObject";
import { HandCardContianer } from "../Game/Container/HandCardContianer";
import GamePools from "./GamePools";
import { GameEventCenter } from "../Event/EventTarget";
import { GameEvent } from "../Event/type";
import * as GameEventType from "../Event/GameEventType";

const { ccclass, property } = _decorator;

@ccclass("CardAction")
export class CardAction extends Component {
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;
  @property(Node)
  handCardNode: Node | null = null;

  private _messageInTransmit: GameCard | null = null;

  onEnable() {
    GameEventCenter.on(GameEvent.PLAYER_DRAW_CARD, this.drawCards, this);
    GameEventCenter.on(GameEvent.PLAYER_DISCARD_CARD, this.discardCards, this);
    GameEventCenter.on(GameEvent.PLAYER_SEND_MESSAGE, this.playerSendMessage, this);
    GameEventCenter.on(GameEvent.MESSAGE_TRANSMISSION, this.transmitMessage, this);
    GameEventCenter.on(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.chooseReceiveMessage, this);
    GameEventCenter.on(GameEvent.RECEIVE_PHASE_START, this.receiveMessage, this);
  }

  onDisable() {
    GameEventCenter.off(GameEvent.PLAYER_DRAW_CARD, this.drawCards);
    GameEventCenter.off(GameEvent.PLAYER_DISCARD_CARD, this.discardCards);
    GameEventCenter.off(GameEvent.PLAYER_SEND_MESSAGE, this.playerSendMessage);
    GameEventCenter.off(GameEvent.MESSAGE_TRANSMISSION, this.transmitMessage);
    GameEventCenter.off(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.chooseReceiveMessage);
    GameEventCenter.on(GameEvent.RECEIVE_PHASE_START, this.receiveMessage);
  }

  //抽牌动画
  drawCards({ player, cardList }: GameEventType.PlayerDrawCard) {
    return new Promise((resolve, reject) => {
      const cardGroup = new DataContainer<GameCard>();
      cardGroup.gameObject = GamePools.cardGroupPool.get();
      for (let card of cardList) {
        if (!card.gameObject) {
          (<Card>card).gameObject = GamePools.cardPool.get();
          card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        }
        cardGroup.addData(card);
      }
      this.node.addChild(cardGroup.gameObject.node);
      cardGroup.gameObject.node.worldPosition = this.deckNode.worldPosition;

      tween(cardGroup.gameObject.node)
        .to(0.6, { worldPosition: player.gameObject.node.worldPosition })
        .call(() => {
          for (let card of cardGroup.list) {
            if (player.id === 0) {
              card.gameObject.node.scale = new Vec3(1, 1, 1);
              this.handCardNode.getComponent(HandCardContianer).data.addData(card as Card);
            } else {
              GamePools.cardPool.put(card.gameObject);
              card.gameObject = null;
            }
          }
          cardGroup.removeAllData();
          GamePools.cardGroupPool.put(cardGroup.gameObject);
          resolve(null);
        })
        .start();
    });
  }

  //弃牌动画
  discardCards({ player, cardList }: GameEventType.PlayerDiscardCard) {
    return new Promise((resolve, reject) => {
      if (player.id === 0) {
        cardList.forEach((card) => {
          card.gameObject.node.setParent(this.node);
          tween(card.gameObject.node)
            .to(0.6, {
              scale: new Vec3(0.6, 0.6, 1),
              worldPosition: this.discardPileNode.worldPosition,
            })
            .call(() => {
              GamePools.cardPool.put(card.gameObject);
              card.gameObject = null;
            })
            .start();
        });
      } else {
        const cardGroup = new DataContainer<GameCard>();
        cardGroup.gameObject = GamePools.cardGroupPool.get();
        cardList.forEach((card) => {
          if (!card.gameObject) {
            (<Card>card).gameObject = GamePools.cardPool.get();
          }
          card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
          cardGroup.addData(card);
        });
        cardGroup.gameObject.node.worldPosition = player.gameObject.node.worldPosition;
        tween(cardGroup.gameObject.node)
          .to(0.6, { worldPosition: this.discardPileNode.worldPosition })
          .call(() => {
            for (let card of cardGroup.list) {
              GamePools.cardPool.put(card.gameObject);
              card.gameObject = null;
            }
            cardGroup.removeAllData();
            GamePools.cardGroupPool.put(cardGroup.gameObject);
            resolve(null);
          });
      }
    });
  }

  //打出卡牌动画，播放声音
  useCard(user: Player, target: Player, card: Card) {}

  giveCards(form: Player, to: Player, cards: GameCard[]) {}

  playerSendMessage({ player, message, targetPlayer }: GameEventType.PlayerSendMessage) {
    const panting = player.gameObject.node.getChildByPath("Border/CharacterPanting");
    const targetPanting = targetPlayer.gameObject.node.getChildByPath("Border/CharacterPanting");
    const position = message.gameObject.node.worldPosition;
    if (message instanceof UnknownCard && !message.gameObject) {
      message.gameObject = GamePools.cardPool.get();
    }
    this.handCardNode.getComponent(HandCardContianer).data.removeData(message);
    message.gameObject.node.setParent(this.node);
    message.gameObject.node.worldPosition = position;
    if (player.id === 0) {
      tween(message.gameObject.node)
        .to(0.5, {
          worldPosition: panting.worldPosition,
          scale: new Vec3(0.6, 0.6, 1),
        })
        .to(0.8, {
          worldPosition: targetPanting.worldPosition,
        })
        .start();
    } else {
      message.gameObject.node.worldPosition = panting.worldPosition;
      message.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
      tween(message.gameObject.node)
        .to(0.8, {
          worldPosition: targetPanting.worldPosition,
        })
        .start();
    }
  }

  //传递情报动画
  transmitMessage({ messagePlayer, message }: GameEventType.MessageTransmission) {
    const panting = messagePlayer.gameObject.node.getChildByPath("Border/CharacterPanting");
    tween(message.gameObject.node)
      .to(0.8, {
        worldPosition: panting.worldPosition,
      })
      .start();
  }

  //翻开情报动画
  turnOverMessage(message?: Card) {
    if (this._messageInTransmit instanceof Card) {
      return this._messageInTransmit.flip();
    } else {
      message.gameObject = this._messageInTransmit.gameObject;
      this._messageInTransmit = message;
      this._messageInTransmit.status = CardStatus.FACE_DOWN;
      return message.flip();
    }
  }

  //选择接收情报
  chooseReceiveMessage({ player, message }: GameEventType.PlayerChooseReceiveMessage) {
    tween(message.gameObject.node)
      .to(0.33, {
        scale: new Vec3(1, 1, 1),
      })
      .to(0.33, {
        scale: new Vec3(0.6, 0.6, 1),
      })
      .start();
  }

  //接收情报动画
  async receiveMessage({ player, message }: GameEventType.PlayerReceiveMessage) {
    const messageContainer = player.gameObject.node.getChildByPath("Border/Message");
    if (message.status === CardStatus.FACE_DOWN) {
      const time = new Date().getTime();
      await message.flip();
      console.log(time - new Date().getTime());
    }
    tween(message.gameObject.node)
      .to(0.5, {
        worldPosition: messageContainer.worldPosition,
        scale: new Vec3(0, 0, 1),
      })
      .call(() => {
        GamePools.cardPool.put(message.gameObject);
        message.gameObject = null;
      })
      .start();
  }
}
